const fetchData = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  return response.json()
}

// keeping our endpoints organized in one place!
// as project grows can easily add more API functions here
// if project grows a lot, would likely want a separate file for each model, ie. botsClient, workersClient
// each of these files would hold all endpoints for that model, getBots, upsertBot, deleteBot etc

export const fetchBots = () => fetchData(`/data/bots.json`)

export const fetchBotById = async (botId: string) => {
  const bots = await fetchData(`/data/bots.json`)
  return bots.find((bot: { id: string }) => bot.id === botId)
}

export const fetchWorkersByBotName = async (botName: string) => {
  const workers = await fetchData(`/data/workers.json`)
  return workers.filter((worker: { bot: string }) => worker.bot === botName)
}

export const fetchLogs = async (
  botId: string,
  page: number,
  pageSize: number,
  workerId?: string
) => {
  const logs = await fetchData(`/data/logs.json`)
  let filteredLogs = logs.filter((log: { bot: string }) => log.bot === botId)

  // if we've filtered by a worker, get just those logs
  if (workerId) {
    filteredLogs = filteredLogs.filter(
      (log: { worker: string }) => log.worker === workerId
    )
  }

  const totalLogs = filteredLogs.length
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  return { totalLogs, paginatedLogs }
}
