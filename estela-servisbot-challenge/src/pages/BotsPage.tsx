import { useQuery } from "react-query"
import BotList from "../components/BotList"
import CircleLoader from "../components/loading/CircleLoader"
import { IBot } from "../interfaces"
import { fetchBots } from "../api/apiClient"

const BotsPage = () => {
  const { data: bots, isFetching } = useQuery({
    queryKey: ["bots"],
    queryFn: async () => await fetchBots(),
  })

  return (
    <div className="wrapper py-6">
      <h2>Our Bots</h2>
      {isFetching ? <CircleLoader /> : <BotList bots={bots as IBot[]} />}
    </div>
  )
}

export default BotsPage
