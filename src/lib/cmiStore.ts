// Two CMI stores. The main one (CMI_*_PROD) takes every payment of the site, /dc-thermes/paiement cures included.
// The DC Thermes one (CMI_*_DC) takes the /dc-thermes/paiement orders with a hotel room: cure + SiteMinder room,
// order IDs DCT-XXXn-PACK-… (see src/dc-thermes/Booking.tsx). The order ID is all that CMI sends back, so initiate,
// success and callback all choose the store from it. Without the three DC variables, these orders go to the main
// store, as before.

export type CmiStore = {
  name: 'main' | 'dc';
  clientId: string;
  storeKey: string;
  gatewayUrl: string;
  currency: string;
};

const currency = process.env.CMI_CURRENCY_PROD || '504';

const mainStore: CmiStore = {
  name: 'main',
  clientId: process.env.CMI_CLIENT_ID_PROD || '900010002',
  storeKey: process.env.CMI_STORE_KEY_PROD || 'TEST1234',
  gatewayUrl: process.env.CMI_GATEWAY_URL_PROD || 'https://test-alfilahicash.cmi.co.ma/fim/est3Dgate',
  currency,
};

const dcStore: CmiStore | undefined =
  process.env.CMI_CLIENT_ID_DC && process.env.CMI_STORE_KEY_DC && process.env.CMI_GATEWAY_URL_DC
    ? {
        name: 'dc',
        clientId: process.env.CMI_CLIENT_ID_DC,
        storeKey: process.env.CMI_STORE_KEY_DC,
        gatewayUrl: process.env.CMI_GATEWAY_URL_DC,
        currency,
      }
    : undefined;

// A DC Thermes order with a hotel room
export const isHotelOrder = (orderId: string) => /^DCT-[A-Z]{3}\d-PACK-/.test(orderId);

export const cmiStore = (orderId: string): CmiStore => (dcStore && isHotelOrder(orderId) ? dcStore : mainStore);
