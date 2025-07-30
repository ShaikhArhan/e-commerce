export interface CustomerData {
  fullname: string;
  email: string;
  country: string;
  phoneNumber: string;
  address: string;
  orderAddress: string;
  paymentMethod: 'cash_on_delivery' | 'online_payment';
}

export interface ProductData {
  userId: string;
  productId: string;
  product: {
    image: string;
    name: string;
    description: string;
    price: string;
    discount: string;
    stockStatus:
      | 'In Stock'
      | 'Out of Stock'
      | 'Pre-order'
      | 'Backorder'
      | 'Discontinued'
      | 'Coming Soon'
      | 'Made to Order'
      | 'Store Only';
    inStock: number;
  };
  quantity: number;
  totalPrice: number;
}

export interface PaymentData {
  method:
    | 'credit_card'
    | 'paypal'
    | 'bank_transfer'
    | 'cash_on_delivery'
    | 'gift_card'
    | 'apple_pay'
    | 'google_pay';
  // Credit Card fields
  cardName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  // Bank Transfer fields
  transactionId?: string;
  proofFile?: File;
  // Gift Card fields
  giftCardCode?: string;
  giftCardPin?: string;
}

export interface AddOrderProductInterface {
  userId: string;
  orderProductDetailData: Array<ProductData>;
  orderAddress: string;
  paymentMethod: string;
}

export interface OrderProductInitialState {
  data?: Array<object>;
  message?: string;
  status?: boolean;
  error?: string | null;
  reducerStatus: string;
}

export interface OrderDataUseState {
  id: string;
  userId: string;
  orderProductDetail: Array<ProductData>;
  totalOrderProduct: number;
  orderAddress: string;
  paymentMethod:
    | 'credit_card'
    | 'paypal'
    | 'bank_transfer'
    | 'cash_on_delivery'
    | 'gift_card'
    | 'apple_pay'
    | 'google_pay'
    | 'other';
  orderStatus: 'pending' | 'completed' | 'shipped' | 'delivered' | 'cancelled';
  orderCreatedAt: string;
}
