import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="py-4 border-b-[1px] border-primaryText">
      <div className="wrapper">
        <Link to="/">
          <span className="sr-only">Return to homepage for</span>
          <h1 className="no-underline">🤖 BotBuddy</h1>
        </Link>
      </div>
    </header>
  )
}

export default Header
