import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'; 
import { BlogsService } from '../blogs.service';
import { Blog } from '../Models';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog-component.html',
  styleUrls: ['./new-blog-component.scss']
})

export class NewBlogComponent {

dropClass: string = 'no-active';
themes: Array<string> = ['Wish', 'Contribution', 'Vibe', 'Dream Box'];
description: string = '';
url: string = '';
theme: string;
contentUrlArr: Array<string> = [];

@Input('blog') blog: Blog;
@Input() uploadBtn; //style classes for upload component
@Output() reloadPage = new EventEmitter();

  constructor(private modalService: NgbModal, private _blogsService: BlogsService, private router: Router) {}

  uploadPermition(){
    if (this.theme && this.theme !== 'Choose your theme'
      && (this.description.length >= 10 || this.description === '')
      && (this.url.match('^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$') || this.url === ''))
    {
      return true;
    }
  }

  // modal window **Bootstrap
  openLg(createBlog) {
    this.modalService.open(createBlog, { size: 'lg'});
  }

  // deleting photos from  preview
  deletePhoto(url: string) { 
    let index = this.contentUrlArr.indexOf(url);
    this.contentUrlArr.splice(index, 1);

    if (this.contentUrlArr.length === 0) {
      this.dropClass = 'no-active';
    } else {
      this.dropClass = 'dropped';
    }
  }

  // operates input or dropped files
  contentProccessing (eventData) {
    if (eventData.files) {
      for (var i = 0; i < eventData.files.length; i++) {
        let reader = new FileReader();

        reader.onload = (e: any) => {
          this.contentUrlArr.push(e.target.result);
          this.dropClass = 'dropped';
        }

        reader.readAsDataURL(eventData.files[i]);
      }
    }
  }

  // imagesInput;
  imagesInput(event: any) {
    this.contentProccessing(event.target);
  }

  // drag event
  dragEnter(event: any) {
    event.preventDefault();
    this.dropClass = 'active';
  }

  // drop event
  drop(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.contentProccessing (event.dataTransfer)
  }

  // newPost odject
  uploadContent(callback) {
    let blog = new Blog(this.description, this.url, this.contentUrlArr, this.theme);

    // this.reloadPage.emit(new Blog(this.description || '', this.url || '', this.contentUrlArr || [], this.theme || ''));
    this._blogsService.postBlog(blog);
    // console.log(blog);
    this.description = '';
    this.url = '';
    this.contentUrlArr = [];
    this.theme = '';

    this.dropClass = 'no-active';

    this.router.navigate(['/blogs']);

    callback();
    // });
  }

  ngOnInit() {
    if(this.uploadBtn !== 'header'){
      this.uploadBtn = 'upload-component';
    } else {
      this.uploadBtn = 'blog-component';
    }
  };
  
}