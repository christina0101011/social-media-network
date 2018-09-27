import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogsService } from '../blogs.service';
import { Blog } from '../Models';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  @Input('blog') blog: Blog;
  @Output() reloadOnDeleteBlog = new EventEmitter();

  headerClass: string = 'header-text';
  showMenu: boolean = false;
  switchView: string = 'modal-images-grid';
  showPopUp: boolean = false;
  userDetails: any;
  fullName: any;
  serverUrl = this._blogsService.makeImgLink();
  newComment: string;
  comment: Array<string> = [];
  openComments: boolean = false;
  showComments: boolean = false;
 
  constructor(
    private modalService: NgbModal, 
    private _blogsService: BlogsService,
    private auth: AuthenticationService
    ) {}

  usersFullName() {
    let first_name = this.blog.user.first_name[0].toUpperCase() + this.blog.user.first_name.slice(1);
    let last_name = this.blog.user.last_name[0].toUpperCase() + this.blog.user.last_name.slice(1);
    return first_name + ' ' + last_name
  };

  submitCommentOnEnterKey(event){
    if (event.keyCode === 13) {
     console.log(this.newComment);
     this.newComment = '';
      this.openComments=!this.openComments
    };
  };

  submitComment() {
    // console.log(this.newComment);
    if (this.newComment){
      this.comment.push(this.newComment);
      this._blogsService.postComment(this.comment, this.blog._id);
      this.newComment = '';
      this.comment = [];
      this.openComments=!this.openComments;
    }
  }

  openLg(id) {
    this.modalService.open(id, { size: 'lg' });
  }

  closePopUp() {
    this.showPopUp = !this.showPopUp;
  }

  deleteBLog(_id) {
    this._blogsService.deleteBlog(_id)
      .subscribe(res => {
        console.log(res);
        this.reloadOnDeleteBlog.emit(_id);
      }, error => console.log(error));
  }

  largeView(event: any) {
    this.switchView = 'modal-images-large';
  }

  gridView(event: any) {
    this.switchView = 'modal-images-grid';
  }

//you tube player
  player: YT.Player;
  ytEvent: any;
  id: string;
  youTube: number;

  savePlayer(player) {
    this.player = player;
  }

  onStateChange(event) {
    this.ytEvent = event.data;
  }////////


  ngOnInit() {
    if (typeof this.blog.photos !== null || []) {
      if (Array.isArray(this.blog.photos)) {
        this.headerClass = (this.blog.photos.length === 1) ? 'header-image' : 'header-text';
      }
    }

    //you tube player
    if (this.blog.url) {
      this.youTube = this.blog.url.search('youtube');
    }
    if (this.blog.url && this.youTube === 12) {
      this.id = this.blog.url.slice(-11);
    }////////

    this.auth.profile().subscribe(user => {
      this.fullName = this.usersFullName();
      if (user._id === this.blog.user._id){
        this.userDetails = user;
        // console.log(5111, this.userDetails)
      }
    })

    this.fullName = this.usersFullName();

    console.log(5777, this.blog)
  };
}
