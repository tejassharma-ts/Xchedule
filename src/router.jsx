import { createBrowserRouter } from "react-router-dom";

import { ROUTE_MAP } from "./data/routes";

const router = createBrowserRouter([
  {
    path: ROUTE_MAP.HOME,
    // lazy: async () => {
    //   const GlobalLayout = await import("./components/layout/global-layout");
    //   return { Component: GlobalLayout.default };
    // },

    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./pages/dashboard")).default,
        }),
      },

      {
        path: ROUTE_MAP.PROJECT.DETAIL,
        lazy: async () => ({
          Component: (await import("./pages/project-detail")).default,
        }),
      },

      // Auth pages
      {
        path: ROUTE_MAP.AUTH.BASE,
        lazy: async () => ({
          Component: (await import("./pages/auth")).default,
        }),
        children: [
          {
            index: true,
            path: ROUTE_MAP.AUTH.LOGIN,
            lazy: async () => ({
              Component: (await import("./pages/auth/login")).default,
            }),
          },
          {
            path: ROUTE_MAP.AUTH.REGISTER,
            lazy: async () => ({
              Component: (await import("./pages/auth/register")).default,
            }),
          },
        ],
      },
    ],
  },
]);

export default router;
