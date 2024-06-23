import { Navigate, Outlet, OutletProps } from "react-router-dom";

import { useRecoilValue } from "recoil";

import { Routes } from "~/routers";
import { isLoggedInAtom } from "~/store/auth";

type Props = OutletProps;

const ProtectedRoute: React.FC<Props> = ({ ...props }) => {
  // TODO: ログインしてないユーザーはエラー画面に遷移する
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  if (!isLoggedIn) {
    return <Navigate to={Routes.error.unauthorized} />;
  }

  return <Outlet {...props} />;
};

export default ProtectedRoute;
