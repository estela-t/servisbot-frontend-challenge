interface Props<T> {
  columns: string[]
  rows: T[]
}

const Table = <T,>({ columns, rows }: Props<T>) => {
  console.log("rows", rows)
  return (
    <table className="w-3/4">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="text-left">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className={`py-1 ${
                  column.toLowerCase() === "message"
                    ? "ellipsis min-w-[30%]"
                    : ""
                }`}
              >
                {row[column.toLowerCase() as keyof T] as React.ReactNode}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
