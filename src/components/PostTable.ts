import { PostsPageState } from "../types";
import { highlightText } from "../utils/formatters";
import { hasWordInBody, paginatePosts } from "../utils/searchAndFilter";
import { createCommentRows, toggleComments } from "./PostComment";

export const renderTable = (state: PostsPageState, renderPage: () => void) => {
  const table = document.createElement('table');
  table.className = 'table';

  const thead = document.createElement('thead');
  thead.innerHTML = `
      <tr>
        <th class="table-header-cell">ID</th>
        <th class="table-header-cell">Title</th>
        <th class="table-header-cell">Content</th>
        <th class="table-header-cell">User ID</th>
        <th class="table-header-cell text-right">Actions</th>
      </tr>
    `;

  const tbody = document.createElement('tbody');
  tbody.className = 'divide-y divide-gray-200';

  const posts = paginatePosts(state.filteredPosts, state.currentPage, state.postsPerPage);

  if (posts.length > 0) {
    posts.forEach(post => {
      const row = document.createElement('tr');
      row.className = 'table-row';

      if (hasWordInBody(post, 'rerum')) {
        row.classList.add('bg-primary-50', 'border-l-4', 'border-primary');
      }

      const bodyHTML = state.searchTerm && post.body.toLowerCase().includes(state.searchTerm.toLowerCase())
        ? highlightText(post.body, state.searchTerm)
        : hasWordInBody(post, 'rerum')
          ? highlightText(post.body, 'rerum')
          : (post.body);

      row.innerHTML = `
          <td class="table-cell">${post.id}</td>
          <td class="table-cell whitespace-nowrap truncate max-w-[200px] font-medium">${post.title}</td>
          <td class="table-cell"><div class="max-w-xl line-clamp-2">${bodyHTML}</div></td>
          <td class="table-cell">${post.userId}</td>
          <td class="table-cell text-right"><button class="btn w-36 btn-outline text-sm">${state.expandedComments.has(post.id) ? 'Hide Comments' : 'View Comments'}</button></td>
        `;

      row.querySelector('button')?.addEventListener('click', () => toggleComments(state, post.id, row, renderPage));

      tbody.appendChild(row);

      const commentRow = createCommentRows(state, post.id, row, renderPage);
      if (commentRow) tbody.appendChild(commentRow);
    });
  } else {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="5" class="text-center text-sm text-gray-500 py-2">No data found.</td>`
    tbody.appendChild(row);
  }

  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
};