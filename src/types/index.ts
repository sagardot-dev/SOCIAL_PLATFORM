export interface PostType {
  id: string;
  content: string;
  image: string;
  createdAt: string;

  user: {
    id: string;
    name: string | null;
    image: string | null;
  };

  comments: {
    id: string;
    content: string;
    image: string;
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
    reactions: {
      id: string;
      user: {
        id: string;
        name: string | null;
        image: string | null;
      };
    }[];
  }[];

  reactions: {
    id: string;
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
  }[];
  isLiked?: boolean;
}

export interface CommentType {
  id: string;
  content: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    name: string | null;
    image: string | null;
  };

  reactions: {
    id: string;
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
  }[];
}

export interface UserWithPosts {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt: Date | string;

  post: {
    id: string;
    content: string;
    image: string | null;
    createdAt: Date | string;
    _count: {
      comments: number;
      reactions: number;
    };
  }[];

  _count: {
    post: number;
    comments: number;
    reactions: number;
  };
}
