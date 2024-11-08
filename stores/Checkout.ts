import { defineStore } from 'pinia'
import axiosInstance from '../axios/axios-instance' // Adjust the import path accordingly
import { useCartStore } from './Cart.js'

interface PreferenceData {
    fields?: Record<string, any>;
    deliverytype?: string;
    order_no?: string;
    publishableKey?: any;
    [key: string]: any;
}
interface ConfigData {
    preferences?: Record<string, any>[];
    outlets?: Record<string, any>[];
    deliverytype?: string;
    order_no?: string;
    publishableKey?: any;
    calculations?: any;
    shippingmethods?: any;
    cart?: any;
    [key: string]: any;
}

interface fieldData {
    billing_state: number | string,
    billing_firstname: string | number;
    firstname: string | number;
    billing_lastname: string | number;
    lastname: string | number;
    email: string | number;
    billing_mobile: string | number;
    billing_address: string | number;
    billing_suburb: string | undefined;
    billing_postcode: number | undefined,
    shipping_postcode: number | undefined,
    deliverymethod: number | string,
    shippingmethod: number | string,
    authoritytoleave: number | undefined,
    customernotes: string,

}
interface CheckoutState {
    publishableKey: Record<string, any>;
    responseData: any[];
    config:ConfigData;
    checkoutSession: PreferenceData;
    errorResponseData: object;
}

export const useCheckoutStore = defineStore('checkout', {
    state: (): CheckoutState => ({
        publishableKey: {},
        responseData: [],
        config: {},
        checkoutSession: {},
        errorResponseData: {},
        checkCustomer:{},
        stripeElemets:{}
    }),

    actions: {
        resetState() {
            this.publishableKey = {}
            this.responseData = []
            this.config = {}
            this.checkoutSession = {}
            this.errorResponseData = {}
        },

        async paymentMethods(formData: any) {
            try {
                const sesisondata = JSON.parse(localStorage.getItem('Checkout') as string)
                const apiUrl = `checkout/paymentmethod`
                const response = await axiosInstance.post(apiUrl, formData)
                if (response.status === 200) {
                    this.publishableKey = response.data.data
                }
                sesisondata.fields.paymentmethod = formData.paymentmethod
                return response
            } catch (error: any) {
                if (error.response) {
                    this.errorResponseData = error.response.data
                }
            }
        },

        async getConfig() {
            try {
                const formData: any = this.checkoutSession.fields ?? this.checkoutSession;

                if (formData.cart && Object.keys(formData.cart).length > 0) {
                    const itemsToRemove = Object.keys(formData.cart).filter(
                        (key) => formData.cart[key].name === 'Check Measure'
                    )
                    itemsToRemove.forEach((key) => delete formData.cart[key])

                    const samples = Object.keys(formData.cart).filter(
                        (key) => formData.cart[key].product_type === 'sample'
                    )
                    if (samples.length > 0) {
                        samples.forEach((key) => (formData.cart[key].id = formData.cart[key].pid))
                    }
                }

                if (useCartStore().coupon) {
                    formData.vouchercodes = useCartStore().coupon
                }
                formData.cart = useCartStore().cart.items

                const apiUrl = `checkout/configs`
                const response = await axiosInstance.post(apiUrl, formData,{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                })

                if (response.status === 200) {

                    this.config = response.data.data
                        // fields: {
                        //     ...this.checkoutSession.fields, // Keep existing fields
                        //     ...response.data.data,         // Overwrite with new fields if they exist
                        // }
                    
                    // this.checkoutSession = response.data.data
                    const cart = response.data.data.cart
                    if (cart) {
                        this.config.totals = response.data.data.calculations
                        this.checkoutSession.calculations =response.data.data.calculations
                    }

                    let activeService: any = []

                    // if (this.preference.data.deliverytype === 'service') {
                    //     activeService = this.preference.data.preferences.find(
                    //         (pref: any) => pref.id === formData.preferencetype
                    //     ) || []
                    // }

                }
            } catch (error: any) {
                if (error.response) {
                    this.errorResponseData = error.response.data
                }
            }
        },

        async submitCheckout() {
            try {
               
                const formData = this.checkoutSession.fields
                
                    const apiUrl = `customer/checkout`
                    
                    formData.billing_address2 = formData.billing_address
                    const response = await axiosInstance.post(apiUrl, formData,{
                        headers: {
                            'Content-Type': 'application/json'
                          }
                    })

                    if (response.status === 200) {
                        this.responseData = response.data
                        let orderData = response.data.data
                    }
            } catch (error: any) {
                if (error.response) {
                    this.errorResponseData = error.response.data
                    this.checkoutSession = {
                        ...this.checkoutSession,
                        fields: {
                            ...this.checkoutSession.fields, // Keep existing fields
                            invoice:error.response.data.data.order_no,         // Overwrite with new fields if they exist
                        }
                    };
                }
            }
        },

        async confirmPayment(checkoutId: string) {
            try {
                const apiUrl = `checkout/success`
                await axiosInstance.post(apiUrl, { token: checkoutId }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } catch (error) {
                console.error('Error confirming payment:', error)
            }
        },
         async CheckUserAccount(email){
          try{
            const apiUrl = `customers/search`
            const response = await axiosInstance.post(apiUrl, {email:email}, {
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            this.checkCustomer = response.data
            return response.data
          }catch (error){
            this.checkCustomer = error.response.data;
              return error.response.data;
          }
        },
        async saveToCheckoutSession(fieldsData: fieldData) {
            fieldsData.firstname = fieldsData.billing_firstname
            fieldsData.lastname = fieldsData.billing_lastname
            fieldsData.mobile = fieldsData.billing_mobile
            fieldsData.fullname = fieldsData.billing_firstname+' '+fieldsData.billing_lastname
            fieldsData.billing_fullname = fieldsData.billing_firstname+' '+fieldsData.billing_lastname
            fieldsData.shipping_fullname = fieldsData.billing_firstname+' '+fieldsData.billing_lastname
            
            if(fieldsData.shippingasbilling==true){
                fieldsData.shipping_address = fieldsData.billing_address
                fieldsData.shipping_country = fieldsData.billing_country
                fieldsData.shipping_state = fieldsData.billing_state
                fieldsData.shipping_suburb = fieldsData.billing_suburb
                fieldsData.shipping_firstname = fieldsData.billing_firstname
                fieldsData.shipping_fullname = fieldsData.billing_fullname
                fieldsData.shipping_lastname = fieldsData.billing_lastname
                fieldsData.shipping_middlename = fieldsData.billing_middlename
                fieldsData.shipping_mobile = fieldsData.billing_mobile
                fieldsData.shipping_postcode = fieldsData.billing_postcode
            }

            this.checkoutSession.fields = {
                ...this.checkoutSession.fields,
                ...fieldsData,
            };
            this.errorResponseData = {}
           await this.getConfig()
        },

    },
    persist: {
        key: 'Checkout'
    }
})
