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
  serverUrl = this._blogsService.makeImgLink();
  newComment: string;
  comment: Array<string> = [];
  openComments: boolean = false;
  showComments: boolean = false; // change show to hide
 
  constructor(
    private modalService: NgbModal, 
    private _blogsService: BlogsService,
    private auth: AuthenticationService
  ) {}

  usersFullName(first_name, last_name) {
    let first_n = first_name[0].toUpperCase() + first_name.slice(1);
    let last_n = last_name[0].toUpperCase() + last_name.slice(1);
    let fullName = first_n + ' ' + last_n;
    return fullName
  };

  // add comment to a blog post
  submitCommentOnEnterKey(event){
    if (event.keyCode === 13 && this.newComment) {
    this.comment.push(this.newComment);
    this._blogsService.postComment(this.comment, this.blog._id);
    this.newComment = '';
    this.comment = [];
    this.openComments=!this.openComments
    };
  };

  submitComment() {
    if (this.newComment){
      this.comment.push(this.newComment);
      this._blogsService.postComment(this.comment, this.blog._id);
      this.newComment = '';
      this.comment = [];
      this.openComments=!this.openComments;
    }
  };////////

  // add like to a blog post
  likeIt(_id) {
    this.blog.likes.map(like => {
      if (like !== this.userDetails._id) {
        this._blogsService.updateLike(_id);
      }
    })
  };

   // open modal window
  openLg(id) {
    this.modalService.open(id, { size: 'lg' });
  }

  // close modal window
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

  //full story switch views
  largeView(event: any) {
    this.switchView = 'modal-images-large';
  }

  gridView(event: any) {
    this.switchView = 'modal-images-grid';
  }/////

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
      if (user._id === this.blog.user._id){
        this.userDetails = user;
      }
    });

    // console.log(5777, this.blog)
  };
}
