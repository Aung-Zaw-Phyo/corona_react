import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError()
  return <div className="text-center py-16">Something wrong! reload the page</div>;
};

export default ErrorPage;
