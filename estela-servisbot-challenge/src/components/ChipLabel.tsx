import { StatusType } from "../interfaces"

interface Props {
  text: string
  type?: StatusType
}

const ChipLabel = ({ text, type }: Props) => {
  let colourClass

  // determine bg colour class based on bot status
  switch (type) {
    case "ENABLED":
      colourClass = "bg-success"
      break
    case "PAUSED":
      colourClass = "bg-warning"
      break
    case "DISABLED":
      colourClass = "bg-error"
      break
    default:
      colourClass = ""
  }

  return (
    <p className={`rounded-[30px] py-1 px-2 capitalize text-xs ${colourClass}`}>
      {text}
    </p>
  )
}

export default ChipLabel
