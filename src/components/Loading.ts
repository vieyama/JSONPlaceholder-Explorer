export function createLoadingSpinner(): HTMLElement {
  const loadingContainer = document.createElement('div');
  loadingContainer.className = 'loading-spinner flex justify-center items-center py-20';

  const spinner = document.createElement('div');
  spinner.className = 'animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary';

  loadingContainer.appendChild(spinner);
  return loadingContainer;
}

export function showLoading(container: HTMLElement): void {
  container.innerHTML = '';
  container.appendChild(createLoadingSpinner());
}

export function hideLoading(container: HTMLElement): void {
  const spinner = container.querySelector('.animate-spin');
  if (spinner && spinner.parentElement) {
    container.removeChild(spinner.parentElement);
  }
}