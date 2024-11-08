import {defineComponent, defineAsyncComponent } from "vue";
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserstore } from '../../stores/Userstore';

export default defineComponent({
  name: 'CreditCardsScript',  
  setup() {

	
	const userStore = useUserstore();

	onBeforeMount(() => {
	  userStore.getCustomerCards();
	});

	const customerCards = computed(() => userStore.cards);

	const isModalVisible = ref(false);
	const selectedCardId = ref<string | null>(null);

	const isSuccessAlertVisible = ref(false);

	const showDeleteModal = (cardId: string) => {
	  selectedCardId.value = cardId;
	  isModalVisible.value = true;
	};

	const confirmDeleteCard = async (modalId) => {
	  if (selectedCardId.value) {
	    await userStore.deleteCustomerCard(selectedCardId.value);
	    if (userStore.successResponse) {
	      showSuccessAlert();
	    }
	  }
	  closeDeleteModal(modalId);
	};

	const closeDeleteModal = (modalId) => {
	  isModalVisible.value = false;
	  selectedCardId.value = null;
	  const modalElement = document.getElementById('crditcarddelete');
	  modalElement.querySelector('.btn-close').click();
	};

	const showSuccessAlert = () => {
	  isSuccessAlertVisible.value = true;
	  setTimeout(() => {
	    isSuccessAlertVisible.value = false;
	  }, 5000);
	};

		
	return{
		userStore,
		customerCards,
		isModalVisible,
		selectedCardId,
		isSuccessAlertVisible,
		showDeleteModal,
		confirmDeleteCard,
		closeDeleteModal,
		showSuccessAlert
	}

  }

 });