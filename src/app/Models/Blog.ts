import { Photos } from './Photos';
import { User } from './User';
import { Likes } from './Likes';
import { Description } from './Description';
import { Comments } from './Comments';
import { Theme } from './Theme';
import { BlogType } from './BlogType';

export class Blog {
  public id: String;
  public user: User;
  public photos: Array<Photos>;
  public likes: Array<Likes>;
  public description: Description;
  public url: String;
  public comments: Array<Comments>;
  public theme: Theme;
  public type: BlogType;
}
