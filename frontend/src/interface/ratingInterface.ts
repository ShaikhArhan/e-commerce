export interface ratingInitialState {
  data?: Array<object>;
  message?: string;
  status?: boolean;
  error?: string | null;
  reducerStatus: string;
}

export interface RatingData {
  id: string;
  productId: string;
  ratingDetail: Array<{
    userId: string;
    rating: number;
    comment: string;
    usingProduct: boolean;
    createdAt: string;
  }>;
  totalRating: number;
  createdAt: string;
}
