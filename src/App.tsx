import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Wrapper from "@/components/Base/Wrapper";

import Index from "@/pages/Index";
import Detail from "@/pages/Detail";
import NotFound from "@/pages/NotFound";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Wrapper />,
      children: [{ index: true, element: <Index /> }],
    },
    {
      path: "/detail",
      element: <Wrapper />,
      children: [{ path: ":id", element: <Detail /> }],
    },
    {
      path: "*",
      element: <Wrapper />,
      children: [{ index: true, element: <NotFound /> }],
    },
  ]);

  return (
    <>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  );
}

export default App;
