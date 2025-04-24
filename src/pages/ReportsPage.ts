import { ReportsPageState } from '../types';
import { fetchPosts, fetchUsers } from '../api/apiService';
import { createLoadingSpinner } from '../components/Loading';
import { createRerumReport } from '../components/RerumReport';
import { createUserPostsReport } from '../components/UserPostReport';

export default function ReportsPage(container: HTMLElement) {
  const state: ReportsPageState = { posts: [], users: [] };

  async function init(): Promise<void> {
    renderLoading();

    try {
      const [postsResponse, users] = await Promise.all([fetchPosts(), fetchUsers()]);
      const { data, error } = postsResponse;

      if (error || !data) throw error ?? new Error('Unknown error');

      state.posts = data;
      state.users = users;

      renderPage();
    } catch (error) {
      console.error('Initialization error:', error);
      renderError('Failed to load report data. Please try again later.');
    }
  }

  function renderLoading(): void {
    container.innerHTML = '';
    container.appendChild(createLoadingSpinner());
  }

  function renderError(message: string): void {
    container.innerHTML = '';

    const errorHTML = `
      <div class="text-center py-12">
        <div class="text-error text-5xl mb-4">!</div>
        <p class="text-gray-700 mb-4">${message}</p>
        <button class="btn btn-primary" id="retry-btn">Retry</button>
      </div>
    `;

    container.innerHTML = errorHTML;
    container.querySelector('#retry-btn')?.addEventListener('click', init);
  }

  function renderPage(): void {
    container.innerHTML = '';

    const pageWrapper = document.createElement('div');
    pageWrapper.className = 'animate-fade-in';

    pageWrapper.appendChild(renderHeader());
    pageWrapper.appendChild(renderReports());

    container.appendChild(pageWrapper);
  }

  function renderHeader(): HTMLElement {
    const header = document.createElement('div');
    header.className = 'mb-6';
    header.innerHTML = `
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Reports</h1>
      <p class="text-gray-600">View analytics and reports based on the posts data</p>
    `;
    return header;
  }

  function renderReports(): HTMLElement {
    const reportsContainer = document.createElement('div');
    reportsContainer.className = 'grid grid-cols-1 gap-6 lg:grid-cols-2';
    reportsContainer.appendChild(createRerumReport(state));
    reportsContainer.appendChild(createUserPostsReport(state));
    return reportsContainer;
  }

  return { init };
}
