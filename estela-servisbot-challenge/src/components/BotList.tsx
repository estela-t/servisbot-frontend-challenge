import { Link } from "react-router-dom"
import { IBot } from "../interfaces"

interface Props {
  bots: IBot[]
}
const BotList = ({ bots }: Props) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {bots &&
        bots.map((bot) => (
          <li
            className="border-primaryText border-2 rounded-lg flex-1 min-w-[200px]"
            key={bot.id}
          >
            <Link className="p-4 block button-link" to={`bots/${bot.id}`}>
              {bot.name}
            </Link>
          </li>
        ))}
    </ul>
  )
}

export default BotList
