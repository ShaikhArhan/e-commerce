import React, { useEffect, useState } from "react";
import "./Order.css";
import type {
  OrderDataUseState,
  ProductData,
} from "../../interface/orderInterface";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import {
  deleteOrderProduct,
  getOrderProduct,
} from "../../redux/thunk/orderProduct";
import { data } from "react-router-dom";

export const Order = () => {
  const dispatch = useAppDispatch();
  const { user, orderProduct } = useAppSelector((state) => ({
    user: state.user,
    orderProduct: state.orderProduct,
  }));

  const [orderData, setOrderData] = useState<Array<OrderDataUseState>>();
  console.log("orderData: ", orderData);

  //get order product
  useEffect(() => {
    if (user?.data?.id) dispatch(getOrderProduct(user?.data?.id));
    console.log("--getOrderProduct--");
  }, [user?.data?.id]);

  //set order product
  useEffect(() => {
    setOrderData(orderProduct?.data);
    console.log("--setOrderData--");
  }, [orderProduct?.data]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPaymentMethod = (method: string) => {
    return method.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "op-status-pending";
      case "confirmed":
        return "op-status-confirmed";
      case "shipped":
        return "op-status-shipped";
      case "delivered":
        return "op-status-delivered";
      case "cancelled":
        return "op-status-cancelled";
      default:
        return "op-status-pending";
    }
  };

  const calculateOrderTotal = (orderProductDetail: Array<ProductData>) => {
    return orderProductDetail.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
  };

  const isValidImageUrl = (image: string) => {
    return image.startsWith("data:image/") || image.startsWith("http");
  };

  const deleteOrder = async (orderId: string) => {
    const deleteOrderProductData = await dispatch(
      deleteOrderProduct(orderId)
    ).unwrap();
    if (deleteOrderProductData?.status) {
      console.log(
        "deleteOrderProductData?.status: ",
        deleteOrderProductData?.status
      );
      dispatch(getOrderProduct(user?.data?.id));
    }
  };

  return (
    <div className="op-order-list-container">
      <div className="op-order-list-header">
        <h1>Order Management</h1>
        <div className="op-order-summary">
          <span className="op-total-orders">
            Total Orders: {orderData?.length}
          </span>
        </div>
      </div>

      <div className="op-orders-grid">
        {orderData?.map((order, index) => (
          <div key={index} className="op-order-card">
            <div className="op-order-header">
              <div className="op-order-info">
                <h3 className="op-order-id">Order Id - {order?.id}</h3>
                <span
                  className={`op-order-status ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus.toUpperCase()}
                </span>
              </div>
              <div className="op-order-date">
                {formatDate(order.orderCreatedAt)}
              </div>
            </div>

            <div className="op-order-details">
              <div className="op-detail-row">
                <span className="op-detail-label">Payment Method:</span>
                <span className="op-detail-value">
                  {formatPaymentMethod(order.paymentMethod)}
                </span>
              </div>
              <div className="op-detail-row">
                <span className="op-detail-label">Delivery Address:</span>
                <span className="op-detail-value">{order.orderAddress}</span>
              </div>
              <div className="op-detail-row">
                <span className="op-detail-label">Total Items:</span>
                <span className="op-detail-value">
                  {order.totalOrderProduct}
                </span>
              </div>
            </div>

            <div className="op-products-section">
              <h4 className="op-products-title">
                Products ({order.orderProductDetail.length})
              </h4>
              <div className="op-products-list">
                {order.orderProductDetail.map((item, index) => {
                  const price = Number(item.product?.price) || 0;
                  const discount = Number(item.product?.discount) || 0;
                  const hasDiscount = discount > 0;
                  const discountedPrice = hasDiscount
                    ? (price - (price * discount) / 100)?.toFixed(2)
                    : price.toFixed(2);
                  return (
                    <div
                      key={`${item.productId}-${index}`}
                      className="op-product-item"
                    >
                      <div className="op-product-image">
                        {isValidImageUrl(item.product.image) ? (
                          <img
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              target.nextElementSibling!.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className="op-image-placeholder"
                          style={{
                            display: isValidImageUrl(item.product.image)
                              ? "none"
                              : "flex",
                          }}
                        >
                          <span>No Image</span>
                        </div>
                      </div>
                      <div className="op-product-details">
                        <h5 className="op-product-name">{item.product.name}</h5>
                        <div className="op-product-meta">
                          <span
                            className={`${
                              hasDiscount
                                ? "op-original-product-price"
                                : "op-product-price"
                            }`}
                          >
                            ₹{item.product.price}
                          </span>
                          {hasDiscount && (
                            <span
                              className={`${hasDiscount && "op-product-price"}`}
                            >
                              ₹{discountedPrice}
                            </span>
                          )}
                          {hasDiscount && (
                            <span className="op-product-discount">
                              {item.product.discount}% off
                            </span>
                          )}
                        </div>
                        <div className="op-product-quantity">
                          <span>Qty: {item.quantity}</span>
                          <span className="op-product-stock">
                            {item.product.stockStatus}
                          </span>
                        </div>
                      </div>
                      <div className="op-product-total">
                        <span className="op-total-price">
                          ₹{item.totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="op-order-footer">
              {order.orderStatus === "delivered" && (
                <button
                  className="op-order-delete"
                  onClick={() => {
                    deleteOrder(order.id);
                  }}
                >
                  Delete Order
                </button>
              )}
              <div className="op-order-total">
                <span className="op-total-label">Order Total:</span>
                <span className="op-total-amount">
                  ₹
                  {calculateOrderTotal(
                    order.orderProductDetail
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
