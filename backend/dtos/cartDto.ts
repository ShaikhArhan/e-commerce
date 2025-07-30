export interface AddProductToCartDto {
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

export interface ProductToCartPriceDto {
  totalPrice: number;
}

export interface updateQuantityCartProductDto {
  userId: string;
  productId: string;
  quantity: number;
}

export interface DeleteCartProductDto extends AddProductToCartDto {}
