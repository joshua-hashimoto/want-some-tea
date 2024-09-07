import { Outlet, OutletProps } from "react-router-dom";

type Props = OutletProps;

const ProtectedRoute: React.FC<Props> = ({ ...props }) => <Outlet {...props} />;

export default ProtectedRoute;
