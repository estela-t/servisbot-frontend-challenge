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
  console.log("bot name", botName)
  return workers.filter((worker: { bot: string }) => worker.bot === botName)
}

export const fetchLogsByWorkerId = async (workerId: string) => {
  const logs = await fetchData(`/data/logs.json`)
  return logs.filter((log: { worker: string }) => log.worker === workerId)
}
