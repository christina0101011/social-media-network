import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from './Models';
import { Observable } from 'rxjs';

const url = 'http://localhost:3000';

@Injectable()
export class BlogsService {

  blogEvent: EventEmitter<Blog> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  getBlogs(): Observable<any> {
      return this.http.get('/api/blogs');
    }

  postBlog(blog: Blog) {
    return this.http.post<Blog>(url + '/api/blog', blog).subscribe(blog => this.blogEvent.emit(blog));
  }

  deleteBlog(_id) {
    return this.http.delete(url + '/api/blog/' + _id);
  }

  updateBlog(_id, blog) {
    return this.http.put(url + '/api/blog/' + _id,
      {
        description: blog.description || '',
        url: blog.url || '',
        gallery: blog.contentUrlArr || [],
        theme: blog.theme
      });
   }

}
