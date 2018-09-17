import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'; 
import { BlogsService } from '../blogs.service';
import { NewBlog, Photos, Theme, Blog } from '../Models';
// import { shouldCallLifecycleInitHook } from '@angular/core/src/view';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog-component.html',
  styleUrls: ['./new-blog-component.scss']
})

export class NewBlogComponent {

dropClass: string = 'no-active';
themes: Array<Theme> = [];
description: string = '';
url: string = '';
theme: string;
photosPreview: Array<string> = [];
files = [];
photos: Photos = new Photos;


@Input('blog') blog: Blog;
@Input() uploadBtn; //style classes for upload component
// @Output() reloadPage = new EventEmitter();

  constructor(
    private modalService: NgbModal, 
    private _blogsService: BlogsService, 
    private router: Router
  ) {}

  //getting array of themes
  getTheme(){
    this._blogsService.getTheme().subscribe(res => {
      this.themes.push(...res);
    })
  }

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
    let index = this.photosPreview.indexOf(url);
    this.photosPreview.splice(index, 1);

    if (this.photosPreview.length === 0) {
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
          this.photosPreview.push(e.target.result);
          this.dropClass = 'dropped';
        }

        reader.readAsDataURL(eventData.files[i]);
      }
    }
  }

  // imagesInput;
  imagesInput(event: any) {
    this.contentProccessing(event.target);
    this.files = event.target.files;
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
    let blog = new NewBlog();
    blog.description = this.description;
    blog.url = this.url;
    blog.theme = this.theme;

    if (this.files.length > 0) {
      const formData = new FormData();
      for (const key in this.files) {
        if (this.files[key] && this.files[key].type === 'image/jpeg') {
          formData.append('file', this.files[key], this.files[key].name);
        }
      }
      // console.log(this.files);
      blog.photos = this.files;
      this._blogsService.uploadFiles(formData).subscribe(img => {
        blog.photos = img;
        return this._blogsService.postBlog(blog)
      });
    } else {
      this._blogsService.postBlog(blog);
      // console.log(999, blog)
    }

    //clearing inputs after uploading
    this.description = '';
    this.url = '';
    this.photosPreview = [];
    this.files = [];
    this.theme = '';

    //change drop aria style after uploading
    this.dropClass = 'no-active';

    this.router.navigate(['/blogs']);

    callback();
  }

  ngOnInit() {
    if(this.uploadBtn !== 'header'){
      this.uploadBtn = 'upload-component';
    } else {
      this.uploadBtn = 'blog-component';
    };
    this.getTheme();
  };
  
}