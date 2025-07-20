import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (data) => {
    onPageChange(data.selected + 1); 
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <ReactPaginate
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        breakLabel={null}
        nextLabel={<FiChevronRight size={25} />}
        previousLabel={<FiChevronLeft size={25} />}
        containerClassName="flex items-center gap-6"
        previousLinkClassName="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition cursor-pointer"
        nextLinkClassName="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition cursor-pointer"
        disabledLinkClassName="opacity-50 cursor-not-allowed"
        activeLinkClassName=""
      />
    </div>
  );
}

export default Pagination;
