import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout/Layout"
import BotsPage from "./pages/BotsPage"
import BotPage from "./pages/BotPage"

const App = () => {
  // clicking on a bot will take you to that bots page, with info about the bot at the top
  // page will also have two tabs, Workers and Logs, Workers is default tab
  // Workers and Logs tabs will have tables of each, respectively

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
      <RouterProvider router={router} />
    </>
  )
}

export default App
