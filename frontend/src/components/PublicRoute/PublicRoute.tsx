import { Outlet, OutletProps } from "react-router-dom";

type Props = OutletProps;

const PublicRoute: React.FC<Props> = ({ ...props }) => <Outlet {...props} />;

export default PublicRoute;
