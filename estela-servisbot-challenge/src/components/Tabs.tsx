import { useState } from "react"

interface Tab {
  label: string
  content: JSX.Element
}

interface Props {
  tabs: Tab[]
}

const Tabs = ({ tabs }: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setActiveTabIndex(index)
    }
  }

  const handleClick = (index: number) => {
    setActiveTabIndex(index)
  }

  return (
    <div className="mt-10">
      <ul role="tablist" aria-label="Tabs Navigation" className="flex gap-2">
        {tabs.map((tab, i) => (
          <li key={i}>
            <button
              role="tab"
              id={`tab-${i}`}
              aria-selected={activeTabIndex === i}
              aria-controls={`panel-${i}`}
              tabIndex={activeTabIndex === i ? 0 : -1}
              onClick={() => handleClick(i)}
              onKeyDown={(event) => handleKeyDown(event, i)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      {tabs.map((tab, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`panel-${i}`}
          aria-labelledby={`tab-${i}`}
          hidden={activeTabIndex !== i}
          tabIndex={-1}
          ref={(el) => {
            if (el && activeTabIndex === i) {
              el.focus()
            }
          }}
          className="border-primaryText border-[1px] rounded-b-lg p-4"
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}

export default Tabs
