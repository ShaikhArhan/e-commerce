import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignInAlt, FaHeart } from "react-icons/fa";
import "./Header.css";
import DraggablePanel from "../DraggablePanel";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHook";
import { decodeToken } from "../../redux/thunk/decodeToken";
import { FaBagShopping } from "react-icons/fa6";

export const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [authorized, setAuthorized] = useState<boolean>();
  const token: string | null = localStorage.getItem("user-auth");

  useEffect(() => {
    setAuthorized(user?.status);
  }, [user]);

  useEffect(() => {
    if (
      (token && !user?.data) ||
      user?.data === null ||
      user?.data === undefined
    ) {
      dispatch(decodeToken(token));
    }
  }, [authorized]);

  return (
    <header className="header">
      <DraggablePanel />
      <div className="header-left">
        {authorized ? (
          <Link to="/products" className="nav-link">
            Shop
          </Link>
        ) : null}
      </div>
      <div className="header-right">
        {authorized ? (
          <Link to="/order" className="icon-button">
            <FaBagShopping />
          </Link>
        ) : null}
        {authorized ? (
          <Link to="/favorite-product" className="icon-button">
            <FaHeart />
          </Link>
        ) : null}
        {authorized ? (
          <Link to="/cart" className="icon-button">
            <FaShoppingCart />
          </Link>
        ) : null}

        {authorized ? (
          <Link to="/profile" className="icon-button">
            <FaUser />
          </Link>
        ) : null}

        {authorized ? null : (
          <Link to="/login" className="nav-link login-link">
            <FaSignInAlt className="login-icon" />
            Login
          </Link>
        )}
      </div>
    </header>
  );
};
