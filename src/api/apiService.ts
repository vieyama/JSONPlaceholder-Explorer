import { Post, Comment, User } from '../types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

type FetchPostsResult = {
  data: Post[] | null;
  error: Error | null;
};

export const fetchPosts = async (): Promise<FetchPostsResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data: Post[] = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Unknown error') };
  }
};

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};