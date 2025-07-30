import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { getProductById } from "../../redux/thunk/product";
import {
  addFavoriteProduct,
  deleteFavoriteProduct,
  getFavoriteProduct,
} from "../../redux/thunk/favoriteProduct";
import { addProductToCart, getCartProduct } from "../../redux/thunk/cart";
import { Heart } from "lucide-react";

export const ProductDetail = () => {
  const { prevComp, productId } = useParams() as {
    prevComp: string;
    productId: string;
  };
  const  [prevCompName, prevCompPath]  = prevComp.split('|');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const specificProduct = useAppSelector((state) => state.specificProduct);
  const { user, favoriteProduct, cartProduct } = useAppSelector((state) => ({
    user: state.user,
    favoriteProduct: state.favoriteProduct,
    cartProduct: state.cartProduct,
  }));

  interface Product {
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

  const [product, setProduct] = useState<Product>();
  //favorite product data
  const favoriteData = new Set(
    favoriteProduct?.data?.map((fav) => fav?.productId)
  );
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(favoriteData)
  );
  console.log("favorites: ", favorites);

  //cart data
  // const cartData = new Set(cartProduct?.data?.map((data) => data?.productId));
  const [cart, setCart] = useState<Set<string>>(new Set());
  console.log("cart: ", cart);

  useEffect(() => {
    const fetchProduct = async (productId: string) => {
      await dispatch(getProductById(productId));
    };
    fetchProduct(productId);
  }, [productId]);

  useEffect(() => {
    setProduct(specificProduct?.data[0]);
  }, [specificProduct?.data]);

  //get the favorite product
  useEffect(() => {
    if (user?.data?.id) {
      dispatch(
        getFavoriteProduct({ userId: user?.data?.id, withProductDetail: false })
      );
    }
    if (user?.data?.id) {
      dispatch(
        getCartProduct({ userId: user?.data?.id, withProductDetail: false })
      );
    }
  }, [user?.data?.id]);

  //set the favorite product
  useEffect(() => {
    const favoriteData = new Set(
      favoriteProduct?.data?.map((fav) => fav?.productId)
    );
    // if (favorites.size === 0) setFavorites(favoriteData);
    setFavorites(favoriteData);
  }, [favoriteProduct?.data]);

  //set the product in cart
  useEffect(() => {
    const cartData = new Set(cartProduct?.data?.map((data) => data.productId));
    // if (cart.size === 0) setCart(cartData);
    setCart(cartData);
  }, [cartProduct?.data]);

  //toggle favorite product
  const toggleFavorite = async (productId: string) => {
    const userId = user?.data?.id;
    if (!userId) return;

    const favoritesTemp = new Set(favorites);
    const isFavorite = favorites.has(productId);

    if (isFavorite) {
      favoritesTemp.delete(productId);
      await dispatch(deleteFavoriteProduct({ userId, productId }));
    } else {
      favoritesTemp.add(productId);
      await dispatch(addFavoriteProduct({ userId, productId }));
    }
    setFavorites(favoritesTemp);
  };

  const calculatedDiscountPrice = () => {
    const discountedPrice = (
      parseFloat(product?.price) *
      (1 - parseFloat(product?.discount) / 100)
    ).toFixed(2);
    return discountedPrice;
  };

  //add to cart
  const addToCart = async (userId: string, productId: string) => {
    const cartTemp = new Set(cart);

    if (!userId || userId === "") {
      return navigate("/login");
    }
    if (!productId || productId === "") {
      console.error("Error: Add to cart, product Id is required");
      return;
    }
    cartTemp.add(productId);
    setCart(cartTemp);
    console.log("userId, productId: ", userId, productId);
    await dispatch(addProductToCart({ userId, productId }));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="pd-container">
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="breadcrumb">
        <ol className="breadcrumb-list">
          <li>
            <span className="breadcrumb-separator">›</span>
            <Link to={`/${prevCompPath}`} className="breadcrumb-link">
              {prevCompName}
            </Link>
          </li>
          <li>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">{product.name}</span>
          </li>
        </ol>
      </nav>

      {/* Product Content */}
      <div className="pd-image-section">
        <img src={product.image} alt={product.name} className="pd-image" />
      </div>

      <div className="pd-info-section">
        <div className="pd-header">
          <h1 className="pd-title">{product.name}</h1>

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(product.id)}
            className="pd-favorite-icon"
            aria-label="Toggle Favorite"
          >
            <Heart
              className={
                favorites.has(product.id)
                  ? "pd-heart pd-selected"
                  : "pd-heart pd-unselected"
              }
            />
          </button>
        </div>

        <p className="pd-description">{product.description}</p>

        <div className="pd-price-section">
          <span className="pd-original-price">₹{product.price}</span>
          <span className="pd-discounted-price">
            ₹{calculatedDiscountPrice()}
          </span>
          <span className="pd-discount">({product.discount}% off)</span>
        </div>

        <div className="pd-stock-status">
          <strong>{product.stockStatus}</strong> — {product.inStock} available
        </div>

        {(product?.inStock > 0 && (
          <button
            onClick={() => {
              if (cart.has(product.id)) {
                navigate(`/cart`);
              } else {
                addToCart(user?.data?.id, product?.id);
              }
            }}
            className={`${
              cart.has(product.id) ? "pd-go-to-cart-button" : "pd-buy-button"
            }`}
          >
            {(cart.has(product.id) && "Go to Cart") || "Add to Cart"}
          </button>
        )) || <div className="pd-product-out-of-stock">Out of Stock</div>}
      </div>
    </div>
  );
};
