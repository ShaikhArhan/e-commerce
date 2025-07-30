export interface AddFavoriteProductDto {
  userId: string;
  productId: string;
}

export interface DeleteFavoriteProductDto {
  userId: string;
  productId: string;
}

export interface GetFavoriteProductDto {
  userId: string;
  withProductDetail?: boolean;
}
