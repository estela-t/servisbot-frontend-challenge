interface Props {
  text?: string
}
const CircleLoader = ({ text }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="circle-loader"></div>
      {text && <p>{text}</p>}
    </div>
  )
}

export default CircleLoader
