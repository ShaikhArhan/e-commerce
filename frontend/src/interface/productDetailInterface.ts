export interface ProductDetailInterface {
    id: string;
    image: string;
    name: string;
    description: string;
    price: string;
    discount: string;
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
