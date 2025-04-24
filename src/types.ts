export interface PostsPageState {
  posts: Post[];
  filteredPosts: Post[];
  currentPage: number;
  postsPerPage: number;
  searchTerm: string;
  expandedComments: Map<number, Comment[]>;
  loadingComments: Set<number>;
}

export interface ReportsPageState {
  posts: Post[];
  users: User[];
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}