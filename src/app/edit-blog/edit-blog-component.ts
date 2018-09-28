import { Component, Output, Input, EventEmitter } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { Router } from '@angular/router';
import { Photos, Theme, Blog } from '../Models';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog-component.html',
  styleUrls: ['./edit-blog-component.scss']
})

export class EditBlog {

@Output() close = new EventEmitter();
@Output() reloadOnUpdateBlog = new EventEmitter();
@Input('blog') blog: Blog;
themes: Array<Theme> = [];
photosPreview: Array<Photos> = [];
files = [];
photos: Photos = new Photos;

constructor(
  private _blogsService: BlogsService, 
  private router: Router
) { }

serverUrl = this._blogsService.makeImgLink();

  //getting array of themes
  getTheme(){
    this._blogsService.getTheme().subscribe(res => {
      this.themes.push(...res);
    })
  }

  // imagesInput;
  imagesInput(event: any) {
    this.contentProccessing(event.target);
    this.files = event.target.files;
    // console.log(this.files);
  }

  // operates input files
  contentProccessing (eventData) {
    if (eventData.files) {
      for (var i = 0; i < eventData.files.length; i++) {
        let reader = new FileReader();

        reader.onload = (e: any) => {
          this.photosPreview.push(e.target.result);
        }
        reader.readAsDataURL(eventData.files[i]);
      }
    }
  }

  // deleting photos from  preview
  deletePhoto(item) {
    let index = this.photosPreview.indexOf(item);
    this.photosPreview.splice(index, 1);
  }

  updateBlog(_id, callback){
    // console.log('updated values', this.blog);
    // console.log('files:', this.files);
    if (this.files) {
      const formData = new FormData();
      for (const key in this.files) {
        if (this.files[key] && this.files[key].type === 'image/jpeg') {
          formData.append('file', this.files[key], this.files[key].name);
        }
      }
      this._blogsService.uploadFiles(formData).subscribe(img => {
        this.blog.photos.push(...img);
        // console.log('with uploaded files', this.blog.photos);
        return this._blogsService.updateBlog(_id, this.blog);
      });
    } else {
      console.log('no new files', this.blog);
      this._blogsService.updateBlog(_id, this.blog);
    };

    this._blogsService.updateBlogEvent.subscribe(() => {
    this.reloadOnUpdateBlog.emit(_id);
    // let id = _id['_id'];
    // this.router.navigate(['/blogs', id]);
    console.log(_id, 'blog updated');
    error => console.log(11, error)
  });
  callback();
}

  uploadPermition(){
    if (this.blog.theme
      && (this.blog.description.length >= 10 || this.blog.description === '')
      && (this.blog.url.match('^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$') || this.blog.url === ''))
    {
      return true;
    }
  }

  //you tube player
  player: YT.Player; 
  ytEvent: any;
  id: string;
  youTube: number ;
  savePlayer(player) {
    this.player = player;
  }
  onStateChange(event) {
    this.ytEvent = event.data;
  }////////

  ngOnInit() {
    //you tube player
    if (this.blog.url) {
      this.youTube = this.blog.url.search('youtube');
    }
    if (this.blog.url && this.youTube === 12) {
      this.id = this.blog.url.slice(-11);
    }////////

    this.getTheme();

    this.photosPreview.push(...this.blog.photos);

    // console.log(88, this.photosPreview,
    //             55, this.blog.photos);
  };
}