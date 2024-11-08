import { defineStore } from 'pinia'
import axiosInstance from '../axios/axios-instance';
import { useCheckoutStore } from './Checkout.js'

interface CouponData {
    remove?: number,
    code: string
}

interface ApplyCoupon {
    cart: string,
    vouchercodes: string[],
    fields: string,
    code: string,
}

interface CartData {
    rowId: string,
    cart: object,
    qty?: number,
    abndToken:string
    // deliverymethod: number
}

interface FormData {
    cart: object | undefined,
    qty: number,
    data?: object,
    abndToken?: string
}

interface CartState {
    cart: Record<string, any>
    activeService: []
    coupon: string[]
    data: []
    responseData: []
    errorResponseData: object
    addedResponse: string
}

export const useCartStore = defineStore({
    id: 'cart',
    state: (): CartState => ({
        cart: {},
        activeService: [],
        coupon: [],
        data: [],
        responseData: [],
        errorResponseData: {},
        addedResponse: ''
    }),

    actions: {
        transformData(data) {
            const convertedObj = {};
            // Iterate over each key-value pair in the input object
            for (const [key, value] of Object.entries(data)) {
                // Extract the number inside the brackets dynamically
                const newKey = key.substring(key.indexOf('[') + 1, key.indexOf(']'));
                // Assign the transformed key-value pair to the new object
                convertedObj[newKey] = value;
            }
            
            // Store the converted object in the state
            return convertedObj;
          },
        async addToCart(product: any, qty?: number, data?: any,productId='', service = []) {
            const formData: FormData = {
                cart: undefined,
                qty: 1
            }

            if (this.cart.items != undefined) {
                formData.cart = this.cart.items
                formData.abndToken = this.cart.abndToken
            }
            if (qty) {
                formData.qty = qty
            }
            if (data) {
                formData.attribute_id = this.transformData(data)
            }
            let apiUrl='';
            if(productId){
                apiUrl = `cart/${product.slug}/update`
                formData.rowId=productId
            }else{
                apiUrl = `cart/${product.slug}/add`
            }
            const response = await axiosInstance.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status == 200) {
                this.addedResponse = 'success'

                var CartItems = response.data.data.cart
                this.cart = {
                    ['items']: CartItems,
                    ['totals']: response.data.data.calculations,
                    ['abndToken']: response.data.data.abndToken
                }
                let lastitem = response.data.data.lastitem
                // window.gtag = window.gtag || []
                // window.gtag('event', 'add_to_cart', {
                //     'items': [
                //     {
                //         'item_id': lastitem?.id,
                //         'item_name': lastitem?.name,
                //         'item_category': lastitem?.category,
                //         'quantity': 1, // or the quantity added
                //         'price': lastitem?.pricefloat,
                //     }
                //     ],
                //     ...lastitem?.options.values
                // });
            }
        },

        async removeFromCart(id: string) {
            try {
                const apiUrl = `cart/remove`
                var request: CartData = {
                    cart: this.cart.items,
                    rowId: id,
                }

                const response = await axiosInstance.post(apiUrl, request, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                var CartItems = response.data.data.cart
                if (CartItems) {
                    this.cart = {
                        ['items']: CartItems,
                        ['totals']: response.data.data.calculations,
                        ['abndToken']: response.data.data.abndToken
                    }
                } else {
                    this.cart = {}
                }

            } catch (error) {
                console.error('Error fetching data:', error)
            }
        },

        async updateQuantity(product: any, qty: number) {
            try {
                console.log(product)
                const apiUrl = `cart/${product.slug}/update`
                var request: CartData = {
                    cart: this.cart.items,
                    rowId: product.rowId,
                    qty,
                    abndToken:this.cart.abndToken
                }

                const response = await axiosInstance.post(apiUrl, request, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                var CartItems = response.data.data.cart
                if (CartItems) {
                    this.cart = {
                        ['items']: CartItems,
                        ['totals']: response.data.data.calculations,
                        ['abndToken']: response.data.data.abndToken
                    }
                } else {
                    this.cart = {}
                }

            } catch (error) {
                console.error('Error fetching data:', error)
            }
        },

        async ApplyCoupon(coupon: CouponData) {
            try {
                console.log(coupon);
                let couponsCodes: string[] = this.coupon || [];
                var checkoutSession = useCheckoutStore().checkoutSession
                    ? useCheckoutStore().checkoutSession
                    : []
                var apiUrl = 'checkout/applyCoupon'
                const removeValue = coupon.remove ?? undefined; // Default to 0 if undefined
                console.log(removeValue)
                console.log(couponsCodes)
                if (removeValue !== undefined) {
                    couponsCodes.splice(removeValue, 1)
                    // delete couponsCodes[removeValue]
                    // couponsCodes = couponsCodes.filter((value) => value !== null)
                    apiUrl = 'checkout/remove-coupon'
                }
                const couponData: ApplyCoupon = {
                    cart: '',
                    vouchercodes: [],
                    fields: '',
                    code: ''
                }
                couponData.cart = this.cart.items

                couponData.vouchercodes = Array.from(new Set(couponsCodes))
                couponData.fields = checkoutSession.fields
                // // couponsCodes.push(coupon.code)

                if (removeValue == undefined) {
                    couponData.code = coupon.code
                }
                const response = await axiosInstance.post(apiUrl, couponData)
                if (response.status == 200) {
                    var Cart = this.cart
                    if (removeValue == undefined) {
                        couponsCodes.push(coupon.code)
                    }
                    Cart.totals = response.data.data.calculations
                    // Use Array.from to create a new array from a Set, ensuring it's typed correctly
                    this.coupon = Array.from(new Set(couponsCodes));
                    this.errorResponseData = {}
                }
            } catch (error: any) {
                this.errorResponseData = error.response.data
            }
        },

        async AbandonedCartComplete(token: string) {
            try {
                const apiUrl = `cart/abandoned/${token}/complete`
                await axiosInstance.post(apiUrl)
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        },

        async fetchAbandonedCart(token: string) {
            try {
                const apiUrl = `cart/abandoned/${token}`
                const response = await axiosInstance.get(apiUrl)
                var CartItems = response.data.data.cart
                this.cart = {
                    ['items']: CartItems,
                    ['totals']: response.data.data.calculations,
                    ['abndToken']: response.data.data.abndToken,
                    ['fields']: response.data.data.fields
                }
                // localStorage.setItem('checkoutSession', JSON.stringify(response.data.data))
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        },

        clearCoupon() {
            this.coupon = []
        },

        clearCart() {
            this.cart = []
        },
        // Continue fixing other actions in a similar way...
    },
    getters: {
        itemsCount(): number {
            // Sum up all the quantities
            if(Object.keys(this.cart).length){
                return Object.values(this.cart.items).reduce((total: number, item: any) => {
                    return total + item.qty;
                }, 0);
            }else{
                return 0;
            }
        }
    },
    persist: {
        key: 'cart'
    }
})
