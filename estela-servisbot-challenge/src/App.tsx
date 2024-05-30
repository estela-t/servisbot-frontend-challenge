import { QueryClient, QueryClientProvider } from "react-query"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout/Layout"
import BotsPage from "./pages/BotsPage"
import BotPage from "./pages/BotPage"

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  // Routes
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <BotsPage />,
        },

        {
          path: "bots/:botId",
          element: <BotPage />,
        },
      ],
    },
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
