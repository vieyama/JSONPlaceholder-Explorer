export default function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'fixed top-0 z-10 w-full text-white shadow-lg bg-gradient-to-r from-indigo-900 to-blue-800';

  header.innerHTML = `
  <nav class="bg-gradient-to-r from-blue-900 to-primary-800 text-white shadow-lg">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <a href="#" id="logo" class="flex items-center space-x-1">
            
            <svg class="text-teal-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-database-zap-icon lucide-database-zap"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 15 21.84"/><path d="M21 5V8"/><path d="M21 12L18 17H22L19 22"/><path d="M3 12A9 3 0 0 0 14.59 14.87"/></svg>

            <span class="text-xl font-bold">JSONPlaceholder Explorer</span>
          </a>
          
          <div class="flex space-x-1 md:space-x-4">
            <a href="#" id="nav-posts" class="nav-link">
            
            <svg class="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-database-icon lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>

            Posts
            </a>
            <a href="#" id="nav-reports" class="nav-link">
            
              <svg class="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-no-axes-column-increasing-icon lucide-chart-no-axes-column-increasing"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>

              Reports
            
            </a>
          </div>
        </div>
      </div>
    </nav>
  `;

  header.querySelector('#logo')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'posts' } }));
  });

  header.querySelector('#nav-posts')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'posts' } }));
  });

  header.querySelector('#nav-reports')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'reports' } }));
  });

  return header;
}

export function updateActiveNavLink(activePage: string): void {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => link.classList.remove('nav-link-active'));

  const activeLink = document.getElementById(`nav-${activePage}`);
  if (activeLink) {
    activeLink.classList.add('nav-link-active');
  }
}
