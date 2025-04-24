import { PostsPageState } from '../types';
import { fetchPosts } from '../api/apiService';
import { searchPosts } from '../utils/searchAndFilter';
import createSearchBar from '../components/SearchBar';
import createPagination from '../components/Pagination';
import { createLoadingSpinner } from '../components/Loading';
import { renderTable } from '../components/PostTable';

export default function PostsPage(container: HTMLElement) {
  const state: PostsPageState = {
    posts: [],
    filteredPosts: [],
    currentPage: 1,
    postsPerPage: 10,
    searchTerm: '',
    expandedComments: new Map(),
    loadingComments: new Set(),
  };

  const setSearchTerm = (term: string) => {
    state.searchTerm = term;
  };

  const init = async () => {
    renderLoading();
    try {
      const { data, error } = await fetchPosts();
      if (error || !data) {
        throw error ?? new Error('Unknown error');
      }

      state.posts = data;
      state.filteredPosts = [...data];
      renderPage();
    } catch (error) {
      console.error('Error loading posts:', error);
      renderError('Failed to load posts. Please try again later.');
    }
  };

  const renderLoading = () => {
    container.innerHTML = '';
    container.appendChild(createLoadingSpinner());
  };

  const renderError = (message: string) => {
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'py-12 text-center';

    wrapper.innerHTML = `
      <div class="text-error text-5xl mb-4">!</div>
      <p class="text-gray-700 mb-4">${message}</p>
      <button class="btn btn-primary">Retry</button>
    `;

    wrapper.querySelector('button')?.addEventListener('click', init);
    container.appendChild(wrapper);
  };

  const handleSearch = (term: string) => {
    state.searchTerm = term;
    state.filteredPosts = searchPosts(state.posts, term);
    state.currentPage = 1;
    renderPage();
  };

  const handlePageChange = (page: number) => {
    state.currentPage = page;
    renderPage();
    container.querySelector('.table-container')?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderPage = () => {
    container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'animate-fade-in';

    const header = document.createElement('div');
    header.className = 'mb-6';
    header.innerHTML = `
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Posts</h1>
      <p class="text-gray-600 text-sm">Browse and search posts from JSONPlaceholder API. Posts containing "rerum" in the body are highlighted.</p>
    `;

    const searchBar = createSearchBar({
      onSearch: handleSearch,
      placeholder: 'Search posts by title or content...',
      initialValue: state.searchTerm
    });

    const infoText = state.searchTerm
      ? `Found ${state.filteredPosts.length} result${state.filteredPosts.length === 1 ? '' : 's'} for "${state.searchTerm}"`
      : `Showing all ${state.posts.length} posts`;

    const info = document.createElement('div');
    info.className = 'mb-4 text-sm text-gray-600';
    info.textContent = infoText;

    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
    tableContainer.appendChild(renderTable(state, renderPage));

    const totalPages = Math.ceil(state.filteredPosts.length / state.postsPerPage);
    const pagination = createPagination({
      currentPage: state.currentPage,
      totalPages,
      onPageChange: handlePageChange
    });

    wrapper.appendChild(header);
    wrapper.appendChild(searchBar);
    wrapper.appendChild(info);
    wrapper.appendChild(tableContainer);
    wrapper.appendChild(pagination);

    container.appendChild(wrapper);
  };

  return { init, setSearchTerm };
}
