"use client"

import { useEffect, useState } from "react"
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../hook/reduxHook"
import { deleteCartProduct, getCartProduct, updateCartProductQuantity } from "../redux/thunk/cart"
import { Link } from "react-router-dom"
import type { CartItem } from "../interface/cartInterface"

export const Cart = () => {
  const dispatch = useAppDispatch()
  const { cartProduct, user } = useAppSelector((state) => ({
    cartProduct: state.cartProduct,
    user: state.user,
  }))

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    if (user?.data?.id) {
      dispatch(getCartProduct({ userId: user.data.id, withProductDetail: true }))
    }
  }, [user?.data?.id])

  useEffect(() => {
    if (Array.isArray(cartProduct?.data)) {
      setCartItems(cartProduct.data)
    }
  }, [cartProduct?.data])

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) return
    await dispatch(
      updateCartProductQuantity({
        userId: user?.data?.id,
        productId,
        quantity,
      }),
    )
  }

  const removeItem = async (productId: string) => {
    await dispatch(deleteCartProduct({ userId: user?.data?.id, productId }))
  }

  // Calculate subtotal using discount if available
  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number.parseFloat(item.product?.price || "0")
    const discount = Number.parseFloat(item.product?.discount || "0")
    const finalPrice = discount > 0 ? price - (price * discount) / 100 : price
    return sum + finalPrice * item.quantity
  }, 0)

  const shipping = cartItems.length > 0 ? 10 : 0
  const total = subtotal + shipping

  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const price = Number.parseFloat(item.product?.price || "0")
              const discount = Number.parseFloat(item.product?.discount || "0")
              const hasDiscount = discount > 0
              const discountedPrice = hasDiscount ? price - (price * discount) / 100 : price

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-48 sm:h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.product?.image || "/placeholder.svg?height=128&width=128"}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.product?.name}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                          {item.product?.description}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3">
                        {hasDiscount ? (
                          <>
                            <span className="text-lg font-bold text-red-600">${discountedPrice.toFixed(2)}</span>
                            <span className="text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                              {discount}% OFF
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
                        )}
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="p-2 hover:bg-gray-50 transition-colors duration-200 rounded-l-lg"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="p-2 hover:bg-gray-50 transition-colors duration-200 rounded-r-lg"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.productId)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => alert("Buy functionality here")}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-colors duration-200 shadow-sm">
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">Secure checkout powered by SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
