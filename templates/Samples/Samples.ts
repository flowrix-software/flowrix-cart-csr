import { ref, computed } from 'vue';
import { useSamples } from '../../../stores/Samples';
import { usePages } from '../../../stores/Pages';
import bannerImage from '@/assets/images/coloursamples_banner.webp'
// Declare stripe and elements globally, but don't export them yet
let stripe = null;
let elements = null;

export default defineComponent({
  name: 'SamplesScript',
  setup() {
    
    const pageData = usePages().page
    const Samples = useSamples();
    const filters = ref({});
    const samplesData = computed(() => Samples.data);

    const updateFilters = (newFilters: any) => {
        filters.value = newFilters;
        Samples.getSamples(null, filters.value);
    };

     const innerBanner = defineAsyncComponent(() =>
      import('@/components/template_01/innerBanner.vue')
    )
      const SideBar = defineAsyncComponent(() =>
      import('@/components/template_01/Samples/Sidebar.vue')
    )
       const TopBar = defineAsyncComponent(() =>
      import('@/components/template_01/Samples/TopBar.vue')
    )
        const SampleCard = defineAsyncComponent(() =>
      import('@/components/template_01/Samples/SampleProductCard.vue')
    )
         const Pagination = defineAsyncComponent(() =>
      import('@/components/Others/Pagination.vue')
    )
          const Services = defineAsyncComponent(() =>
      import('@/components/template_01/Services.vue')
    )



    return {
      pageData,
      Samples,
      filters,
      samplesData,
      updateFilters,
      bannerImage,
      innerBanner,
      SideBar,
      TopBar,
      SampleCard,
      Pagination,
      Services
    };
  },
});