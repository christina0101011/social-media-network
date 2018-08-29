import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { Router } from '@angular/router';

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
          blogs.forEach(blog => this.blogs.push(blog));
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
        this._blogsService.blogEvent.subscribe(blog => {
          return this.loadBlogs();
        });
      }
    }
  }