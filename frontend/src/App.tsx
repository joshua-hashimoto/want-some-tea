import { RouterProvider } from "react-router-dom";

import dayjs from "dayjs";

import "dayjs/locale/ja";
import { router } from "./routers";

dayjs.locale("ja");

type Props = Record<string, unknown>;

const App: React.FC<Props> = () => <RouterProvider router={router} />;

export default App;
