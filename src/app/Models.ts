// import{ AuthenticationService } from '../authentication.service';

export class User {
  _id: String;
  first_name: String;
  last_name: String;
  email: String;
  avatar: URL;
  exp: number;
  iat: number;
  created_at: { type: Date };
  updated_at: { type: Date };
  deleted_at: { type: Date };
  deleted: { type: Boolean, default: false};
  blogs: Array<Object>;
}

export class Passwords {
  new_password: String;
  prev_password: String;
}

export class TokenPayload {
  email: String;
  password: String;
  first_name: String;
  last_name: String;
}

export class Photos {
  id: String;
  url: URL;
}

// export class Likes {
//   id: String;
//   blog: Blog;
//   users: Array<User>;
// }

export class Comments {
  id: String;
  blog: Blog;
  content: String;
  user: User;
  user_detail: Object;
  created_at: Date;
  updated_at: Date;
}

export class Description {
  id: String;
  blog: Blog;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export class BlogType {
  id: String;
  class: String;
  title: String;
}

export class Theme {
  title: String;
  themeDescription: String;
}

export class Blog {
  _id: String;
  user: User;
  photos: Array<Photos>;
  likes: any;
  description: String;
  url: String;
  comments: Array<Comments>;
  theme: Theme;
  type: BlogType;
  created_at: Date ;
  updated_at: Date;
  deleted_at: Date;
}

export class NewBlog {
  photos: Array<String>;
  description: String;
  url: String;
  theme: String;
  type: String;
}