// import { lazy, Suspense, useState } from "react";
// import { Route, Routes } from "react-router-dom";
// // import { Header } from "../components/header/Header";
// // import { Products } from "../pages/products/Products";
// // import { Cart } from "../pages/cart/Cart";
// // import { Register } from "../pages/Authentication/register/Register";
// // import { PublicRoutes } from "./PublicRoutes";
// // import { PrivateRoutes } from "./PrivateRoutes";
// // import { Login } from "../pages/Authentication/login/Login";
// // import { Profile } from "../pages/profile/Profile";
// // import { Otp } from "../pages/Authentication/otp/Otp";
// // import { ForgotPassword } from "../pages/Authentication/forgotPassword/ForgotPassword";
// // import { ProductDetail } from "../pages/products/ProductDetail";
// // import { BuyProduct } from "../pages/buyProduct/BuyProduct";
// // import { Order } from "../pages/order/Order";
// // import { FavoriteProduct } from "../pages/favoriteProduct/FavoriteProduct";
// // // import FileUpload from "../pages/FileUpload";
// import { PublicRoutes } from "./PublicRoutes";
// import { PrivateRoutes } from "./PrivateRoutes";
// import { LoadingBar } from "../components/loadingBar/LoadingBar";

// const Header = lazy(() =>
//   import("../components/header/Header").then((module) => ({
//     default: module.Header,
//   }))
// );
// const Products = lazy(() =>
//   import("../pages/products/Products").then((module) => ({
//     default: module.Products,
//   }))
// );
// const Cart = lazy(() =>
//   import("../pages/cart/Cart").then((module) => ({ default: module.Cart }))
// );
// const Register = lazy(() =>
//   import("../pages/Authentication/register/Register").then((module) => ({
//     default: module.Register,
//   }))
// );
// const Login = lazy(() =>
//   import("../pages/Authentication/login/Login").then((module) => ({
//     default: module.Login,
//   }))
// );
// const Profile = lazy(() =>
//   import("../pages/profile/Profile").then((module) => ({
//     default: module.Profile,
//   }))
// );
// const Otp = lazy(() =>
//   import("../pages/Authentication/otp/Otp").then((module) => ({
//     default: module.Otp,
//   }))
// );
// const ForgotPassword = lazy(() =>
//   import("../pages/Authentication/forgotPassword/ForgotPassword").then(
//     (module) => ({ default: module.ForgotPassword })
//   )
// );
// const ProductDetail = lazy(() =>
//   import("../pages/products/ProductDetail").then((module) => ({
//     default: module.ProductDetail,
//   }))
// );
// const BuyProduct = lazy(() =>
//   import("../pages/buyProduct/BuyProduct").then((module) => ({
//     default: module.BuyProduct,
//   }))
// );
// const Order = lazy(() =>
//   import("../pages/order/Order").then((module) => ({ default: module.Order }))
// );
// const FavoriteProduct = lazy(() =>
//   import("../pages/favoriteProduct/FavoriteProduct").then((module) => ({
//     default: module.FavoriteProduct,
//   }))
// );
// // import FileUpload from "../pages/FileUpload";

// export const AppRoutes = () => {
//   return (
//     <>
//       <Suspense fallback={<LoadingBar />}>
//         <Header />
//         <div style={{ marginTop: "75px" }}>
//           {/* <FileUpload/> */}
//           <Routes>
//             {/* Public Routes */}
//             <Route element={<PublicRoutes />}>
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/otp" element={<Otp />} />
//               <Route path="/forgot-password" element={<ForgotPassword />} />
//             </Route>

//             {/* Private Routes */}
//             <Route element={<PrivateRoutes />}>
//               <Route path="/" element={<Products />} />
//               <Route path="/products" element={<Products />} />
//               <Route
//                 path="/products/:prevComp/:productId"
//                 element={<ProductDetail />}
//               />
//               <Route path="/favorite-product" element={<FavoriteProduct />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/order" element={<Order />} />
//               <Route path="/buy-product" element={<BuyProduct />} />
//               <Route path="/buy-product/:productId" element={<BuyProduct />} />
//               <Route path="/profile" element={<Profile />} />
//             </Route>
//           </Routes>
//         </div>
//       </Suspense>
//     </>
//   );
// };

import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import NProgress from "nprogress";
// import { Header } from "../components/header/Header";
// import { Products } from "../pages/products/Products";
// import { Cart } from "../pages/cart/Cart";
// import { Register } from "../pages/Authentication/register/Register";
// import { PublicRoutes } from "./PublicRoutes";
// import { PrivateRoutes } from "./PrivateRoutes";
// import { Login } from "../pages/Authentication/login/Login";
// import { Profile } from "../pages/profile/Profile";
// import { Otp } from "../pages/Authentication/otp/Otp";
// import { ForgotPassword } from "../pages/Authentication/forgotPassword/ForgotPassword";
// import { ProductDetail } from "../pages/products/ProductDetail";
// import { BuyProduct } from "../pages/buyProduct/BuyProduct";
// import { Order } from "../pages/order/Order";
// import { FavoriteProduct } from "../pages/favoriteProduct/FavoriteProduct";
// // import FileUpload from "../pages/FileUpload";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { LoadingBar } from "../components/loading/loadingBar/LoadingBar";
import { lazys } from "../util/lazys";

import { RouteLoading } from "../components/loading/routeLoading/RouteLoading";

const Header = lazys(() =>
  import("../components/header/Header").then((module) => ({
    default: module.Header,
  }))
);
const Products = lazys(() =>
  import("../pages/products/Products").then((module) => ({
    default: module.Products,
  }))
);
const Cart = lazys(() =>
  import("../pages/cart/Cart").then((module) => ({ default: module.Cart }))
);
const Register = lazys(() =>
  import("../pages/Authentication/register/Register").then((module) => ({
    default: module.Register,
  }))
);
const Login = lazys(() =>
  import("../pages/Authentication/login/Login").then((module) => ({
    default: module.Login,
  }))
);
const Profile = lazys(() =>
  import("../pages/profile/Profile").then((module) => ({
    default: module.Profile,
  }))
);
const Otp = lazys(() =>
  import("../pages/Authentication/otp/Otp").then((module) => ({
    default: module.Otp,
  }))
);
const ForgotPassword = lazys(() =>
  import("../pages/Authentication/forgotPassword/ForgotPassword").then(
    (module) => ({ default: module.ForgotPassword })
  )
);
const ProductDetail = lazys(() =>
  import("../pages/products/ProductDetail").then((module) => ({
    default: module.ProductDetail,
  }))
);
const BuyProduct = lazys(() =>
  import("../pages/buyProduct/BuyProduct").then((module) => ({
    default: module.BuyProduct,
  }))
);
const Order = lazys(() =>
  import("../pages/order/Order").then((module) => ({ default: module.Order }))
);
const FavoriteProduct = lazys(() =>
  import("../pages/favoriteProduct/FavoriteProduct").then((module) => ({
    default: module.FavoriteProduct,
  }))
);
// import FileUpload from "../pages/FileUpload";

export const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<LoadingBar />}>
        <Header />
        <div style={{ marginTop: "75px" }}>
          {/* <FileUpload/> */}
          <RouteLoading />
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} loader={<RouteLoading />} />
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
      </Suspense>
    </>
  );
};
