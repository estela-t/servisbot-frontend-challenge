import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { FaArrowLeft } from "react-icons/fa"

import Tabs from "../components/Tabs"
import {
  fetchBotById,
  fetchLogs,
  fetchWorkersByBotName,
} from "../api/apiClient"
import Table from "../components/Table"
import CircleLoader from "../components/loading/CircleLoader"
import {
  formatDateFromEpochTimestamp,
  formatDateFromISO,
} from "../utility/util"
import ChipLabel from "../components/ChipLabel"
import { ILog, IWorker } from "../interfaces"
import Logs from "../components/Logs"
import Pagination from "../components/Pagination"

const BotPage = () => {
  const { botId } = useParams()
  const [botName, setBotName] = useState("")

  // pagination state for logs call
  const [logPage, setLogPage] = useState(1)
  const logPageSize = 10

  const [selectedWorkerId, setSelectedWorkerId] = useState("")

  // getting single bot data
  const { data: bot, isFetching: isFetchingBot } = useQuery({
    queryKey: ["bot"],
    queryFn: async () => await fetchBotById(botId as string),
    enabled: !!botId, // will only run this query once we have a botId
  })

  // getting workers data
  const { data: workers } = useQuery({
    queryKey: ["workers", botName],
    queryFn: async () => await fetchWorkersByBotName(botName),
    enabled: botName !== "",
    select: (data) =>
      data.map((worker: IWorker) => ({
        ...worker,
        // transform date data into a nice format
        created: formatDateFromEpochTimestamp(worker.created),
      })),
  })

  // getting paginated bot logs data
  const { data: logsData } = useQuery({
    queryKey: ["botLogs", botId, logPage, selectedWorkerId],
    queryFn: async () =>
      await fetchLogs(botId as string, logPage, logPageSize, selectedWorkerId),
    enabled: botId !== null && botId !== undefined,
    keepPreviousData: true,
    select: (data) => ({
      // adding the total pages of our call to the react query data
      totalLogs: data.totalLogs,
      paginatedLogs: data.paginatedLogs.map((log: ILog) => ({
        ...log,
        // transform date data into a nice format
        created: formatDateFromISO(log.created),
      })),
    }),
  })

  const totalLogPages = logsData
    ? Math.ceil(logsData.totalLogs / logPageSize)
    : 1

  const handleLogPageChange = (newPage: number) => {
    // updating our pagination from prev/next buttons
    setLogPage(newPage)
  }

  const handleWorkerFilterChange = (workerId: string) => {
    // setting this state will trigger our call to get logs to run again
    // giving us fresh logs and correct paginaiton
    setSelectedWorkerId(workerId)
  }

  const workerColumns = ["Name", "Description", "Created"]

  const tabs = [
    {
      label: "Workers",
      content: <Table columns={workerColumns} rows={workers} />,
    },
    {
      label: "Logs",
      content: (
        <>
          <Logs
            logs={logsData ? logsData.paginatedLogs : []}
            workers={workers ? workers : []}
            onWorkerFilterChange={handleWorkerFilterChange}
          />
          <Pagination
            currentPage={logPage}
            totalPages={totalLogPages}
            onPageChangeCallback={handleLogPageChange}
          />
        </>
      ),
    },
  ]

  useEffect(() => {
    if (bot) {
      setBotName(bot.name)
    }
  }, [bot])

  return (
    <div className="wrapper py-10">
      {isFetchingBot ? (
        <CircleLoader text="Fetching bot..." />
      ) : (
        <>
          <Link className="primary-btn flex items-center gap-1 mb-8" to="/">
            {" "}
            <FaArrowLeft /> Back to Bots
          </Link>

          <h1>{bot.name}</h1>
          <section>
            <p className="pt-4 pb-2 text-lg">{bot.description} description</p>
            <div className="flex gap-6 items-center text-sm">
              <div className="flex gap-2">
                <p>Created:</p>
                <p>{formatDateFromEpochTimestamp(bot.created)}</p>
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
