export interface RatingDetailDto {
  userId: string;
  rating: number;
  comment: string;
  usingProduct: string;
}
export interface CreateRatingDto {
  productId: string;
  ratingDetail: RatingDetailDto;
}
