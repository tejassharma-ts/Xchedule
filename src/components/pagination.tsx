import ReactPaginate from "react-paginate";

import { Icons } from "./icons";

type PaginationProps = {
  currentPage: number;
  onPageChange: (e: any) => void;
  pageCount: number;
};

export default function Pagination({ currentPage, onPageChange, pageCount }: PaginationProps) {
  return (
    <ReactPaginate
      forcePage={currentPage}
      className="flex space-x-4 items-center text-sm w-full justify-center mt-10 my-4"
      breakLabel="..."
      nextLabel={<Icons.right size={16} className="stroke-foreground" />}
      pageClassName="hover:bg-muted size-10 rounded-md flex items-center justify-center cursor-pointer size-8 shadow-md  relative relative"
      activeClassName="!bg-primary rounded-md size-8 flex items-center justify-center text-black font-medium shadow-sm"
      pageLinkClassName="absolute inset-0  flex justify-center items-center"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={3}
      pageCount={pageCount}
      previousLabel={<Icons.left size={16} className="stroke-foreground" />}
      renderOnZeroPageCount={null}
    />
  );
}
