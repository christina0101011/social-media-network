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
        // console.log('initial blogs ', this.blogs);
        this._blogsService.getBlogs().subscribe(blogs => {
          blogs.forEach(blog => {
            const arr = [];
            blog.photos.map(img => {
              arr.push(this._blogsService.makeImgLink(img));
            });
            blog.photos = arr;

            // this._blogsService.blogEvent.subscribe((newBlog) => {
            //   console.log(1, newBlog)
            //   return newBlog
            // });

            // if (NewBlog) {
            //   this.blogs.push(NewBlog);
            // } else {
              this.blogs.push(blog);
            // }
          });

          if (this.blogs.length) {
            this.router.navigate(['/blogs']);
          } else {
            this.router.navigate(['/initial']);
          }
        })
      }

      reloadPageOnNewBlog (blog) {
        if (blog.photos) {
          const arr = [];
          blog.photos.map(img => {
            arr.push(this._blogsService.makeImgLink(img));
          });
          blog.photos = arr;
        }
        this.blogs.push(blog);
      }

    ngOnInit() {
      if (!this.blogs.length){
        this.loadBlogs();
        // console.log(this.blogs);
      };
      this._blogsService.blogEvent.subscribe((blog) => {
        // console.log(blog);
        return this.reloadPageOnNewBlog(blog);
        // return newBlog
      });
    }
  }