import { describe, it, expect, vi, beforeEach } from 'vitest';
import { waitFor, within } from '@testing-library/dom';
import ReportsPage from '../ReportsPage';
import * as apiService from '../../api/apiService'

describe('ReportsPage', () => {
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

    vi.spyOn(apiService, 'fetchUsers').mockResolvedValue([
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
          "street": "Victor Plains",
          "suite": "Suite 879",
          "city": "Wisokyburgh",
          "zipcode": "90566-7771",
          "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
          }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
          "name": "Deckow-Crist",
          "catchPhrase": "Proactive didactic contingency",
          "bs": "synergize scalable supply-chains"
        }
      }
    ]);

    const page = ReportsPage(container);
    page.init();

    const spinner = container.querySelector('.loading-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should fetch and display reports', async () => {
    vi.spyOn(apiService, 'fetchPosts').mockResolvedValue({
      data: [
        {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
          "userId": 1,
          "id": 2,
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
          "userId": 1,
          "id": 3,
          "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        }
      ],
      error: null,
    });

    vi.spyOn(apiService, 'fetchUsers').mockResolvedValue([
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
          "street": "Victor Plains",
          "suite": "Suite 879",
          "city": "Wisokyburgh",
          "zipcode": "90566-7771",
          "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
          }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
          "name": "Deckow-Crist",
          "catchPhrase": "Proactive didactic contingency",
          "bs": "synergize scalable supply-chains"
        }
      }
    ]);

    const page = ReportsPage(container);
    await page.init();

    const posts = await waitFor(() => {
      const elements = container.querySelectorAll('.text-5xl');
      expect(elements.length).toBe(1);
      return elements;
    });

    const rerumPosts = await waitFor(() => {
      const elements = container.querySelectorAll('.list-disc');
      expect(elements.length).toBe(1);
      return elements;
    });

    const totalPercentage = within(posts[0] as HTMLElement);
    const rerumPost = within(rerumPosts[0] as HTMLElement);

    expect(await totalPercentage.findByText((content) =>
      content.includes("2")
    )).toBeInTheDocument();
    expect(await rerumPost.findByText((content) =>
      content.includes("qui est esse")
    )).toBeInTheDocument();

  });

  it('should fetch and display users data', async () => {

    vi.spyOn(apiService, 'fetchPosts').mockResolvedValue({
      data: [
        {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
          "userId": 1,
          "id": 2,
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
          "userId": 1,
          "id": 3,
          "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        }
      ],
      error: null,
    });

    vi.spyOn(apiService, 'fetchUsers').mockResolvedValue([
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
          "street": "Victor Plains",
          "suite": "Suite 879",
          "city": "Wisokyburgh",
          "zipcode": "90566-7771",
          "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
          }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
          "name": "Deckow-Crist",
          "catchPhrase": "Proactive didactic contingency",
          "bs": "synergize scalable supply-chains"
        }
      }
    ]);

    const page = ReportsPage(container);
    await page.init();

    const users = await waitFor(() => {
      const elements = container.querySelectorAll('.table-row');
      expect(elements.length).toBe(1);
      return elements;
    });

    const average = await waitFor(() => {
      const elements = container.querySelectorAll('.average');
      expect(elements.length).toBe(1);
      return elements;
    });

    const userName = within(users[0] as HTMLElement);
    const totalAverage = within(average[0] as HTMLElement);

    expect(await userName.findByText((content) =>
      content.includes("Bret")
    )).toBeInTheDocument();
    expect(await totalAverage.findByText((content) =>
      content.includes("3.0")
    )).toBeInTheDocument();
  })

  it('should handle API errors', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('API Error'));

    const page = ReportsPage(container);
    await page.init();

    await waitFor(() => {
      expect(container.textContent).toContain('Failed to load report data. Please try again later.');
    });
  });
});
