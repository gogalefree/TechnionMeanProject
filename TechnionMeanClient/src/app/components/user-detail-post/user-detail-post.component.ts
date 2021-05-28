/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit, Output } from '@angular/core';
import { UserPost } from 'src/app/models/entities/user-post';

@Component({
  selector: 'app-user-detail-post',
  templateUrl: './user-detail-post.component.html',
  styleUrls: ['./user-detail-post.component.css']
})
export class UserDetailPostComponent implements OnInit {

  constructor() { }

  @Input()
  post: UserPost = new UserPost("Post title", "Post Body")
 
  ngOnInit(): void {
  }

}
