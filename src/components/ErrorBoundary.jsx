// // src/components/ErrorBoundary.jsx
// import React from "react";
// import { Navigate } from "react-router";

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, errorCode: null };
//   }

//   static getDerivedStateFromError(error) {
//     if (error.name === "HttpError") {
//       return { hasError: true, errorCode: error.status };
//     }
//     return { hasError: true, errorCode: 500 };
//   }

//   render() {
//     const { hasError, errorCode } = this.state;

//     if (hasError) {
//       if (errorCode === 401) return <Navigate to="/401" />;
//       if (errorCode === 403) return <Navigate to="/403" />;
//       if (errorCode === 404) return <Navigate to="/404" />;
//       return <Navigate to="/500" />;
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
// src/components/ErrorBoundary.jsx

import React from "react";
import { navigateTo } from "../utils/navigateService"; 

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error) {
    if (error.name === "HttpError") {
      if (error.status === 401) navigateTo("/unauthorized");
      else if (error.status === 403) navigateTo("/forbidden");
      else if (error.status === 404) navigateTo("/not-found");
      else navigateTo("/server-error");
    } else {
      navigateTo("/server-error");
    }
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default ErrorBoundary;
