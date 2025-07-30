export interface FavoriteProductInitialState {
  data?: Array<object>;
  message?: string;
  status?: boolean;
  error?: string | null;
  reducerStatus: string;
}

export interface AddFavoriteProductInterface {
  userId: string;
  productId: string;
}

export interface GetFavoriteProduct {
  userId: string;
  withProductDetail: boolean;
}

export interface DeleteFavoriteProductInterface {
  userId: string;
  productId: string;
}

export interface FavoriteProductDisplay {
  id: string;
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
}
