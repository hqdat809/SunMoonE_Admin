import React, { Suspense, useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { getStorageToken } from "../utils/storage-utils";
import * as RoutePaths from "./paths";
import CollectionPage from "../pages/product/collection/CollectionPage";
const Auth = React.lazy(() => import("../pages/auth/Auth"));
const Dashboard = React.lazy(() => import("../pages/shop/dashboard/Dashboard"));
const EditPage = React.lazy(() => import("../pages/shop/edit/EditPage"));
const Orders = React.lazy(() => import("../pages/selling/orders/Orders"));
const InvoicePage = React.lazy(
  () => import("../pages/selling/invoices/InvoicePage")
);
const Info = React.lazy(() => import("../pages/shop/info/Info"));
const Layouts = React.lazy(() => import("../pages/layouts/Layouts"));
const Customers = React.lazy(() => import("../pages/customer/Customers"));
const User = React.lazy(() => import("../pages/user/UserPage"));
const Products = React.lazy(() => import("../pages/product/Products"));
const CreateProductPage = React.lazy(
  () => import("../pages/product/create/CreateProductPage")
);
const NotFound = React.lazy(() => import("../pages/not-found/NotFound"));

const Routes = () => {
  const [accessToken, setAccessToken] = useState(getStorageToken());

  const signInRouter = createBrowserRouter([
    {
      path: "*",
      element: <Navigate to={RoutePaths.AUTH} />,
    },
    {
      element: <Auth setAccessToken={setAccessToken} />,
      path: RoutePaths.AUTH,
    },
    {
      element: <Dashboard />,
      path: RoutePaths.DASHBOARD,
    },
  ]);

  const authenticatedRouter = createBrowserRouter([
    {
      element: <Layouts setAccessToken={setAccessToken} />,
      path: "",
      children: [
        { path: "", element: <Navigate to={RoutePaths.DASHBOARD} /> },
        { path: RoutePaths.DASHBOARD, element: <Dashboard /> },
        { path: RoutePaths.EDIT_SHOP, element: <EditPage /> },
        { path: RoutePaths.INFO, element: <Info /> },

        { path: RoutePaths.ORDERS, element: <Orders /> },
        { path: RoutePaths.INVOICES, element: <InvoicePage /> },

        { path: RoutePaths.CUSTOMERS, element: <Customers /> },
        { path: RoutePaths.USER, element: <User /> },

        {
          path: RoutePaths.PRODUCTS,
          children: [
            { path: "", element: <Products /> },
            {
              path: RoutePaths.PRODUCTS_CREATE,
              element: <CreateProductPage />,
            },
          ],
        },
        { path: RoutePaths.COLLECTIONS, element: <CollectionPage /> },
      ],
    },
    {
      element: <NotFound />,
      path: "*",
    },
  ]);

  return (
    <React.StrictMode>
      <Suspense>
        <RouterProvider
          router={accessToken ? authenticatedRouter : signInRouter}
        />
      </Suspense>
    </React.StrictMode>
  );
};

export default Routes;
