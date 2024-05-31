import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

interface Props {
  currentPage: number
  totalPages: number
  onPageChangeCallback: (page: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChangeCallback,
}: Props) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChangeCallback(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChangeCallback(currentPage + 1)
    }
  }

  return (
    <div className="max-w-[200px] flex justify-between mt-4 ml-auto">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`flex items-center ${currentPage === 1 ? "opacity-40" : ""}`}
      >
        <span className="sr-only">Previous</span>
        <span>
          <FaArrowLeft />
        </span>
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`flex items-center ${
          currentPage === totalPages ? "opacity-40" : ""
        }`}
      >
        <span className="sr-only">Next</span>
        <span>
          <FaArrowRight />
        </span>
      </button>
    </div>
  )
}

export default Pagination
