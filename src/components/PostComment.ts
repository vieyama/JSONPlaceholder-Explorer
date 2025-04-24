import { fetchComments } from "../api/apiService";
import { PostsPageState } from "../types";
import { showToast } from "./Toast";

export const toggleComments = async (state: PostsPageState, postId: number, row: HTMLElement, renderPage: () => void) => {
  const mainContainer = document.getElementsByTagName('main')[0]

  if (state.expandedComments.has(postId)) {
    state.expandedComments.delete(postId);
    if (mainContainer) {
      mainContainer.classList.remove('overflow-hidden', 'h-[93vh]');
    }

    return renderPage();
  }

  if (state.loadingComments.has(postId)) return;

  state.loadingComments.add(postId);
  const button = row.querySelector('button');
  if (button) {
    button.textContent = 'Loading...';
    button.disabled = true;
  }

  try {
    if (mainContainer) {
      mainContainer.classList.add('overflow-hidden', 'h-[93vh]');
    }

    const comments = await fetchComments(postId);
    state.expandedComments.set(postId, comments);
  } catch (error) {
    console.error(`Error loading comments for post ${postId}:`, error);
    showToast({ message: 'Failed to load comments. Please try again.', type: 'error' });
  } finally {
    state.loadingComments.delete(postId);
    renderPage();
  }
};

export const createCommentRows = (state: PostsPageState, postId: number, row: HTMLElement, renderPage: () => void) => {
  const comments = state.expandedComments.get(postId);
  if (!comments?.length) return null;

  const modalContainer = document.createElement('div');
  modalContainer.className = 'fixed top-0 left-0 flex items-center justify-center w-full h-screen border-none comment-modal bg-black/50 animate-slide-in';

  const commentContainer = document.createElement('div');
  commentContainer.className = 'w-[70vw] h-[65vh] overflow-y-auto bg-white';

  const container = document.createElement('div');

  const modalHeader = document.createElement('div')
  modalHeader.className = 'sticky top-0 flex items-center justify-between w-full px-4 py-3 bg-white'

  const closeModal = () => {
    toggleComments(state, postId, row, renderPage)
  };

  const title = document.createElement('h3');
  const btnClose = document.createElement('button');
  title.className = 'text-lg font-medium';
  title.textContent = `Comments (${comments.length})`;
  btnClose.innerHTML = `<svg class="text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

  modalHeader.appendChild(title)
  modalHeader.appendChild(btnClose)

  btnClose.addEventListener('click', () => closeModal())

  container.appendChild(modalHeader);

  const content = document.createElement('div');
  content.className = 'p-4'

  comments.forEach(({ name, email, body }) => {
    const comment = document.createElement('div');
    comment.className = 'p-3 mb-4 bg-white rounded shadow-sm';

    comment.innerHTML = `
        <div class="flex justify-between mb-2">
          <span class="font-medium">${name}</span>
          <span class="text-sm text-gray-600">${email}</span>
        </div>
        <p class="text-sm text-gray-700">${body}</p>
      `;

    content.appendChild(comment);
  });

  container.appendChild(content)

  commentContainer.appendChild(container);
  modalContainer.appendChild(commentContainer);
  return modalContainer;
};