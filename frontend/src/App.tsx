import { RouterProvider } from "react-router-dom";

import { router } from "./routers";

type Props = Record<string, unknown>;

const App: React.FC<Props> = () => <RouterProvider router={router} />;

export default App;
