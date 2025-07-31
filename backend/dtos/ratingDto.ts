export interface RatingDetailDto {
  userId: string;
  rating: number;
  comment: string;
  usingProduct: string;
  createdAt: string;
}
export interface CreateRatingDto {
  productId: string;
  ratingDetail: RatingDetailDto;
}
