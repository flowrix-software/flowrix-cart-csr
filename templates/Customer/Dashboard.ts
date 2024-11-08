import {defineComponent, defineAsyncComponent } from "vue";
import { ref, computed } from 'vue';

import { useUserstore } from '../../stores/Userstore';


import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'LoginScript',  
  setup() {
	const router = useRouter();
	const route = useRoute();
	const userStore = useUserstore();
	const isLoading = ref<boolean>(false);
	const parentSelectedTab = ref<string>(route.params.tab as string || 'account');
	const userData = computed(() => userStore.user?userStore.user:'' || {});

	const WishList = defineAsyncComponent(() =>
      import('@/components/template_01/Customer/WishList.vue')
    )

    const AddressDetails = defineAsyncComponent(() =>
      import('@/components/template_01/Customer/ShippingAddress.vue')
    )

    const ChangePassword = defineAsyncComponent(() =>
      import('@/components/template_01/Customer/ChangePassword.vue')
    )

    const CreditCards = defineAsyncComponent(() =>
      import('@/components/template_01/Customer/CreditCards.vue')
    )

    const DashboardTabs = defineAsyncComponent(() =>
      import('@/components/template_01/Customer/DashboardTabs.vue')
    )

    const OrderHistory = defineAsyncComponent(() =>
      import('@/components/template_01/Customer/OrderHistory.vue')
    )

    const Quotation = defineAsyncComponent(() =>
      import('@/components/template_01/Customer/Quotation.vue')
    )

    const UserDetails = defineAsyncComponent(() =>
      import('@/components/template_01/Customer/UserDetails.vue')
    )

    const UserSamples = defineAsyncComponent(() =>
      import('@/components/template_01/Customer/UserSamples.vue')
    )

    const BillingAddress = defineAsyncComponent(() =>
      import('@/components/template_01/Customer/BillingAddress.vue')
    )
		
	return{
		router,
		route,
		userStore,
		isLoading,
		parentSelectedTab,
		userData,
		WishList,
		AddressDetails,
		ChangePassword,
		CreditCards,
		DashboardTabs,
		OrderHistory,
		Quotation,
		UserDetails,
		UserSamples,
		BillingAddress
	}

  }

 });