import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";

import dayjs from "dayjs";

import "dayjs/locale/ja";
import UnexpectedErrorPage from "./pages/UnexpectedErrorPage";
import { router } from "./routers";

dayjs.locale("ja");

type Props = Record<string, unknown>;

const App: React.FC<Props> = () => (
  <ErrorBoundary fallback={<UnexpectedErrorPage />}>
    <RouterProvider router={router} />
  </ErrorBoundary>
);
export default App;
