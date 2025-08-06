import { useEffect, useState } from "react";
import "./Products.css";
import { getProduct } from "../../redux/thunk/product";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import type { productDisplay } from "../../interface/productInterface";
import { Eye, Heart } from "lucide-react";
import {
  addFavoriteProduct,
  deleteFavoriteProduct,
  getFavoriteProduct,
} from "../../redux/thunk/favoriteProduct";
import { useNavigate } from "react-router-dom";
import { addProductToCart, getCartProduct } from "../../redux/thunk/cart";
import { Rating } from "../../components/rating/Rating";
import { getProductRating } from "../../redux/thunk/rating";

export const Products = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //redux slice
  const { data: productData } = useAppSelector((state) => state.product);
  const { user, favoriteProduct, cartProduct } = useAppSelector((state) => ({
    user: state.user,
    favoriteProduct: state.favoriteProduct,
    cartProduct: state.cartProduct,
  }));

  const [products, setProducts] = useState<productDisplay[] | undefined>();

  //favorite product data
  const favoriteData = new Set(
    favoriteProduct?.data?.map((fav) => fav?.productId)
  );
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(favoriteData)
  );

  //cart data
  // const cartData = new Set(cartProduct?.data?.map((data) => data?.productId));
  const [cart, setCart] = useState<Set<string>>(new Set());

  //get the product
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getProductRating());
  }, [dispatch, user]);

  //set the product
  useEffect(() => {
    if (productData) {
      setProducts(productData as productDisplay[]);
    }
  }, [productData]);

  //get the favorite product and cart product
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
  }, [user]);

  //set the favorite product
  useEffect(() => {
    const favoriteData = new Set(
      favoriteProduct?.data?.map((fav) => fav?.productId)
    );
    if (favorites.size === 0) setFavorites(favoriteData);
    // setFavorites(favoriteData);
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
    <div className="products-container">
      {products?.map((product) => (
        <div key={product.id} className="product-card">
          {/* Product Image */}
          <div className="product-image">
            <img src={product.image} alt={product.name} />
            <div className="hover-cart">
              <button
                className="hover-cart-content"
                onClick={() =>
                  navigateToDetail(product.id, {
                    name: "Shop",
                    path: "products",
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
            onClick={() => toggleFavorite(product.id)}
            className="favorite-icon"
            aria-label="Toggle Favorite"
          >
            <Heart
              className={
                favorites.has(product.id)
                  ? "heart selected"
                  : "heart unselected"
              }
            />
          </button>

          {/* Product Info */}
          <div className="product-info">
            <h2 className="product-title" title={product.name}>
              {product.name}
            </h2>

            {/* Rating */}
            <Rating
              productId={product.id}
              onClick={() => {
                navigateToDetail(product.id, {
                  name: "Shop",
                  path: "products",
                });
              }}
            />

            <p className="product-description" title={product.description}>
              {product.description}
            </p>

            {/* Price */}
            <div className="product-price-section">
              {Number(product.discount) > 0 ? (
                <>
                  <div className="price-discount">
                    <div className="original-price">
                      ${Number(product.price).toFixed(2)}
                    </div>
                    <div className="discount">
                      {Number(product.discount).toFixed(0)}%
                    </div>
                  </div>
                  <div className="discounted-price">
                    $
                    {calculatedDiscountPrice(
                      Number(product.discount),
                      Number(product.price)
                    )}
                  </div>
                </>
              ) : (
                <div className="product-price">
                  ${Number(product.price).toFixed(2)}
                </div>
              )}
            </div>

            <button
              disabled={product.inStock <= 0}
              onClick={() => {
                if (product.inStock <= 0) {
                  return;
                } else if (cart.has(product.id)) {
                  navigate(`/cart`);
                } else {
                  addToCart(user?.data?.id, product?.id);
                }
              }}
              className={`${
                product.inStock > 0
                  ? cart.has(product.id)
                    ? "go-to-cart-btn"
                    : "add-to-cart-btn"
                  : "product-out-of-stock"
              }`}
            >
              {product.inStock > 0
                ? (cart.has(product.id) && "Go to Cart") || "Add to Cart"
                : "Out of Stock"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
