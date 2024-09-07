import { Outlet, OutletProps } from "react-router-dom";

type Props = OutletProps;

const ErrorRoute: React.FC<Props> = ({ ...props }) => <Outlet {...props} />;

export default ErrorRoute;
