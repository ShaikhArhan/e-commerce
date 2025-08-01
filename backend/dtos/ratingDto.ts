export interface RatingDetailDto {
  userId: string;
  rating: number;
  comment: string;
  usingProduct: boolean;
  createdAt: string;
}
export interface CreateRatingDto {
  productId: string;
  ratingDetail: {
    userId: string;
    rating: number;
    comment: string;
    usingProduct: boolean;
  };
}
