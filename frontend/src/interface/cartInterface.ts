export interface cartInitialState {
  data?: Array<object>;
  specificData?: Array<object>;
  message?: string;
  status?: boolean;
  error?: string | null;
  reducerStatus: string;
}

export interface AddCartProduct {
  userId: string;
  productId: string;
}

export interface GetCartProduct {
  userId: string;
  withProductDetail: boolean;
}

export interface GetSpecificCartProduct {
  userId: string;
  productId: string;
  withProductDetail: boolean;
}

export interface UpdateCartProductQuantity {
  userId: string;
  productId: string;
  quantity: number;
}

export interface DeleteCartProduct {
  userId: string;
  productId: string;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    name: string;
    image: string;
    description: string;
    price: string;
    discount?: string;
    inStock: number;
    stockStatus:
      | 'In Stock'
      | 'Out of Stock'
      | 'Pre-order'
      | 'Backorder'
      | 'Discontinued'
      | 'Coming Soon'
      | 'Made to Order'
      | 'Store Only';
  };
  totalPrice: number;
}

export interface CartState {
  data: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface UserState {
  data: {
    id: string;
    name: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
}
