import { useBots } from "../api/apiClient"
import BotList from "../components/BotList"
import CircleLoader from "../components/loading/CircleLoader"
import { IBot } from "../interfaces"

const BotsPage = () => {
  const { data: bots, loading } = useBots()

  return (
    <div className="wrapper py-8">
      <h1>Bots</h1>
      {loading ? <CircleLoader /> : <BotList bots={bots as IBot[]} />}
    </div>
  )
}

export default BotsPage
