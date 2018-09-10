import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.html',
  styleUrls: ['./blogs-list.scss']
  })

  export class BlogsListComponent implements OnInit {
    
    constructor(private _blogsService: BlogsService, private router: Router) { }
    blogs:Array<any> = [];
  
    reloadOnDelete(_id){
      this.loadBlogs();
    }
  
    reloadOnUpdate(_id, blog) {
      this.loadBlogs();
    }

      loadBlogs(){
        this._blogsService.getBlogs().subscribe(blogs => {
          this.blogs = blogs.map(blog => {
              return blog;
          });
          // console.log(2, this.blogs);
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
        
        this._blogsService.blogEvent.subscribe(() => {
          return this.loadBlogs();
        });

        this._blogsService.updateBlogEvent.subscribe(() => {
          return this.loadBlogs();
        });
      }
    }
  }