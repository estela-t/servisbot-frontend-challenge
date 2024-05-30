import useFetch from "../hooks/useFetch"

// keeping our endpoints organized in one place!
// as project grows can easily add more API functions here
// if project grows a lot, would likely want a separate file for each model, ie. botsClient, workersClient
// each of these files would hold all endpoints for that model, getBots, upsertBot, deleteBot etc

const baseURL = "data" // base URL for mock data

export const useBots = () => {
  const url = `${baseURL}/bots.json`
  return useFetch(url)
}

export const useWorkersByBotId = (botId: string) => {
  const url = `${baseURL}/workers.json?botId=${botId}`
  return useFetch(url)
}

export const useLogsByBotId = (botId: string) => {
  const url = `${baseURL}/logs.json?botId=${botId}`
  return useFetch(url)
}

export const useLogsByWorkerId = (workerId: string) => {
  const url = `${baseURL}/logs.json?workerId=${workerId}`
  return useFetch(url)
}
