import { defineComponent } from 'vue';
import { useCategories } from '../stores/Categories';
import { useShopStore } from '../stores/ShopStore';

export default defineComponent({
  name: 'ShopAllScript',
  props: {
    slug: {
      type: String,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    lastPage: {
      type: String,
      required: true
    },
    currentPage: {
      type: String,
      required: true
    },
    query: {
      type: Object,
      required: true
    }
  },
  setup(props) {
      const ChangePage =(async(slug,page,route)=>{
      console.log(route.query.page = page)
        scrollToPosition();
        if(route.meta.paged_route=='ShopAll_paged' || route.name=='ShopAll_paged'){
          await useShopStore().getShop(route.query);
        }else{
          await useCategories().getCategories(slug,page);
        }
        scrollToPosition();
      });

      const scrollToPosition = () => {
        setTimeout(function(){
        window.scrollTo({
          top: 600,
          behavior: 'smooth'
        });
      },100);
      };
      const windoWidth = window.innerWidth

    return {
      ChangePage,
      windoWidth
    };
  },
});
