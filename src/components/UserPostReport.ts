import { ReportsPageState } from "../types";
import { countPostsByUser } from "../utils/searchAndFilter";

export function createUserPostsReport(state: ReportsPageState): HTMLElement {
  const postCounts = countPostsByUser(state.posts);
  const userIds = Object.keys(postCounts).map(Number).sort((a, b) => postCounts[b] - postCounts[a]);
  const maxCount = Math.max(...Object.values(postCounts));
  const avgPosts = (state.posts.length / userIds.length).toFixed(1);

  const card = document.createElement('div');
  card.className = 'h-full card';

  const table = document.createElement('table');
  table.className = 'table';
  table.innerHTML = `
      <thead class="table-header">
        <tr>
          <th class="table-header-cell">User ID</th>
          <th class="table-header-cell">Username</th>
          <th class="table-header-cell">Post Count</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        ${userIds.map(userId => {
    const user = state.users.find(u => u.id === userId);
    const username = user?.username ?? `User ${userId}`;
    const count = postCounts[userId];
    const width = (count / maxCount) * 100;

    return `
            <tr class="table-row">
              <td class="table-cell">${userId}</td>
              <td class="table-cell">${username}</td>
              <td class="table-cell">
                <div class="flex items-center">
                  <span class="mr-2 font-medium">${count}</span>
                  <div class="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-primary" style="width: ${width}%"></div>
                  </div>
                </div>
              </td>
            </tr>
          `;
  }).join('')}
      </tbody>
    `;

  const summary = document.createElement('div');
  summary.className = 'mt-4 text-sm text-gray-600 average';
  summary.textContent = `Average posts per user: ${avgPosts}`;

  const postPerUserHeader = document.createElement('h2')
  postPerUserHeader.className = 'mb-4 font-semibold text-gray-900'
  card.appendChild(postPerUserHeader).textContent = 'Posts per User';
  card.appendChild(table);
  card.appendChild(summary);

  return card;
}