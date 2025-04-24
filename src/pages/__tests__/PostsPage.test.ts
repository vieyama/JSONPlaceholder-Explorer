import { describe, it, expect, vi, beforeEach } from 'vitest';
import { waitFor, within } from '@testing-library/dom';
import PostsPage from '../PostsPage';
import * as apiService from '../../api/apiService'

describe('PostsPage', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    vi.resetAllMocks();
  });

  it('should render loading state initially', () => {
    vi.spyOn(apiService, 'fetchPosts').mockResolvedValue({
      data: null,
      error: new Error('Network Error'),
    });

    const page = PostsPage(container);
    page.init();

    const spinner = container.querySelector('.loading-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should fetch and display posts', async () => {
    const mockPosts = [
      {
        id: 1, title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto', userId: 1
      },
      {
        id: 2, title: 'qui est esse', body: `est rerum tempore vitae
sequi sint nihil reprehenderit dolor beatae ea dolores neque
fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
qui aperiam non debitis possimus qui neque nisi nulla`, userId: 1
      }
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPosts)
    });

    const page = PostsPage(container);
    await page.init();

    const posts = await waitFor(() => {
      const elements = container.querySelectorAll('.table-row');
      expect(elements.length).toBe(2);
      return elements;
    });

    const firstPost = within(posts[0] as HTMLElement);
    const secondPost = within(posts[1] as HTMLElement);

    expect(await firstPost.findByText((content) =>
      content.includes("sunt aut facere")
    )).toBeInTheDocument();
    expect(await secondPost.findByText((content) =>
      content.includes("qui est esse")
    )).toBeInTheDocument();

  });

  it('should handle API errors', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('API Error'));

    const page = PostsPage(container);
    await page.init();

    await waitFor(() => {
      expect(container.textContent).toContain('Failed to load posts');
    });
  });

  it('should filter posts based on search term', async () => {
    const mockPosts = [
      {
        id: 1, title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto', userId: 1
      },
      {
        id: 2, title: 'qui est esse', body: `est rerum tempore vitae
sequi sint nihil reprehenderit dolor beatae ea dolores neque
fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
qui aperiam non debitis possimus qui neque nisi nulla`, userId: 1
      }
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPosts)
    });

    const page = PostsPage(container);
    await page.init();

    page.setSearchTerm('qui est esse');

    await waitFor(() => {
      const postItems = container.querySelectorAll('.table-container');
      expect(postItems).toHaveLength(1);
      expect(container.textContent).toContain('qui est esse');
      expect(container.textContent).not.toContain('Banana Post');
    });
  });
});
