// File: src/routes/ErrorRoutes.jsx
import React from "react";
import { Route } from "react-router";

import Forbidden from "../pages/errors/Forbidden";
import NotFound from "../pages/errors/NotFound";
import ServerError from "../pages/errors/ServerError";

const ErrorRoutes = () => ( 
  <>
    <Route path="/403" element={<Forbidden />} />
    <Route path="/404" element={<NotFound />} />
    <Route path="/500" element={<ServerError />} />
  </>
);

export default ErrorRoutes;
