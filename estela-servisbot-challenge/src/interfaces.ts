type StatusType = "ENABLED" | "DISABLED" | "PAUSED"

export interface IBot {
  id: string
  name: string
  description: string
  status: StatusType
  created: number
}

export interface IWorker {
  id: string
  name: string
  description: string
  bot: string
  created: number
}

export interface ILog {
  id: string
  created: string
  message: string
  bot: string
  worker: string
}
