import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

const Pagination = ({ onChangePage, currentPage }) => {

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={e => onChangePage(e.selected)}
      forcePage={currentPage}
      pageRangeDisplayed={4}
      pageCount={4}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;