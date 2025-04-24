import { describe, it, expect } from 'vitest';
import { searchPosts, paginatePosts, hasWordInBody } from '../searchAndFilter';
import type { Post } from '../../types';

describe('searchAndFilter utils', () => {
  const mockPosts: Post[] = [
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
      "id": 4,
      "title": "eum et est occaecati",
      "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
    }
  ];

  describe('searchPosts', () => {
    it('should return all posts when search term is empty', () => {
      const result = searchPosts(mockPosts, '');
      expect(result).toHaveLength(3);
    });

    it('should filter posts by title match', () => {
      const result = searchPosts(mockPosts, 'qui est esse');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('qui est esse');
    });

    it('should filter posts by body match', () => {
      const result = searchPosts(mockPosts, 'est rerum tempore');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('qui est esse');
    });

    it('should be case insensitive', () => {
      const result = searchPosts(mockPosts, 'qui est');
      expect(result).toHaveLength(1);
    });
  });

  describe('paginatePosts', () => {
    it('should return correct page of posts', () => {
      const result = paginatePosts(mockPosts, 1, 2);
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it('should handle last page with fewer items', () => {
      const result = paginatePosts(mockPosts, 2, 2);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(4);
    });

    it('should return empty array for invalid page', () => {
      const result = paginatePosts(mockPosts, 3, 2);
      expect(result).toHaveLength(0);
    });
  });

  describe('hasWordInBody', () => {
    it('should return true when word is in body', () => {
      expect(hasWordInBody(mockPosts[1], 'rerum tempore')).toBe(true);
    });

    it('should return false when word is not in body', () => {
      expect(hasWordInBody(mockPosts[0], 'nonexistent')).toBe(false);
    });

    it('should be case insensitive', () => {
      expect(hasWordInBody(mockPosts[0], 'rerum')).toBe(true);
    });
  });
});
