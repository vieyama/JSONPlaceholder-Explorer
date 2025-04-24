import { Post } from '../types';

export const searchPosts = (posts: Post[], searchTerm: string): Post[] => {
  if (!searchTerm.trim()) {
    return posts;
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

  return posts.filter(post => {
    return (
      post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      post.body.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });
};

export const paginatePosts = (
  posts: Post[],
  currentPage: number,
  postsPerPage: number
): Post[] => {
  const startIndex = (currentPage - 1) * postsPerPage;
  return posts.slice(startIndex, startIndex + postsPerPage);
};

export const hasWordInBody = (post: Post, word: string): boolean => {
  const regex = new RegExp(`\\b${word}\\b`, 'i');
  return regex.test(post.body);
};

export const countPostsWithWord = (posts: Post[], word: string): number => {
  return posts.filter(post => hasWordInBody(post, word)).length;
};

export const countPostsByUser = (posts: Post[]): Record<number, number> => {
  return posts.reduce((acc, post) => {
    acc[post.userId] = (acc[post.userId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
};