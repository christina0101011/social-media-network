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
  @Input() userDetails: any;
  @Output() reloadOnDeleteBlog = new EventEmitter();

  headerClass: string = 'header-text';
  showMenu: boolean = false;
  switchView: string = 'modal-images-grid';
  showPopUp: boolean = false;
  serverUrl = this._blogsService.makeImgLink();
  openComments: boolean; // change show to hide comments input
  showComments: boolean = false; // change show to hide added comments
 
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

  // add like to a blog post
  likeIt(_id) {
    if (this.blog.likes.length) {
      let alreadyLiked;
      this.blog.likes.map(like => {
        if (like._id === this.userDetails._id) {
          alreadyLiked = true;
        }
      });
      if (!alreadyLiked) {
        this._blogsService.updateLike(_id);
      }
    } else {
      this._blogsService.updateLike(_id);
    }
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
  } ////////


  ngOnInit() {
    // console.log(this.blog);
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

  };
}
