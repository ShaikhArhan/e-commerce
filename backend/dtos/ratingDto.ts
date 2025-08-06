// export interface RepliesDto {
//   userId: string;
//   comment: string;
//   likes: Array<string>;
//   createdAt: string;
// }
// export interface RatingDetailDto {
//   userId: string;
//   rating: number;
//   comment: string;
//   usingProduct: boolean;
//   likes: Array<string>;
//   replies: Array<RepliesDto>;
//   createdAt: string;
// }

export interface RatingDetailDto {
  userId: string;
  rating: number;
  usingProduct: number;  
  createdAt: string;
}

export interface CreateRatingDto {
  productId: string;
  ratingDetail: {
    userId: string;
    rating: number;
    comment: string;
  };
}

export interface FetchRatingByProductIdDto {
  productId: string;
}
