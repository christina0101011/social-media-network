import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { Router } from '@angular/router';
import { NewBlog } from '../Models';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.html',
  styleUrls: ['./blogs-list.scss']
  })

  export class BlogsListComponent implements OnInit {
  
    reloadOnDelete(_id){
      let index = this.blogs.indexOf(_id);
      this.blogs.splice(index, 1);
      this._blogsService.getBlogs().subscribe(blogs => {
        if (!this.blogs.length) {
          this.router.navigate(['/initial']);
        }
      })
    }
  
    reloadOnUpdate(_id, blog) {
      let index = this.blogs.indexOf(_id);
      this.blogs.splice(index, 1, blog);
    }
  
    constructor(private _blogsService: BlogsService, private router: Router) { }
      blogs:Array<any> = [];

      loadBlogs(){
        this._blogsService.getBlogs().subscribe(blogs => {
          this.blogs = blogs.map(blog => {
            blog.photos = blog.photos.map(img => this._blogsService.makeImgLink(img));
              return blog;
          });

          if (this.blogs.length) {
            this.router.navigate(['/blogs']);
          } else {
            this.router.navigate(['/initial']);
          }
        })
      }

    ngOnInit() {
      if (!this.blogs.length){
        this.loadBlogs();
        // console.log(2, this.blogs);
        this._blogsService.blogEvent.subscribe(() => {
          return this.loadBlogs();
        });
      }
    }
  }