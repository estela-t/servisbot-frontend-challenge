import { IBot } from "../interfaces"

interface Props {
  bots: IBot[]
}
const BotList = ({ bots }: Props) => {
  return <ul>{bots && bots.map((bot) => <li key={bot.id}>{bot.name}</li>)}</ul>
}

export default BotList
