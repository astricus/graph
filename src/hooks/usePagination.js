import { useState } from 'react';

export function usePagination(array = [], numPerPage = 10) {
  const [page, setPage] = useState(1);
  const total = Math.ceil(array.length / numPerPage) || 1;

  const pageUp = () => {
    if (page < total) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  const pageDown = () => {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  const firstIdx = (page - 1) * numPerPage;
  const lastIdx = Math.min(page * numPerPage, array.length);

  const slice = array.slice(firstIdx, lastIdx);

  return { page, total, setPage, pageUp, pageDown, slice };
}
