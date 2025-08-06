import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

export const PublicRoutes = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
