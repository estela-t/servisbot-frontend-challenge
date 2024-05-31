import { useEffect, useState } from "react"
import { ILog, IWorker } from "../interfaces"

interface Props {
  logs: ILog[]
  workers: IWorker[]
  onWorkerFilterChange: (workerId: string) => void
}

const Logs = ({ logs, workers, onWorkerFilterChange }: Props) => {
  const [selectedWorker, setSelectedWorker] = useState<string>("")

  const handleWorkerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorker(event.target.value)
  }

  // trigger our callback alerting the parent that a worker has been selected
  // and we should get our logs just for that worker
  useEffect(() => {
    onWorkerFilterChange(selectedWorker)
  }, [selectedWorker])

  return (
    <>
      {/* worker filter */}
      <div className="mb-4 flex justify-end items-baseline  text-sm">
        <label htmlFor="worker-select" className="mr-2">
          Filter by Worker
        </label>
        <select
          id="worker-select"
          value={selectedWorker}
          onChange={handleWorkerChange}
          className="p-2 border rounded-lg"
        >
          <option value="">All Workers</option>
          {workers.map((worker) => (
            <option key={worker.id} value={worker.id}>
              {worker.name}
            </option>
          ))}
        </select>
      </div>

      {/* log list */}
      <ul className=" bg-mainBg overflow-scroll max-h-[500px] p-2">
        {logs.length > 0 &&
          logs.map((log) => (
            <li className="mb-1 flex gap-2" key={log.id}>
              <span>{log.created}</span>
              <span className="max-w-[800px] break-words ">{log.message}</span>
            </li>
          ))}
        {logs.length === 0 && <p>No logs for that worker</p>}
      </ul>
    </>
  )
}

export default Logs
