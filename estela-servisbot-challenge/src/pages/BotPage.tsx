import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Tabs from "../components/Tabs"
import { fetchBotById, fetchWorkersByBotName } from "../api/apiClient"
import Table from "../components/Table"
import { IWorker } from "../interfaces"
import CircleLoader from "../components/loading/CircleLoader"
import { formatDateFromUnixTimestamp } from "../utility/util"
import ChipLabel from "../components/ChipLabel"
import { useQuery } from "react-query"

const BotPage = () => {
  const { botId } = useParams()
  const [botName, setBotName] = useState("")

  // getting single bot data
  const { data: bot, isFetching: isFetchingBot } = useQuery({
    queryKey: ["bot"],
    queryFn: async () => await fetchBotById(botId as string),
    enabled: !!botId,
  })

  // getting workers data
  const { data: workers, isFetching: isFetchingWorkers } = useQuery({
    queryKey: ["workers"],
    queryFn: async () => await fetchWorkersByBotName(botName),
    enabled: botName !== "",
  })

  useEffect(() => {
    if (bot) {
      setBotName(bot.name)
    }
  }, [bot])

  const workerColumns = ["Name", "Description", "Bot", "Created"]
  const logColumns = ["Message", "Bot", "Worker", "Created"]

  const tabs = [
    {
      label: "Workers",
      content: <Table columns={workerColumns} rows={workers} />,
    },
    {
      label: "Logs",
      content: <Table columns={logColumns} rows={workers} />,
    },
  ]

  return (
    <div className="wrapper p-10">
      {isFetchingBot ? (
        <CircleLoader text="Fetching bot..." />
      ) : (
        <>
          <h1>{bot.name}</h1>
          <section>
            <p className="pt-4 pb-2 text-lg">{bot.description} description</p>
            <div className="flex gap-6 items-center text-sm">
              <div className="flex gap-2">
                <p>Created:</p>
                <p>{formatDateFromUnixTimestamp(bot.created)}</p>
              </div>
              <ChipLabel text={bot.status.toLowerCase()} type={bot.status} />
            </div>
          </section>
        </>
      )}
      {workers && (
        <div>
          <Tabs tabs={tabs} />
        </div>
      )}
    </div>
  )
}

export default BotPage
