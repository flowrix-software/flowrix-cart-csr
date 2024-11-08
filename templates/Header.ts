import { computed, ref, defineComponent, defineAsyncComponent } from 'vue'
import { useCompanyProfile } from '../stores/CompanyProfile'
import { useNavMenu } from '../stores/NavMenu'
import { useAuthStore } from '../stores/AuthStore'
import { useUserstore } from '../stores/Userstore'
import { useCartStore } from '../stores/Cart'
import { useRouter } from 'vue-router';
 
export default defineComponent({
  name: 'HeaderScript',
  setup() {
         const router = useRouter();
    const wordpressUrl = import.meta.env.VITE_APP_WORDPRESS_URL;
    const NavMenu = useNavMenu()
    const CompanyProfile = useCompanyProfile()
    const authStore = useAuthStore()
    const cartStore = useCartStore()
    const userStore = useUserstore()

    const companyProfile = computed(() => CompanyProfile.profile)

    const menuData = computed(() =>{
      
     const headmenu =  NavMenu.Menu.filter((menu) => menu.location=='header')[0]
     return headmenu

    });

    const userData = computed(() => authStore.user?authStore.user:'' || {});

    const mobile_menu = ref(false)
    const OpenMobileMenu = () => {
      if (mobile_menu.value) {
        mobile_menu.value = false
      } else {

        mobile_menu.value = true
      }
    }

    const MainMenu = defineAsyncComponent({
      loader: async () => {
        try {
          // Attempt to dynamically import the specified template component
          return await import('@/components/template_01/Menu/MainMenu.vue');
        } catch (error) {
          // If the specified template fails to load, fall back to SimpleProduct1.vue
          return import('@/components/template_01/Menu/MainMenu.vue');
        }
      },
    });

    const logoutFunc = (async(nextrout='/')=>{
      await authStore.logout();
      if(authStore.isAuthenticated==false){
        console.log(nextrout)
        let checkrouted = await router.push({ path: nextrout});
        console.log(checkrouted)
        ;
      }
    })


    return {
      NavMenu,
      companyProfile,
      authStore,
      cartStore,
      userStore,
      userData,
      menuData,
      mobile_menu,
      MainMenu,
      wordpressUrl,
      logoutFunc
      
    };
  },
});
