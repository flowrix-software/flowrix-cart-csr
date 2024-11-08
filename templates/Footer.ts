import { ref, computed, defineComponent, defineAsyncComponent  } from 'vue';
import { useSubscription } from '../stores/Subscription';
import { useNavMenu } from '../stores/NavMenu'

export default defineComponent({
  name: 'FooterScript',  
  setup() {
      const subscriptionStore = useSubscription();
      const email = ref('');
      const successMessage = ref('');
      const errorMessage = ref('');
      const NavMenu = useNavMenu()
      const menuData = computed(() =>{
      
        const headmenu =  NavMenu.Menu.filter((menu) => menu.location=='footer')[0]
        return headmenu
   
       });
      const handleSubmit = async (event: Event) => {
        event.preventDefault();
        try {
          const response = await subscriptionStore.subscribe(email.value);
          if (response.status === 'Success') {
            successMessage.value = 'Subscription successful!';
            email.value = ''; 
           
            setTimeout(() => {
              successMessage.value = '';
            }, 5000);
          } else if (response.status === 'Error') {
            const errorMessages = response.message?.email || ['Failed to subscribe. Please try again.'];
            errorMessage.value = errorMessages.join(', ');
            setTimeout(() => {
              errorMessage.value = '';
            }, 5000);
          }
        } catch (error) {
          errorMessage.value = 'Failed to subscribe. Please try again.';
          setTimeout(() => {
            errorMessage.value = '';
          }, 5000);
        }
      };
      const ContactFooter = defineAsyncComponent(() =>
        import('@/components/template_01/Footer/ContactFooter.vue')
      )
      const FooterMenu = defineAsyncComponent(() =>
        import('@/components/template_01/Footer/FooterMenu.vue')
      )
      const TopFooter = defineAsyncComponent(() =>
        import('@/components/template_01/Footer/TopFooter.vue')
      )
      const BottomFooter = defineAsyncComponent(() =>
        import('@/components/template_01/Footer/BottomFooter.vue')
      )
      
return {
      subscriptionStore,
      email,
      menuData,
      successMessage,
      errorMessage,
      handleSubmit,
      ContactFooter,
      FooterMenu,
      TopFooter,
      BottomFooter
    };
  },
});