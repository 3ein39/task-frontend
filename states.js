import { reactive } from 'vue';

export const state = reactive({
    symbol: 'SAR',
    price: 100,
    discountedPrice: 100,
    priceBase: 100,
    discountBase: 100,
    numberOfProducts: 0,
});