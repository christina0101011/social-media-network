import { Blog } from './Blog';
import { User } from './User';

export class Comments {
  public id: String;
  public blog: Blog;
  public content: String;
  public user: User;
  public created_at: Date;
  public updated_at: Date;
}
