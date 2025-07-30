import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import "./Cart.css";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import {
  deleteCartProduct,
  getCartProduct,
  updateCartProductQuantity,
} from "../../redux/thunk/cart";
import type { CartItem } from "../../interface/cartInterface";
import debounce from "../../service/debounce";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { cartProduct, user } = useAppSelector((state) => ({
    cartProduct: state.cartProduct,
    user: state.user,
  }));

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (user?.data?.id) {
      dispatch(
        getCartProduct({ userId: user?.data?.id, withProductDetail: true })
      );
    }
  }, [user?.data?.id]);

  useEffect(() => {
    if (cartProduct?.data) {
      setCartItems(cartProduct?.data);
    }
  }, [cartProduct?.data]);

  // Create once on mount
  const debounceUpdateCartProductQuantityRef = useRef(
    debounce(async (userId: string, productId: string, quantity: number) => {
      await dispatch(
        updateCartProductQuantity({ userId, productId, quantity })
      );
    }, 100)
  );

  const updateQuantity = (
    productId: string,
    quantity: number,
    productDiscountPrice: string
  ) => {
    if (quantity <= 0) return;
    if (
      quantity >
      cartItems?.filter((data) => data.productId === productId)[0].product
        .inStock
    )
      return;

    setCartItems((prev) =>
      prev?.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: quantity,
              totalPrice: parseFloat(productDiscountPrice) * quantity,
            }
          : item
      )
    );

    debounceUpdateCartProductQuantityRef.current(
      user?.data?.id,
      productId,
      quantity
    );
  };

  const removeItem = async (productId: string) => {
    setCartItems((prev) =>
      prev?.filter((data) => data.productId !== productId)
    );
    await dispatch(deleteCartProduct({ userId: user?.data?.id, productId }));
  };

  // Calculate subtotal using discount if available
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.product?.price || "0");
    const discount = parseFloat(item.product?.discount || "0");
    const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;
    return sum + finalPrice * item.quantity;
  }, 0);

  const shipping = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  if (!cartItems.length) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">Shopping Cart</h1>
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => {
          const price = parseFloat(item.product?.price || "0");
          const discount = parseFloat(item.product?.discount || "0");
          const hasDiscount = discount > 0;
          const discountedPrice = hasDiscount
            ? price - (price * discount) / 100
            : price;

          return (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.product?.image} alt={item.product?.name} />
              </div>
              <div className="item-details">
                <h3 className="item-title">{item.product?.name}</h3>
                <p className="item-description">{item.product?.description}</p>
                <div className="item-price">
                  {hasDiscount ? (
                    <>
                      <span className="original-price">
                        ${price.toFixed(2)}
                      </span>
                      <span className="discount-badge">{discount}%</span>
                      <br />
                      <span className="discounted-price">
                        ${discountedPrice.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span>${price.toFixed(2)}</span>
                  )}
                </div>

                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.quantity - 1,
                        discountedPrice.toFixed(2)
                      )
                    }
                  >
                    <FaMinus />
                  </button>

                  <span className="quantity">
                    <input
                      type="number"
                      style={{
                        width: `${item.quantity.toString().length * 10 + 20}px`,
                      }}
                      value={item.quantity}
                      onChange={(e) => {
                        updateQuantity(
                          item.productId,
                          Number(e.target.value),
                          discountedPrice.toFixed(2)
                        );
                      }}
                    />
                  </span>

                  <button
                    className="quantity-btn"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.quantity + 1,
                        discountedPrice.toFixed(2)
                      )
                    }
                  >
                    <FaPlus />
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.productId)}
                  >
                    <FaTrash />
                  </button>
                  <div className="buy-btn-content">
                    <button
                      className="buy-btn"
                      onClick={() => navigate(`/buy-product/${item.productId}`)}
                    >
                      Buy
                    </button>
                    <span className="buy-btn-total-ammount">
                      $ {item?.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <h2 className="summary-title">Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="summary-row summary-total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          className="checkout-btn"
          onClick={() => navigate("/buy-product")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
