import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog, NewBlog, Comments} from './Models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { AuthenticationService } from './authentication.service';

const url = 'http://localhost:3000';

interface TokenResponse {
  token: string;
}

@Injectable()
export class BlogsService {

  blogEvent: EventEmitter<Blog> = new EventEmitter();
  updateBlogEvent: EventEmitter<Blog> = new EventEmitter();
  private token: string;
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  getBlogs(): Observable<any> {
      return this.http.get('/api/blogs', { headers: { Authorization: `Bearer ${this.getToken()}` }}).pipe(
        map((data: TokenResponse) => {
          if (data.token) {
            this.auth.saveToken(data.token);
          }
          return data;
        })
      );
    }

  postBlog(blog: NewBlog) {
    return this.http.post<NewBlog>(url + '/api/blog', blog, { headers: { Authorization: `Bearer ${this.getToken()}` }}).pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.auth.saveToken(data.token);
        }
        return data;
      })
    )
    .subscribe( () => { this.blogEvent.emit() } );
  }

  uploadFiles(formData): Observable <any> {
    return this.http.post('/api/files', formData, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    }).pipe(map(data => data));
  }

  makeImgLink() {
    const windLoc = window.location;
    return windLoc.protocol + '//' + windLoc.hostname + ':' + windLoc.port + '/api/file/';
  }

  deleteBlog(_id) {
    return this.http.delete(url + '/api/blog/' + _id, { headers: { Authorization: `Bearer ${this.getToken()}` }}).pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.auth.saveToken(data.token);
        }
        return data;
      })
    );
  }

  updateBlog(_id, blog) {
    return this.http.put(url + '/api/blog/' + _id, blog, { headers: { Authorization: `Bearer ${this.getToken()}` }}).pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.auth.saveToken(data.token);
        }
        return data;
      })
    )
    .subscribe( () => { this.updateBlogEvent.emit(blog) });
   }

  getTheme() {
  return this.http.get('/api/blog/theme');
  }

  postComment(comment, _id) {
    return this.http.post(url + '/api/comment/' + _id, comment, 
    { headers: { Authorization: `Bearer ${this.getToken()}` }}).pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.auth.saveToken(data.token);
        }
        return data;
      })
    )
    .subscribe( () => { this.blogEvent.emit() } );
  }

  updateLike(_id) {
    return this.http.get(url + '/api/likes/' + _id, 
    { headers: { Authorization: `Bearer ${this.getToken()}` }}).pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.auth.saveToken(data.token);
        }
        return data;
      })
    )
    .subscribe( () => { this.blogEvent.emit() } );
  }
}
