import type React from "react";
import { useEffect, useState } from "react";
import "./BuyProduct.css";
import type {
  AddOrderProductInterface,
  CustomerData,
  PaymentData,
  ProductData,
} from "../../interface/orderInterface";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { useNavigate, useParams } from "react-router-dom";
import { getCartProduct, getSpecificCartProduct } from "../../redux/thunk/cart";
import { addOrderProduct } from "../../redux/thunk/orderProduct";

export const BuyProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();
  console.log("productId: ", productId);

  const { cartProduct, user } = useAppSelector((state) => ({
    cartProduct: state.cartProduct,
    user: state.user,
  }));

  const [currentStep, setCurrentStep] = useState(1);
  const [productOrderingData, setProductOrderingData] =
    useState<Array<ProductData>>();
  console.log("productOrderingData: ", productOrderingData);
  const [userData, setUserData] = useState<CustomerData>();
  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: "credit_card",
  });
  const [sameAddress, setSameAddress] = useState<boolean>();
  const [orderDetails, setOrderDetails] = useState<object>();
  console.log("orderDetails: ", orderDetails);
  const steps = [
    {
      number: 1,
      title: "Customer Details",
      description: "Enter your information",
    },
    { number: 2, title: "Payment", description: "Complete your purchase" },
    { number: 3, title: "Confirmation", description: "Order confirmed" },
  ];

  //get cart product data
  useEffect(() => {
    if (
      user?.data?.id &&
      productId &&
      productId !== null &&
      productId !== undefined &&
      productId !== ""
    ) {
      dispatch(
        getSpecificCartProduct({
          userId: user?.data?.id,
          productId,
          withProductDetail: true,
        })
      );
    }
    if (
      (user?.data?.id && !productId) ||
      productId === null ||
      productId === undefined ||
      productId === ""
    ) {
      dispatch(
        getCartProduct({ userId: user?.data?.id, withProductDetail: true })
      );
    }
  }, [user?.data?.id]);

  //set cart data
  useEffect(() => {
    if (cartProduct?.data) {
      setProductOrderingData(cartProduct?.data);
    }
  }, [cartProduct?.data]);

  //set user data
  useEffect(() => {
    if (user?.data) {
      setUserData({
        ...user?.data,
        orderAddress: "",
        paymentMethod: "online_payment",
      });
    }
  }, [user?.data?.id]);

  useEffect(() => {
    if (
      sameAddress &&
      userData?.address !== null &&
      userData?.address !== undefined &&
      userData?.address !== ""
    ) {
      setUserData({
        ...userData,
        orderAddress: userData?.address,
      });
    }
  }, [sameAddress]);

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = productOrderingData?.reduce(
      (sum, productData) =>
        sum + parseFloat(productData?.product?.price) * productData?.quantity,
      0
    );
    const totalDiscount = productOrderingData?.reduce(
      (sum, productData) =>
        sum +
        parseFloat(productData?.product?.price) *
          (parseFloat(productData?.product?.discount) / 100) *
          productData.quantity,
      0
    );
    const total = productOrderingData?.reduce(
      (sum, productData) => sum + productData?.totalPrice,
      0
    );
    const totalQuantity = productOrderingData?.reduce(
      (sum, productData) => sum + productData?.quantity,
      0
    );

    return { subtotal, totalDiscount, total, totalQuantity };
  };

  const { subtotal, totalDiscount, total, totalQuantity } = calculateTotals();

  // add product order
  const addOrder = async (data: AddOrderProductInterface) => {
    const orderData = await dispatch(addOrderProduct(data)).unwrap();
    console.log("orderData: ", orderData);
    setOrderDetails(orderData?.data[0]);
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOrder({
      userId: userData?.id,
      orderProductDetailData: productOrderingData,
      orderAddress: userData?.orderAddress,
      paymentMethod:
        userData?.paymentMethod === "online_payment"
          ? paymentData?.method
          : userData?.paymentMethod,
    });
    setCurrentStep(3);
  };

  const getPaymentIcon = (method: string) => {
    const icons = {
      credit_card: "💳",
      paypal: "💰",
      apple_pay: "📱",
      google_pay: "📱",
      bank_transfer: "🏦",
      gift_card: "🎁",
      cash_on_delivery: "💵",
    };
    return icons[method as keyof typeof icons] || "💳";
  };

  return (
    <div className="bp-payment-stepper">
      {/* Stepper Header */}
      <div className="bp-stepper-header">
        <div className="bp-stepper-progress">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`${step.number != 3 && "bp-stepper-item"}`}
            >
              <div className="bp-stepper-content">
                <div
                  className={`bp-stepper-circle ${
                    currentStep >= step.number ? "bp-active" : ""
                  }`}
                >
                  {currentStep > step.number ? "✓" : step.number}
                </div>
                <div className="bp-stepper-text">
                  <div className="bp-stepper-title">{step.title}</div>
                  <div className="bp-stepper-description">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`bp-stepper-line ${
                    currentStep > step.number ? "bp-completed" : ""
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Customer Details */}
      {currentStep === 1 && (
        <div className="bp-card bp-customer-form">
          <div className="bp-card-header">
            <h2 className="bp-card-title">Customer Information</h2>
            <p className="bp-card-description">
              Please provide your details for delivery and contact
            </p>
          </div>
          <div className="bp-card-content">
            <form onSubmit={handleCustomerSubmit} className="bp-form">
              <div className="bp-form-row">
                <div className="bp-form-group">
                  <label htmlFor="fullname" className="bp-form-label">
                    Full Name *
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    className="bp-form-input"
                    value={userData?.fullname}
                    disabled
                    required
                  />
                </div>
                <div className="bp-form-group">
                  <label htmlFor="email" className="bp-form-label">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="bp-form-input"
                    value={userData?.email}
                    disabled
                    required
                  />
                </div>
              </div>

              <div className="bp-form-row">
                <div className="bp-form-group">
                  <label htmlFor="country" className="bp-form-label">
                    Country *
                  </label>
                  <input
                    id="country"
                    type="text"
                    className="bp-form-input"
                    value={userData?.country}
                    disabled
                    required
                  />
                </div>
                <div className="bp-form-group">
                  <label htmlFor="phoneNumber" className="bp-form-label">
                    Phone Number *
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className="bp-form-input"
                    value={userData?.phoneNumber}
                    disabled
                    required
                  />
                </div>
              </div>

              <div className="bp-form-group">
                <label htmlFor="userAddress" className="bp-form-label">
                  Your Address *
                </label>
                <input
                  id="userAddress"
                  type="text"
                  className="bp-form-input"
                  value={userData?.address}
                  placeholder="Street address, city, state, postal code"
                  disabled
                  required
                />
                <div style={{ textAlign: "left" }}>
                  <input
                    type="checkbox"
                    name=""
                    id="sameAddress"
                    checked={sameAddress || false}
                    onClick={(e) => {
                      e?.target?.checked
                        ? setSameAddress(true)
                        : setSameAddress(false);
                    }}
                  />
                  <label htmlFor="sameAddress">Same in Delivery Address</label>
                </div>
              </div>

              <div className="bp-form-group">
                <label htmlFor="orderAddress" className="bp-form-label">
                  Delivery Address *
                </label>
                <input
                  id="orderAddress"
                  type="text"
                  className="bp-form-input"
                  placeholder="Street address, city, state, postal code"
                  value={userData?.orderAddress}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      orderAddress: e.target.value,
                    })
                  }
                  disabled={sameAddress}
                  required
                />
              </div>

              <div className="bp-form-group">
                <label className="bp-form-label">Payment Method *</label>
                <div className="bp-radio-group">
                  <div className="bp-radio-item">
                    <input
                      type="radio"
                      id="online_payment"
                      name="paymentMethod"
                      value="online_payment"
                      checked={userData?.paymentMethod === "online_payment"}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          paymentMethod: e.target.value as "online_payment",
                        })
                      }
                    />
                    <label htmlFor="online_payment">Online Payment</label>
                  </div>
                  <div className="bp-radio-item">
                    <input
                      type="radio"
                      id="cash_on_delivery"
                      name="paymentMethod"
                      value="cash_on_delivery"
                      checked={userData?.paymentMethod === "cash_on_delivery"}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          paymentMethod: e.target.value as "cash_on_delivery",
                        })
                      }
                    />
                    <label htmlFor="cash_on_delivery">Cash on Delivery</label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bp-btn bp-btn-primary bp-btn-full"
                onClick={() => {
                  console.log("userData: ", userData);
                }}
              >
                Continue to Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Step 2: Payment */}
      {currentStep === 2 && (
        <div className="bp-payment-layout">
          {/* Product Details - Left Side */}
          <div className="bp-card bp-product-summary">
            <div className="bp-card-header">
              <h2 className="bp-card-title">Order Summary</h2>
              <p className="bp-card-description">
                {totalQuantity} items in your cart
              </p>
            </div>
            <div className="bp-card-content bp-scrollable">
              {/* Product Items */}
              {productOrderingData?.map((data, index) => {
                const price = parseFloat(data?.product?.price || "0");
                const discount = parseFloat(data?.product?.discount || "0");
                const hasDiscount = discount > 0;
                const discountedPrice = hasDiscount
                  ? price - (price * discount) / 100
                  : price;
                return (
                  <div key={index} className="bp-product-item">
                    <img
                      src={data?.product?.image || "/placeholder.svg"}
                      alt={data?.product?.name}
                      className="bp-product-image"
                    />
                    <div className="bp-product-details">
                      <h3 className="bp-product-name">{data?.product?.name}</h3>
                      <p className="bp-product-description">
                        {data?.product?.description}
                      </p>
                      <div className="bp-product-pricing">
                        <div className="bp-price-info">
                          <span className="bp-price-original">
                            ${parseFloat(data?.product?.price).toFixed(2)}
                          </span>
                          <span className="bp-price-final">
                            ${discountedPrice.toFixed(2)}
                          </span>
                          <span className="bp-discount-badge">
                            {data?.product?.discount}% OFF
                          </span>
                        </div>
                        <div className="bp-quantity-info">
                          <span className="bp-quantity-label">
                            Qty: {data.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="bp-separator"></div>

              {/* Price Breakdown */}
              <div className="bp-price-breakdown">
                <div className="bp-price-row">
                  <span>Subtotal ({totalQuantity} items):</span>
                  <span className="bp-price-original">
                    ${subtotal?.toFixed(2)}
                  </span>
                </div>
                <div className="bp-price-row">
                  <span>Total Discount:</span>
                  <span className="bp-price-discount">
                    -${totalDiscount?.toFixed(2)}
                  </span>
                </div>
                <div className="bp-price-row">
                  <span>Quantity:</span>
                  <span>{totalQuantity} items</span>
                </div>
                <div className="bp-price-row">
                  <span>Quantity × Discounted Price:</span>
                  <span>${total?.toFixed(2)}</span>
                </div>
                <div className="bp-price-row bp-price-total">
                  <span>Total:</span>
                  <span>${total?.toFixed(2)}</span>
                </div>
              </div>

              <div className="bp-savings-badge">
                You save ${totalDiscount?.toFixed(2)}!
              </div>
            </div>
          </div>

          {/* Payment Form - Right Side */}
          <div className="bp-card bp-payment-form">
            <div className="bp-card-header">
              <h2 className="bp-card-title">Payment Details</h2>
              <p className="bp-card-description">
                {userData?.paymentMethod === "cash_on_delivery"
                  ? "You have selected Cash on Delivery"
                  : "Choose your payment method and enter details"}
              </p>
            </div>
            <div className="bp-card-content bp-scrollable">
              <form onSubmit={handlePaymentSubmit} className="bp-form">
                {userData?.paymentMethod === "online_payment" && (
                  <>
                    <div className="bp-form-group">
                      <label className="bp-form-label">Payment Method</label>
                      <div className="bp-radio-group">
                        {[
                          { value: "credit_card", label: "Credit Card" },
                          { value: "paypal", label: "PayPal" },
                          { value: "apple_pay", label: "Apple Pay" },
                          { value: "google_pay", label: "Google Pay" },
                          { value: "bank_transfer", label: "Bank Transfer" },
                          { value: "gift_card", label: "Gift Card" },
                        ].map((method) => (
                          <div key={method.value} className="bp-radio-item">
                            <input
                              type="radio"
                              id={method.value}
                              name="paymentMethodType"
                              value={method.value}
                              checked={paymentData.method === method.value}
                              onChange={(e) =>
                                setPaymentData({
                                  ...paymentData,
                                  method: e.target.value as any,
                                })
                              }
                            />
                            <label
                              htmlFor={method.value}
                              className="bp-payment-method-label"
                            >
                              <span className="bp-payment-icon">
                                {getPaymentIcon(method.value)}
                              </span>
                              {method.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Credit Card Fields */}
                    {paymentData.method === "credit_card" && (
                      <div className="bp-payment-method-form">
                        <h4 className="bp-method-title">
                          Credit Card Information
                        </h4>
                        <div className="bp-form-group">
                          <label htmlFor="cardName" className="bp-form-label">
                            Cardholder Name *
                          </label>
                          <input
                            id="cardName"
                            type="text"
                            className="bp-form-input"
                            value={paymentData.cardName || ""}
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                cardName: e.target.value,
                              })
                            }
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="bp-form-group">
                          <label htmlFor="cardNumber" className="bp-form-label">
                            Card Number *
                          </label>
                          <input
                            id="cardNumber"
                            type="text"
                            className="bp-form-input"
                            value={paymentData.cardNumber || ""}
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                cardNumber: e.target.value,
                              })
                            }
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                          />
                        </div>
                        <div className="bp-form-row">
                          <div className="bp-form-group">
                            <label
                              htmlFor="expiryDate"
                              className="bp-form-label"
                            >
                              Expiry Date *
                            </label>
                            <input
                              id="expiryDate"
                              type="text"
                              className="bp-form-input"
                              value={paymentData.expiryDate || ""}
                              onChange={(e) =>
                                setPaymentData({
                                  ...paymentData,
                                  expiryDate: e.target.value,
                                })
                              }
                              placeholder="MM/YY"
                              maxLength={5}
                              required
                            />
                          </div>
                          <div className="bp-form-group">
                            <label htmlFor="cvv" className="bp-form-label">
                              CVV *
                            </label>
                            <input
                              id="cvv"
                              type="text"
                              className="bp-form-input"
                              value={paymentData.cvv || ""}
                              onChange={(e) =>
                                setPaymentData({
                                  ...paymentData,
                                  cvv: e.target.value,
                                })
                              }
                              placeholder="123"
                              maxLength={4}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PayPal */}
                    {paymentData.method === "paypal" && (
                      <div className="bp-payment-method-form">
                        <h4 className="bp-method-title">PayPal Payment</h4>
                        <p className="bp-method-description">
                          You will be redirected to PayPal to complete your
                          payment securely.
                        </p>
                        <button type="button" className="bp-btn bp-btn-paypal">
                          Continue with PayPal
                        </button>
                      </div>
                    )}

                    {/* Bank Transfer */}
                    {paymentData.method === "bank_transfer" && (
                      <div className="bp-payment-method-form">
                        <h4 className="bp-method-title">Bank Transfer</h4>
                        <p className="bp-method-description">
                          Please transfer the amount to our bank account and
                          provide the transaction details below.
                        </p>
                        <div className="bp-bank-details">
                          <p>
                            <strong>Bank:</strong> Example Bank
                          </p>
                          <p>
                            <strong>Account:</strong> 1234567890
                          </p>
                          <p>
                            <strong>Routing:</strong> 987654321
                          </p>
                        </div>
                        <div className="bp-form-group">
                          <label
                            htmlFor="transactionId"
                            className="bp-form-label"
                          >
                            Transaction ID (Optional)
                          </label>
                          <input
                            id="transactionId"
                            type="text"
                            className="bp-form-input"
                            value={paymentData.transactionId || ""}
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                transactionId: e.target.value,
                              })
                            }
                            placeholder="Enter transaction reference"
                          />
                        </div>
                        <div className="bp-form-group">
                          <label htmlFor="proofFile" className="bp-form-label">
                            Upload Proof (Optional)
                          </label>
                          <input
                            id="proofFile"
                            type="file"
                            className="bp-form-input"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                proofFile: e.target.files?.[0],
                              })
                            }
                          />
                          <p className="bp-form-help">
                            Upload receipt or screenshot of transfer (JPG, PNG,
                            PDF)
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Gift Card */}
                    {paymentData.method === "gift_card" && (
                      <div className="bp-payment-method-form">
                        <h4 className="bp-method-title">Gift Card Payment</h4>
                        <div className="bp-form-group">
                          <label
                            htmlFor="giftCardCode"
                            className="bp-form-label"
                          >
                            Gift Card Code *
                          </label>
                          <input
                            id="giftCardCode"
                            type="text"
                            className="bp-form-input"
                            value={paymentData.giftCardCode || ""}
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                giftCardCode: e.target.value,
                              })
                            }
                            placeholder="Enter gift card code"
                            required
                          />
                        </div>
                        <div className="bp-form-group">
                          <label
                            htmlFor="giftCardPin"
                            className="bp-form-label"
                          >
                            PIN *
                          </label>
                          <input
                            id="giftCardPin"
                            type="password"
                            className="bp-form-input"
                            value={paymentData.giftCardPin || ""}
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                giftCardPin: e.target.value,
                              })
                            }
                            placeholder="Enter PIN"
                            maxLength={6}
                            required
                          />
                        </div>
                        <button
                          type="button"
                          className="bp-btn bp-btn-secondary"
                        >
                          Validate Gift Card
                        </button>
                      </div>
                    )}

                    {/* Apple Pay */}
                    {paymentData.method === "apple_pay" && (
                      <div className="bp-payment-method-form">
                        <h4 className="bp-method-title">Apple Pay</h4>
                        <p className="bp-method-description">
                          Use Touch ID or Face ID to pay with Apple Pay.
                        </p>
                        <button
                          type="button"
                          className="bp-btn bp-btn-apple-pay"
                        >
                          📱 Pay with Apple Pay
                        </button>
                      </div>
                    )}

                    {/* Google Pay */}
                    {paymentData.method === "google_pay" && (
                      <div className="bp-payment-method-form">
                        <h4 className="bp-method-title">Google Pay</h4>
                        <p className="bp-method-description">
                          Complete your payment using Google Pay.
                        </p>
                        <button
                          type="button"
                          className="bp-btn bp-btn-google-pay"
                        >
                          📱 Pay with Google Pay
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Cash on Delivery */}
                {userData?.paymentMethod === "cash_on_delivery" && (
                  <div className="bp-payment-method-form">
                    <h4 className="bp-method-title">Cash on Delivery</h4>
                    <p className="bp-method-description">
                      You will pay in cash when your order is delivered to your
                      address.
                    </p>
                    <div className="bp-delivery-info">
                      <p>
                        <strong>Delivery Address:</strong>
                      </p>
                      <p>{userData.orderAddress}</p>
                    </div>
                    <div className="bp-cod-note">
                      <p>
                        <strong>Note:</strong> Please keep the exact amount
                        ready for delivery.
                      </p>
                    </div>
                  </div>
                )}

                <div className="bp-payment-total">
                  <div className="bp-total-amount">
                    <span className="bp-total-label">Amount to Pay:</span>
                    <span className="bp-total-price">${total?.toFixed(2)}</span>
                  </div>

                  <div className="bp-form-actions">
                    <button
                      type="button"
                      className="bp-btn bp-btn-secondary"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </button>
                    <button type="submit" className="bp-btn bp-btn-primary">
                      {userData?.paymentMethod === "cash_on_delivery"
                        ? "Confirm Order"
                        : "Pay Now"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Success */}
      {currentStep === 3 && (
        <div className="bp-success-page">
          <div className="bp-card bp-success-card">
            <div className="bp-card-header bp-success-header">
              <div className="bp-success-icon">✓</div>
              <h2 className="bp-success-title">Order Confirmed!</h2>
              <p className="bp-success-description">
                Thank you for your purchase. Your order has been successfully
                placed.
              </p>
            </div>
            <div className="bp-card-content">
              {/* Customer Details */}
              <div className="bp-details-section">
                <h3 className="bp-section-title">Customer Details</h3>
                <div className="bp-details-grid">
                  <div className="bp-detail-item">
                    <span className="bp-detail-label">Name:</span>
                    <p className="bp-detail-value">{userData?.fullname}</p>
                  </div>
                  <div className="bp-detail-item">
                    <span className="bp-detail-label">Email:</span>
                    <p className="bp-detail-value">{userData?.email}</p>
                  </div>
                  <div className="bp-detail-item">
                    <span className="bp-detail-label">Phone:</span>
                    <p className="bp-detail-value">{userData?.phoneNumber}</p>
                  </div>
                  <div className="bp-detail-item">
                    <span className="bp-detail-label">Country:</span>
                    <p className="bp-detail-value">{userData?.country}</p>
                  </div>
                  <div className="bp-detail-item bp-detail-full">
                    <span className="bp-detail-label">Delivery Address:</span>
                    <p className="bp-detail-value">{userData?.orderAddress}</p>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="bp-details-section">
                <h3 className="bp-section-title">Product Details</h3>
                {productOrderingData?.map((data, index) => {
                  const price = parseFloat(data?.product?.price || "0");
                  const discount = parseFloat(data?.product?.discount || "0");
                  const hasDiscount = discount > 0;
                  const discountedPrice = hasDiscount
                    ? price - (price * discount) / 100
                    : price;
                  return (
                    <div key={index} className="bp-product-summary-final">
                      <img
                        src={data?.product?.image || "/placeholder.svg"}
                        alt={data?.product?.name}
                        className="bp-product-image-small"
                      />
                      <div className="bp-product-info">
                        <h4 className="bp-product-name">
                          {data?.product?.name}
                        </h4>
                        <p className="bp-product-description">
                          {data?.product?.description}
                        </p>
                        <div className="bp-price-info">
                          <span className="bp-price-original">
                            ${price?.toFixed(2)}
                          </span>
                          <span className="bp-price-final">
                            ${discountedPrice?.toFixed(2)}
                          </span>
                          <span className="bp-discount-badge">
                            {data?.product?.discount}% OFF
                          </span>
                          <span className="bp-quantity-badge">
                            Qty: {data?.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Payment Details */}
              <div className="bp-details-section">
                <h3 className="bp-section-title">Payment Details</h3>
                <div className="bp-payment-summary">
                  <div className="bp-payment-row">
                    <span>Payment Method:</span>
                    <span className="bp-payment-method">
                      {userData?.paymentMethod === "cash_on_delivery"
                        ? "Cash on Delivery"
                        : paymentData.method.replace("_", " ")}
                    </span>
                  </div>

                  {paymentData.method === "credit_card" &&
                    paymentData.cardNumber && (
                      <div className="bp-payment-row">
                        <span>Card:</span>
                        <span>****{paymentData.cardNumber.slice(-4)}</span>
                      </div>
                    )}

                  {paymentData.method === "bank_transfer" &&
                    paymentData.transactionId && (
                      <div className="bp-payment-row">
                        <span>Transaction ID:</span>
                        <span>{paymentData.transactionId}</span>
                      </div>
                    )}

                  {paymentData.method === "gift_card" &&
                    paymentData.giftCardCode && (
                      <div className="bp-payment-row">
                        <span>Gift Card:</span>
                        <span>****{paymentData.giftCardCode.slice(-4)}</span>
                      </div>
                    )}

                  <div className="bp-payment-row">
                    <span>Total Items:</span>
                    <span>{totalQuantity}</span>
                  </div>
                  <div className="bp-payment-row">
                    <span>Total Discount:</span>
                    <span className="bp-price-discount">
                      -${totalDiscount?.toFixed(2)}
                    </span>
                  </div>
                  <div className="bp-payment-row bp-payment-total-row">
                    <span>Amount Paid:</span>
                    <span className="bp-amount-paid">${total?.toFixed(2)}</span>
                  </div>
                  <div className="bp-payment-row">
                    <span>Order ID:</span>
                    <span className="bp-order-id">{orderDetails?.id}</span>
                  </div>
                </div>
              </div>

              <div className="bp-success-footer">
                <p className="bp-confirmation-text">
                  You will receive a confirmation email shortly with your order
                  details.
                </p>
                <button
                  className="bp-btn bp-btn-primary"
                  onClick={() => navigate("/order")}
                >
                  My Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
