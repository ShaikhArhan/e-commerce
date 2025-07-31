export interface AddProductDto {
  vendorId: string;
  vendorAddress: string;
  image: string;
  name: string;
  description: string;
  price: string;
  discount?: string;
  stockStatus:
    | "In Stock"
    | "Out of Stock"
    | "Pre-order"
    | "Backorder"
    | "Discontinued"
    | "Coming Soon"
    | "Made to Order"
    | "Store Only";
  inStock: number;
}

export interface AddManyProductsDto {
  productDatas: Array<AddProductDto>;
}
// export interface getProductByAdmin {
//   id: string;
//   vendorId: string;
//   vendorAddress: string;
//   image: string;
//   name: string;
//   description: string;
//   price: string;
//   discount: string;
//   stockStatus:
//     | 'In Stock'
//     | 'Out of Stock'
//     | 'Pre-order'
//     | 'Backorder'
//     | 'Discontinued'
//     | 'Coming Soon'
//     | 'Made to Order'
//     | 'Store Only';
//   inStock: number;
// }

export interface UpdateProductDto {
  vendorAddress: string;
  image: string;
  name: string;
  description: string;
  price: string;
  discount?: string;
  stockStatus:
    | "In Stock"
    | "Out of Stock"
    | "Pre-order"
    | "Backorder"
    | "Discontinued"
    | "Coming Soon"
    | "Made to Order"
    | "Store Only";
  inStock: number;
}
