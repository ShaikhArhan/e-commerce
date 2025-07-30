import { Route, Routes } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Products } from "../pages/products/Products";
import { Cart } from "../pages/cart/Cart";
import { Register } from "../pages/Authentication/register/Register";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { Login } from "../pages/Authentication/login/Login";
import { Profile } from "../pages/profile/Profile";
import { Otp } from "../pages/Authentication/otp/Otp";
import { ForgotPassword } from "../pages/Authentication/forgotPassword/ForgotPassword";
import { ProductDetail } from "../pages/products/ProductDetail";
import { BuyProduct } from "../pages/buyProduct/BuyProduct";
import { Order } from "../pages/order/Order";
import { FavoriteProduct } from "../pages/favoriteProduct/FavoriteProduct";
// import FileUpload from "../pages/FileUpload";


export const AppRoutes = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: "75px" }}>
        {/* <FileUpload/> */}
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/:prevComp/:productId"
              element={<ProductDetail />}
            />
            <Route path="/favorite-product" element={<FavoriteProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/buy-product" element={<BuyProduct />} />
            <Route path="/buy-product/:productId" element={<BuyProduct />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};
