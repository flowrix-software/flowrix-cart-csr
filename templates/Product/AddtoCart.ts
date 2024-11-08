import { ref, defineComponent } from "vue";

import { useCartStore } from "../../stores/Cart";

import { useRoute, useRouter } from "vue-router"; // Import useRoute from Vue Router

export default defineComponent({
  name: "AddtoCart",
  props: {
    from: {
      type: String,
      required: true
    },
    getFormData: {
      type: Object,
      required: true
    },
    product: {
      type: String,
      required: true
    },
    service: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute(); // Access the route object
    const router = useRouter();

    const queryParameters = route.query ? route.query : null;
    let productId = queryParameters?.customize
      ? queryParameters.customize
      : null;
    const newProduct = queryParameters?.copy
      ? (productId = "")
      : (productId = productId);

    const showError = ref(false);
    const ErrorMessage = ref("");
    const open = ref(false);

    const price_span = ref("");
    const getFormData = () => {
      const customProductForm = document.querySelector(".customproductform");
      const form = customProductForm;

      if (form) {
        const formData = new FormData(form);
        const formObject = {};
        console.log(formData.entries());
        const visibleFields = Array.from(formData.entries()).filter(([key]) => {
          const element = form.querySelector(`[name="${key}"]`);
          const parentElement = element.closest(".single-attribute")
            ? element.closest(".single-attribute")
            : element;

          return (
            parentElement &&
            window.getComputedStyle(parentElement).display === "block"
          );
        });

        // Convert filtered data to formObject
        visibleFields.forEach(([key, value]) => {
          formObject[key] = value;
        });

        //console.log(formObject)
        return formObject;
      }
    };
    const addToCart = async (product, productId) => {
      let DontCheckError = 0;
      price_span.value = document.querySelector(".product-details .price_span")
        ? document.querySelector(".product-details .price_span").innerHTML
        : 0;
      var mainwidthelement = document.querySelector(".mainwidthInput");
      if (mainwidthelement) {
        var maintitle = mainwidthelement.getAttribute("data-title");
        var mainwidth = parseInt(mainwidthelement.value);

        var subwidths = document.querySelectorAll(".subWidthInput");
        if (mainwidth && subwidths.length > 0) {
          DontCheckError = subwidths.length;

          var allfieldsum = 0;
          var title = "";
          subwidths.forEach((subwidth, index) => {
            var grandparent =
              subwidth.parentElement.parentElement.parentElement.parentElement;
            const grandparentStyle = window.getComputedStyle(grandparent);
            if (grandparentStyle.display === "none") {
              DontCheckError = DontCheckError - 1;
            } else {
              allfieldsum = parseInt(allfieldsum) + parseInt(subwidth.value);
              title += index == 0 ? "" : " + ";
              title += subwidth.getAttribute("data-title");
            }
          });

          if (DontCheckError > 0) {
            if (allfieldsum != mainwidth) {
              showError.value = true;
              ErrorMessage.value = `The total ${maintitle} must be equal to ${title}.`;
              return false;
            }
          }
        }
      }

      var mainheightelement = document.querySelector(".mainHeightInput");
      if (mainheightelement) {
        var maintitlehieght = mainheightelement.getAttribute("data-title");
        var mainheight = parseInt(mainheightelement.value);

        var subheight = document.querySelectorAll(".subHeightInput");
        if (mainheight && subheight.length > 0) {
          DontCheckError = subwidths.length;
          var allfieldsum = 0;
          var title = "";
          subheight.forEach((subwidth, index) => {
            var grandparent =
              subwidth.parentElement.parentElement.parentElement.parentElement;
            const heightgrandparentStyle = window.getComputedStyle(grandparent);
            if (heightgrandparentStyle.display === "none") {
              DontCheckError = DontCheckError - 1;
            } else {
              allfieldsum = parseInt(allfieldsum) + parseInt(subwidth.value);
              title += index == 0 ? "" : " + ";
              title += subwidth.getAttribute("data-title");
            }
          });
          if (DontCheckError > 0) {
            if (allfieldsum != mainheight) {
              showError.value = true;
              ErrorMessage.value = `The total ${maintitlehieght} must be equal to ${title} ${maintitlehieght}.`;
              return false;
            }
          }
        }
      }

      const formData = getFormData();

      await useCartStore().addToCart(product, 1, formData, newProduct);
      if (useCartStore().addedResponse == "success") {
        open.value = true;
      }
    };

    const closeModal = () => {
      open.value = false;
    };

    return {
        addToCart, productId, showError, ErrorMessage, closeModal, open, price_span
    };
  }
});
