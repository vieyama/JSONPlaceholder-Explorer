import { ReportsPageState } from "../types";
import { countPostsWithWord } from "../utils/searchAndFilter";

export function createRerumReport(state: ReportsPageState): HTMLElement {
  const count = countPostsWithWord(state.posts, 'rerum');
  const total = state.posts.length;
  const percentage = ((count / total) * 100).toFixed(1);
  const examples = state.posts.filter(p => p.body.toLowerCase().includes('rerum')).slice(0, 3);

  const card = document.createElement('div');
  card.className = 'h-full card';
  card.innerHTML = `
      <h2 class="mb-4 font-semibold">Posts with "rerum" in Body</h2>
      <div class="flex flex-col items-center mb-6">
        <div class="text-5xl font-bold text-primary mb-2">${count}</div>
        <div class="text-gray-600">${percentage}% of all posts</div>
        <div class="w-full mt-4">
          <div class="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-primary transition-all duration-1000 ease-out" style="width: ${percentage}%"></div>
          </div>
          <div class="flex justify-between text-sm text-gray-600 mt-2">
            <span>0%</span><span>100%</span>
          </div>
        </div>
      </div>
      <div class="mt-6 border-t pt-4">
        <h3 class="text-sm font-medium text-gray-700 mb-2">Example posts containing "rerum":</h3>
        <ul class="list-disc pl-5 text-sm text-gray-600">
          ${examples.map(post => `
            <li class="mb-2">
              <a href="#" class="text-primary hover:underline" data-post-id="${post.id}">Post #${post.id}: ${post.title.slice(0, 40)}...</a>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

  card.querySelectorAll('a[data-post-id]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.dispatchEvent(new CustomEvent('navigate', {
        detail: { page: 'posts', searchTerm: 'rerum' }
      }));
    });
  });

  return card;
}