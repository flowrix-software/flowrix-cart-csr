import {defineComponent, defineAsyncComponent } from "vue";
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserstore } from '../../stores/Userstore';

export default defineComponent({
  name: 'LoginScript',  
  setup() {
  	const userStore = useUserstore();
  	const DownloadingInvoice = ref(false);
		const orderHistory = computed(() => {
		  if (userStore.order_history.length === 0) {
		    userStore.getOrderHistory();
		  }
		  return userStore.order_history.data || [];
		});

		const getTextInvoice = async (orderNo) => {
			DownloadingInvoice.value = true
		  await userStore.getTaxInvoice(orderNo);
		  DownloadingInvoice.value = false
		};

		const sortedOrders =((orders)=>{
		  const sortedorders = orders.sort((a, b) => b.id - a.id);

		    return sortedorders
		})
			
	return{
		userStore,
		orderHistory,
		getTextInvoice,
		sortedOrders,
		DownloadingInvoice
	}

  }

 });