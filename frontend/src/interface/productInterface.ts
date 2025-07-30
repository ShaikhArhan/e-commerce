export interface productInitialState {
  data?: object | Array<object>;
  message?: string;
  status?: boolean;
  error?: string | null;
  reducerStatus: string;
}

export interface productDisplay {
  id: string;
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
}
