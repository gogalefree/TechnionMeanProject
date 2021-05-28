/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPost } from 'src/app/models/entities/user-post';
import { UserEditorService } from 'src/app/models/user-editor.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  constructor(
    private editor: UserEditorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  title = '';
  body = '';

  titleValidator = new FormControl('', [Validators.required])

  onAddPost(): void {
    if (this.title == '') {
      alert('Post must have a title.');
      return;
    }
    const p = new UserPost(this.title, this.body);
    this.editor.addPost(p);
    this.router.navigate(['../details', this.editor.user._id], {
      relativeTo: this.route,
    });
  }

  onCancel(): void {
    console.log('canceled');
    this.router.navigate(['../details', this.editor.user._id], {
      relativeTo: this.route,
    });
  }
  ngOnInit(): void {}
}
