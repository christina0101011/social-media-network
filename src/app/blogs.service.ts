import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog, NewBlog } from './Models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { AuthenticationService } from './authentication.service';

const url = 'http://localhost:3000';

@Injectable()
export class BlogsService {

  blogEvent: EventEmitter<Blog> = new EventEmitter();
  private token: string;
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) {
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  getBlogs(): Observable<any> {
      return this.http.get('/api/blogs');
    }

  postBlog(blog: NewBlog) {
    return this.http.post<NewBlog>(url + '/api/blog', blog).subscribe( () => this.blogEvent.emit());
  }

  uploadFiles(formData): Observable <any> {
    return this.http.post('/api/files', formData, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    }).pipe(map(data => data));
  }

  makeImgLink(img: String) {
    const windLoc = window.location;
    return windLoc.protocol + '//' + windLoc.hostname + ':' + windLoc.port + '/api/file/' + img;
  }

  deleteBlog(_id) {
    return this.http.delete(url + '/api/blog/' + _id);
  }

  updateBlog(_id, blog) {
    return this.http.put(url + '/api/blog/' + _id,
      {
        description: blog.description,
        url: blog.url,
        photos: blog.photos,
        theme: blog.theme
      });
   }

   getTheme() {
    return this.http.get('/api/blog/theme');
   }

}
