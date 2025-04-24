import PostsPage from './pages/PostsPage';
import ReportsPage from './pages/ReportsPage';
import createHeader, { updateActiveNavLink } from './components/Header';
import { showToast } from './components/Toast';

interface RouterState {
  currentPage: PageKey;
  params: Record<string, string>;
}

interface Page {
  init: () => Promise<void>;
  setSearchTerm?: (term: string) => void;
}

type Pages = {
  posts: Page & { setSearchTerm: (term: string) => void };
  reports: Page;
}

type PageKey = keyof Pages;

export default function createRouter(container: HTMLElement) {
  const state: RouterState = {
    currentPage: 'posts',
    params: {}
  };

  const header = createHeader();
  container.parentElement?.insertBefore(header, container);

  const pages: Pages = {
    posts: PostsPage(container),
    reports: ReportsPage(container)
  };

  function navigate(page: PageKey, params: Record<string, string> = {}): void {
    if (!Object.keys(pages).includes(page)) {
      showToast({
        message: `Page "${page}" not found`,
        type: 'error'
      });
      return;
    }

    state.currentPage = page;
    state.params = params;

    window.location.hash = `#${page}`;

    renderCurrentPage();
  }

  function renderCurrentPage(): void {
    updateActiveNavLink(state.currentPage);

    if (state.currentPage === 'posts' && state.params.searchTerm) {
      pages.posts.setSearchTerm(state.params.searchTerm);
    }

    pages[state.currentPage].init();
  }

  function init(): void {
    const hash = window.location.hash.slice(1) as PageKey;
    if (hash && Object.keys(pages).includes(hash)) {
      state.currentPage = hash;
    }

    renderCurrentPage();

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1) as PageKey;
      if (hash && Object.keys(pages).includes(hash)) {
        navigate(hash);
      }
    });

    document.addEventListener('navigate', ((event: CustomEvent) => {
      const { page, ...params } = event.detail;
      navigate(page as PageKey, params);
    }) as EventListener);
  }

  return {
    init,
    navigate
  };
}