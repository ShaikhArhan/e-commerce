import { eq, ilike, or } from "drizzle-orm";
import { db } from "../config/db";
import { products } from "../drizzle/schema/products";
import {
  AddProductDto,
  UpdateProductDto,
} from "../dtos/productDto";
import chalk from "chalk";

export const addProductService = async (data: AddProductDto) => {
  try {
    const {
      vendorId,
      vendorAddress,
      image,
      name,
      description,
      price,
      discount,
      stockStatus,
      inStock,
    } = data;

    if (
      vendorId === undefined ||
      vendorId === null ||
      vendorId === "" ||
      vendorAddress === undefined ||
      vendorAddress === null ||
      vendorAddress === "" ||
      image === undefined ||
      image === null ||
      image === "" ||
      name === undefined ||
      name === null ||
      name === "" ||
      description === undefined ||
      description === null ||
      description === "" ||
      price === undefined ||
      price === null ||
      stockStatus === undefined ||
      stockStatus === null ||
      inStock === undefined ||
      inStock === null
    ) {
      throw new Error("All fields are required");
    }

    const response = await db
      .insert(products)
      .values({
        vendorId,
        vendorAddress,
        image,
        name,
        description,
        price,
        discount,
        stockStatus,
        inStock,
      })
      .returning();

    if (!response) {
      throw new Error("Add product failed");
    }

    return {
      data: response,
      message: "Add product successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("addProduct service error:", error));
    return {
      message: "Add product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const addManyProductService = async (
  productDatas: Array<AddProductDto>
) => {
  try {
    if (!productDatas || productDatas.length === 0) {
      throw new Error("Products data are required to add many product");
    }

    // const BATCH_SIZE = 1;
    // const insertedData: any[] = [];

    // Split and insert in batches
    // for (let i = 0; i < productDatas.length; i += BATCH_SIZE) {
    //   const batch = productDatas.slice(i, i + BATCH_SIZE);
    //   const batchResponse = await db.insert(products).values(batch).returning();

    //   if (!batchResponse) {
    //     throw new Error(`Batch insert failed at batch ${i / BATCH_SIZE + 1}`);
    //   }

    //   insertedData.push(...batchResponse);
    // }
    const response = await db.insert(products).values(productDatas).returning();

    if (!response) {
      throw new Error("Add many product failed");
    }
    return {
      data: response,
      message: "Add many product successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("addManyProduct service error:", error));
    return {
      message: "Add many product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getProductService = async () => {
  try {
    const response = await db
      .select({
        id: products.id,
        image: products.image,
        name: products.name,
        description: products.description,
        price: products.price,
        discount: products.discount,
        stockStatus: products.stockStatus,
        inStock: products.inStock,
      })
      .from(products);

    if (!response) {
      throw new Error("Fetching product failed");
    }
    if (response.length === 0) {
      throw new Error("No product available");
    }

    return {
      data: response,
      message: "Fetching product successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("getProduct service error:", error));
    return {
      message: "Fetching product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getProductByAdminService = async () => {
  try {
    const response = await db.select().from(products);

    if (!response) {
      throw new Error("Fetching product failed");
    }
    if (response.length === 0) {
      throw new Error("No product available");
    }

    return {
      data: response,
      message: "Fetching product successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("getProduct service error:", error));
    return {
      message: "Fetching product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getProductByIdService = async (id: string) => {
  try {
    if (!id || id === "") {
      throw new Error("Product specification required");
    }

    const response = await db
      .select({
        id: products.id,
        image: products.image,
        name: products.name,
        description: products.description,
        price: products.price,
        discount: products.discount,
        stockStatus: products.stockStatus,
        inStock: products.inStock,
      })
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!response) {
      throw new Error("Fetching specific product failed");
    }
    if (response.length === 0) {
      throw new Error("No specific product available");
    }

    return {
      data: response,
      message: "Fetching specific product successful",
      status: true,
    };
  } catch (error: any) {
    console.error(chalk.bgRed("getProductById service error:", error));
    return {
      message: "Fetching specific product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getProductByNameAndDescriptionService = async (
  searchData: string
) => {
  try {
    if (!searchData || searchData === "") {
      throw new Error("Search data is required to fetch products");
    }

    searchData = `%${searchData.trim()}%`;

    const response = await db
      .select({
        id: products.id,
        image: products.image,
        name: products.name,
        description: products.description,
        price: products.price,
        discount: products.discount,
        stockStatus: products.stockStatus,
        inStock: products.inStock,
      })
      .from(products)
      .where(
        or(
          ilike(products.name, searchData),
          ilike(products.description, searchData)
        )
      );

    if (!response) {
      throw new Error("Fetching searched product failed");
    }
    if (response.length === 0) {
      throw new Error("No searched product available");
    }

    return {
      data: response,
      message: "Fetching searched product successful",
      status: true,
    };
  } catch (error) {
    console.error(
      chalk.bgRed("getProductByNameAndDescription service error:", error)
    );
    return {
      message: "Fetching searched product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const updatedProductByIdService = async (
  id: string,
  data: UpdateProductDto
) => {
  try {
    if (!id) {
      throw new Error("Id needed to update specific product");
    }

    const response = await db
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning({
        vendorAddress: products.vendorAddress,
        image: products.image,
        name: products.name,
        description: products.description,
        price: products.price,
        discount: products.discount,
        stockStatus: products.stockStatus,
        inStock: products.inStock,
      });

    if (!response) {
      throw new Error("Update specific product failed");
    }
    if (response.length === 0) {
      throw new Error("No product found");
    }

    return {
      data: response,
      message: "Update specific product successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("updatedProductById service error:", error));
    return {
      message: "Updating specific product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const deleteProductByIdService = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Id needed to delete specific product");
    }

    const response = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning({
        id: products.id,
        vendorId: products.vendorId,
        vendorAddress: products.vendorAddress,
        image: products.image,
        name: products.name,
        description: products.description,
        price: products.price,
        discount: products.discount,
        stockStatus: products.stockStatus,
        inStock: products.inStock,
      });

    if (!response) {
      throw new Error("Delete specific product failed");
    }
    if (response.length === 0) {
      throw new Error("No product found");
    }

    return {
      data: response,
      message: "Delete specific product successful",
      status: true,
    };
  } catch (error) {
    console.error(chalk.bgRed("deleteProductById service error:", error));
    return {
      message: "Deleteing specific product failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
