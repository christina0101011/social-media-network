import { Component, Output, Input, EventEmitter } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog-component.html',
  styleUrls: ['./edit-blog-component.scss']
})

export class EditBlog {

@Output() close = new EventEmitter();
@Input('blog') blog: any;
themes: Array<string> = ['Wish', 'Contribution', 'Vibe', 'Dream Box'];
contentUrlArr: Array<string> = [];

constructor(private _blogsService: BlogsService, private router: Router) { }

  // imagesInput;
  imagesInput(event: any) {
    this.contentProccessing(event.target);
  }

  // operates input files
  contentProccessing (eventData) {
    eventData.file.map((file, index) => {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.contentUrlArr.push(e.target.result);
      }

      reader.readAsDataURL(eventData.files[index]);
    });
  }

  // deleting photos from  preview
  deletePhoto(item: string) {
    // console.log(this.contentUrlArr);
   !this.contentUrlArr ? '' : this.contentUrlArr.splice(this.contentUrlArr.indexOf(item), 1); 
  //  console.log(99);
  }

  updateBlog(_id, blog, callback){
    this._blogsService.updateBlog(_id,
    {
      description: blog.description || '',
      url: blog.url || '',
      gallery: blog.contentUrlArr || [],
      theme: blog.theme
    })
    .subscribe(res => {
      let id = res['_id'];
      this.router.navigate(['/blogs', id]);
      console.log(res, 'blog updated')}, 
      error => console.log(11, error));
    callback();
  }

  uploadPermition(){
    if (this.blog.theme && this.blog.theme !== 'Choose your theme'
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
  }
}