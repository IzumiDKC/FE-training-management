// src/routes/ErrorRoutes.jsx
import React from "react";
import { Route } from "react-router";
import Forbidden from "../pages/errors/Forbidden";
import NotFound from "../pages/errors/NotFound";
import ServerError from "../pages/errors/ServerError";
import Unauthorized from "../pages/errors/Unauthorized";

const ErrorRoutes = () => (
  <>
    <Route path="/401" element={<Unauthorized />} />
    <Route path="/unauthorized" element={<Unauthorized />} />

    <Route path="/403" element={<Forbidden />} />
    <Route path="/forbidden" element={<Forbidden />} />
    
    <Route path="/404" element={<NotFound />} />
    <Route path="/not-found" element={<NotFound />} />
    
    <Route path="/500" element={<ServerError />} />
    <Route path="/server-error" element={<ServerError />} />
  </>
);

export default ErrorRoutes;
