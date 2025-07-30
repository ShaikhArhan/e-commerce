export interface AddProductOrderDto {
  userId: string;
  orderProductDetailData: Array<{
    productId: string;
    product: {
      image: string;
      name: string;
      description: string;
      price: string;
      discount: string;
      stockStatus: string;
      inStock: number;
    };
    quantity: number;
    totalPrice: number;
  }>;
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
  orderStatus?: 'pending' | 'completed' | 'shipped' | 'delivered' | 'cancelled';
}

export interface GetProductOrderDto {
  userId: string;
}

// export interface UpdateProductOrderDto extends AddProductOrderDto {
//   orderId:string
// }

export interface UpdateProductOrderDto {
  orderId: string;
  orderAddress?: string;
  paymentMethod?:
    | 'credit_card'
    | 'paypal'
    | 'bank_transfer'
    | 'cash_on_delivery'
    | 'gift_card'
    | 'apple_pay'
    | 'google_pay'
    | 'other';
  orderStatus?: 'pending' | 'completed' | 'shipped' | 'delivered' | 'cancelled';
}

export interface DeleteOrderProductDto {
  orderId: string;
}
