export class User {
  public id: String;
  public first_name: String;
  public last_name: String;
  public email: String;
  public password: String;
  public avatar: URL;
  public created_at: { type: Date };
  public updated_at: { type: Date };
  public deleted_at: { type: Date };
  public blogs: Array<Object>;

  // constructor (dataService: DataService) {
  //   this.blogs = dataService.getBlogs();
  // }
}
