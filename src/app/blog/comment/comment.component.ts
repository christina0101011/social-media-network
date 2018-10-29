import { Component, OnInit, Input, Output } from '@angular/core';
import { BlogsService } from '../../blogs.service';
import { Blog } from '../../Models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  newComment: string;
  comment: Array<string> = [];
  openComments: boolean; // change show to hide comments input

  @Input('blog_id') blog_id: Blog;

  constructor(private _blogsService: BlogsService) { }

    submitCommentOnEnterKey(event, blog_id){ 
      if (event.keyCode === 13 && this.newComment) {
      this.comment.push(this.newComment);
      this._blogsService.postComment(this.comment, this.blog_id);
      this.newComment = '';
      this.comment = [];
      this.openComments=!this.openComments
      };
    };
  
    submitComment(blog_id) {
      if (this.newComment){
        this.comment.push(this.newComment);
        this._blogsService.postComment(this.comment, this.blog_id);
        this.newComment = '';
        this.comment = [];
        this.openComments=!this.openComments;
      }
    };

  ngOnInit() {
  }

}
