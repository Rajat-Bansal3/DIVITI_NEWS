import { Route } from "react-router-dom";

import { Navigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProtectedRoute = ({ element, ...rest }: any) => {
  const user = localStorage.getItem("user");

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to='/signin' />
  );
};

export default ProtectedRoute;
