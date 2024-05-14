import { Navigate, Outlet, OutletProps } from "react-router-dom";

import { Routes } from "~/routers";

type Props = OutletProps;

const ProtectedRoute: React.FC<Props> = ({ ...props }) => {
  // TODO: ログインしてないユーザーはエラー画面に遷移する
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Navigate to={Routes.error.unauthorized} />;
  }

  return <Outlet {...props} />;
};

export default ProtectedRoute;
