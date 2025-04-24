export interface PaginationOptions {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function createPagination(options: PaginationOptions): HTMLElement {
  const { currentPage, totalPages, onPageChange } = options;

  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination';

  const prevButton = document.createElement('button');
  prevButton.className = `pagination-item ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`;
  prevButton.textContent = 'Previous';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  });
  paginationContainer.appendChild(prevButton);

  const createPageButton = (pageNum: number) => {
    const pageButton = document.createElement('button');
    pageButton.className = `pagination-item ${pageNum === currentPage ? 'pagination-item-active' : ''}`;
    pageButton.textContent = pageNum.toString();
    pageButton.addEventListener('click', () => onPageChange(pageNum));
    return pageButton;
  };

  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  startPage = Math.max(1, endPage - maxPagesToShow + 1);

  if (startPage > 1) {
    paginationContainer.appendChild(createPageButton(1));

    if (startPage > 2) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'pagination-item opacity-50 cursor-default';
      ellipsis.textContent = '...';
      paginationContainer.appendChild(ellipsis);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationContainer.appendChild(createPageButton(i));
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'pagination-item opacity-50 cursor-default';
      ellipsis.textContent = '...';
      paginationContainer.appendChild(ellipsis);
    }

    paginationContainer.appendChild(createPageButton(totalPages));
  }

  const nextButton = document.createElement('button');
  nextButton.className = `pagination-item ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`;
  nextButton.textContent = 'Next';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  });
  paginationContainer.appendChild(nextButton);

  return paginationContainer;
}