import { ILog } from "../interfaces"

interface Props {
  logs: ILog[]
}

const Logs = ({ logs }: Props) => {
  return (
    <>
      <ul className=" bg-mainBg overflow-scroll max-h-[500px] p-2">
        {logs &&
          logs.map((log) => (
            <li className="mb-1 flex gap-2" key={log.id}>
              <span>{log.created}</span>
              <span className="max-w-[800px] break-words ">{log.message}</span>
            </li>
          ))}
      </ul>
    </>
  )
}

export default Logs
