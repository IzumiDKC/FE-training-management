// src/components/ErrorBoundary.jsx
import React from "react";
import { Navigate } from "react-router";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorCode: null };
  }

  static getDerivedStateFromError(error) {
    if (error.name === "HttpError") {
      return { hasError: true, errorCode: error.status };
    }
    return { hasError: true, errorCode: 500 };
  }

  render() {
    const { hasError, errorCode } = this.state;

    if (hasError) {
      if (errorCode === 401) return <Navigate to="/401" />;
      if (errorCode === 403) return <Navigate to="/403" />;
      if (errorCode === 404) return <Navigate to="/404" />;
      return <Navigate to="/500" />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
