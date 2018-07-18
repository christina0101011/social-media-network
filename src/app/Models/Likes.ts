import { Blog } from './Blog';
import { User } from './User';

export class Likes {
  public id: String;
  public blog: Blog;
  public users: Array<User>;
  public created_at: Date;
  public updated_at: Date;
}
