import { useState } from "react"

interface Tab {
  label: string
  content: JSX.Element
}

interface Props {
  tabs: Tab[]
}

// I considered using a library for the tabs component, just for ease
// but wanted to show a very simple no-library implementation of an accessible component

const Tabs = ({ tabs }: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  // mouse and keyboard events so component can be used with a keyboard
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
      <div className="flex justify-center relative tabs">
        <ul
          role="tablist"
          aria-label="Tabs Navigation"
          className="flex gap-2 w-fit bg-primaryTransparency rounded-lg mb-4 p-2 "
        >
          {tabs.map((tab, i) => (
            <li key={i}>
              <button
                role="tab"
                id={`tab-${i}`}
                aria-selected={activeTabIndex === i}
                aria-controls={`panel-${i}`}
                onClick={() => handleClick(i)}
                onKeyDown={(event) => handleKeyDown(event, i)}
                className={`rounded-lg p-2 hover:bg-primaryTransparency focus:bg-primaryTransparency ${
                  activeTabIndex === i
                    ? "bg-mainBg shadow-md hover:bg-mainBg"
                    : ""
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
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
          className="border-primary border-[1px] rounded-lg p-4"
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}

export default Tabs
