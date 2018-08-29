import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogsService } from '../blogs.service';
import { Blog } from '../Models';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  @Input('blog') blog: Blog;
  @Output() reloadOnDeleteBlog = new EventEmitter();
  @Output() reloadOnUpdateBlog = new EventEmitter();

  headerClass: string = 'header-text';
  showMenu: boolean = false;
  switchView: string = 'modal-images-grid';
  showPopUp: boolean = false;

  constructor(private modalService: NgbModal, private _blogsService: BlogsService) {
  }

  closePopUp() {
    this.showPopUp = !this.showPopUp;
  }

  deleteBLog(_id) {
    this._blogsService.deleteBlog(_id)
      .subscribe(res => {
        console.log(res);
      }, error => console.log(error));

    this.reloadOnDeleteBlog.emit(_id);
  }

  largeView(event: any) {
    this.switchView = 'modal-images-large';
  }

  gridView(event: any) {
    this.switchView = 'modal-images-grid';
  }

  openLg(id) {
    this.modalService.open(id, {size: 'lg'});
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
    if (typeof this.blog.gallery !== null || []) {
      if (Array.isArray(this.blog.gallery)) {
        this.headerClass = (this.blog.gallery.length === 1) ? 'header-image' : 'header-text';
      }
    }

    //you tube player
    if (this.blog.url) {
      this.youTube = this.blog.url.search('youtube');
    }
    if (this.blog.url && this.youTube === 12) {
      this.id = this.blog.url.slice(-11);
    }////////
    // console.log(5, this.blog)
  };
}
