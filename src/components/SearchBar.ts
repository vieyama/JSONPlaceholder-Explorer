export interface SearchOptions {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export default function createSearchBar(options: SearchOptions): HTMLElement {
  const { onSearch, placeholder = 'Search...', initialValue = '' } = options;

  const searchContainer = document.createElement('div');
  searchContainer.className = 'mb-6';

  searchContainer.innerHTML = `
  <div class="bg-white rounded-lg shadow-md p-4 mb-6">
    <form class="flex flex-col md:flex-row gap-3" id="search-form">
      <div class="relative flex-grow">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="text-gray-400 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input
            type="text"
            class="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="${placeholder}" 
            value="${initialValue}" 
            id="search-input"
          />

          <button id="clear" type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg class="text-gray-400 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
      </div>
      
      <button type="submit" class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center gap-1">
        <svg class="text-white size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        Search
      </button>
    </form>
  </div>
  `;

  const searchForm = searchContainer.querySelector('#search-form') as HTMLFormElement;
  const searchInput = searchContainer.querySelector('#search-input') as HTMLInputElement;
  const clearButton = searchContainer.querySelector('#clear') as HTMLButtonElement;

  clearButton.style.display = searchInput.value ? 'block' : 'none';

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    onSearch(searchInput.value);
  });

  searchInput.addEventListener('input', () => {
    if (searchInput.value) {
      clearButton.style.display = 'block';
    } else {
      clearButton.style.display = 'none';
    }
  });

  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    clearButton.style.display = 'none';
    onSearch('')
  });

  return searchContainer;
}
