// import{ AuthenticationService } from '../authentication.service';

export class User {
  first_name: String;
  last_name: String;
  email: String;
  password: String;
  avatar: URL;
  exp: number;
  iat: number;
  created_at: { type: Date };
  updated_at: { type: Date };
  deleted_at: { type: Date };
  blogs: Array<Object>;
  // constructor (_AuthenticationService: AuthenticationService) {
  //   this.blogs = _AuthenticationService.getBlogs();
  // }
}

export class TokenPayload {
  email: String;
  password: String;
  first_name: String;
  last_name: String;
}

export class Photos {
  url: URL;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export class Likes {
  blog: Blog;
  users: Array<User>;
  created_at: Date;
  updated_at: Date;
}

export class Comments {
  blog: Blog;
  content: String;
  user: User;
  created_at: Date;
  updated_at: Date;
}

export class Description {
  blog: Blog;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export class BlogType {
  class: String;
  title: String;
}

export class Theme {
  title: String;
  style: String;
  prefix: String;
  created_at: Date ;
  updated_at: Date;
  deleted_at: Date;
}

export class Blog {
  user: User;
  photos: Array<Photos>;
  likes: Array<Likes>;
  description: Description;
  url: String;
  comments: Array<Comments>;
  theme: Theme;
  type: BlogType;
}