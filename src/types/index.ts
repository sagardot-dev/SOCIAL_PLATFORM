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

