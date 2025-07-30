import React, { useEffect, useState } from "react";
import "./FavoriteProduct.css";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { useNavigate } from "react-router-dom";
import type { FavoriteProductDisplay } from "../../interface/favoriteProductInterface";
import {
  deleteFavoriteProduct,
  getFavoriteProduct,
} from "../../redux/thunk/favoriteProduct";
import { addProductToCart, getCartProduct } from "../../redux/thunk/cart";
import { Eye, Heart } from "lucide-react";

export const FavoriteProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, favoriteProduct, cartProduct } = useAppSelector((state) => ({
    user: state.user,
    favoriteProduct: state.favoriteProduct,
    cartProduct: state.cartProduct,
  }));

  const [productData, setProductData] = useState<
    Array<FavoriteProductDisplay> | undefined
  >([]);
  console.log("productData: ", productData);

  //favorite product data
  const favoriteData = new Set(
    favoriteProduct?.data?.map((fav) => fav?.productId)
  );
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(favoriteData)
  );

  //cart data
  const [cart, setCart] = useState<Set<string>>(new Set());

  //get the favorite product and cart product
  useEffect(() => {
    if (user?.data?.id) {
      dispatch(
        getFavoriteProduct({ userId: user?.data?.id, withProductDetail: true })
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
    if (favoriteProduct?.data)
      setProductData(favoriteProduct?.data as Array<FavoriteProductDisplay>);
  }, [favoriteProduct?.data]);

  //set the favorite product
  useEffect(() => {
    const favoriteData = new Set(
      favoriteProduct?.data?.map((fav) => fav?.productId)
    );
    setFavorites(favoriteData);
  }, [favoriteProduct?.data]);

  //set the product in cart
  useEffect(() => {
    const cartData = new Set(cartProduct?.data?.map((data) => data?.productId));
    setCart(cartData);
  }, [cartProduct?.data]);

  //toggle favorite product
  const removeFavorite = async (productId: string) => {
    const userId = user?.data?.id;
    if (!userId) return;

    const favoritesTemp = new Set(favorites);

    if (favorites.has(productId)) {
      favoritesTemp.delete(productId);
      await dispatch(deleteFavoriteProduct({ userId, productId }));
    }
    setFavorites(favoritesTemp);
    if (user?.data?.id) {
      dispatch(
        getFavoriteProduct({ userId: user?.data?.id, withProductDetail: true })
      );
    }
  };

  //navigate to detail product
  const navigateToDetail = (
    productId: string,
    currentComponent: { name: string; path: string }
  ) => {
    if (!productId) return;
    navigate(
      `/products/${
        currentComponent?.name + "|" + currentComponent?.path
      }/${productId}`
    );
  };

  //calculated the  discount price
  const calculatedDiscountPrice = (discount: number, price: number) => {
    return (price - (price * discount) / 100).toFixed(2);
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
    await dispatch(addProductToCart({ userId, productId }));
  };

  return (
    <>
      <div className="fp-products-container">
        {productData?.map((data, index) => (
          <div key={index} className="fp-product-card">
            {/* Product Image */}
            <div className="fp-product-image">
              <img src={data?.product?.image} alt={data?.product?.name} />
              <div className="fp-hover-cart">
                <button
                  className="fp-hover-cart-content"
                  onClick={() =>
                    navigateToDetail(data?.productId, {
                      name: "My-Favorite",
                      path: "favorite-product",
                    })
                  }
                >
                  <Eye className="w-4 h-4" />
                  Quick View
                </button>
              </div>
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => removeFavorite(data?.productId)}
              className="fp-favorite-icon"
              aria-label="Toggle Favorite"
            >
              <Heart
                className={
                  favorites.has(data?.productId)
                    ? "fp-heart fp-selected"
                    : "fp-heart fp-unselected"
                }
              />
            </button>

            {/* Product Info */}
            <div className="fp-product-info">
              <h2 className="fp-product-title" title={data?.product?.name}>
                {data?.product?.name}
              </h2>

              {/* Static Rating */}
              <div className="fp-product-rating">
                {"★".repeat(2)}
                {"☆".repeat(3)}
                <span>{`2,038`}</span>
              </div>

              <p
                className="fp-product-description"
                title={data?.product?.description}
              >
                {data?.product?.description}
              </p>

              {/* Price */}
              <div className="fp-product-price-section">
                {Number(data?.product?.discount) > 0 ? (
                  <>
                    <div className="fp-price-discount">
                      <div className="fp-original-price">
                        ${Number(data?.product?.price).toFixed(2)}
                      </div>
                      <div className="fp-discount">
                        {Number(data?.product?.discount).toFixed(0)}%
                      </div>
                    </div>
                    <div className="fp-discounted-price">
                      $
                      {calculatedDiscountPrice(
                        Number(data?.product?.discount),
                        Number(data?.product?.price)
                      )}
                    </div>
                  </>
                ) : (
                  <div className="fp-product-price">
                    ${Number(data?.product?.price).toFixed(2)}
                  </div>
                )}
              </div>

              {(data?.product?.inStock > 0 && (
                <button
                  disabled={data?.product?.inStock <= 0}
                  onClick={() => {
                    if (cart.has(data?.productId)) {
                      navigate(`/cart`);
                    } else {
                      addToCart(user?.data?.id, data?.productId);
                    }
                  }}
                  className={`${
                    cart.has(data?.productId)
                      ? "fp-go-to-cart-btn"
                      : "fp-add-to-cart-btn"
                  }`}
                >
                  {(cart.has(data?.productId) && "Go to Cart") || "Add to Cart"}
                </button>
              )) || <div className="fp-product-out-of-stock">Out of Stock</div>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
