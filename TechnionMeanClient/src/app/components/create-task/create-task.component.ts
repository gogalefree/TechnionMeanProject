/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTask } from 'src/app/models/entities/user-task';
import { UserEditorService } from 'src/app/models/user-editor.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  constructor(
    private router: Router,
    private editor: UserEditorService,
    private route: ActivatedRoute
  ) {}

  title = '';
  titleValidator = new FormControl('', [Validators.required])
  
  ngOnInit(): void {}

  onAddTask(): void {
    if (this.title == '') {
      alert('Title can not be empty');
      return;
    }
    const t = new UserTask(this.title, false);
    this.editor.addTask(t);
    this.router.navigate(['../details', this.editor.user._id], {
      relativeTo: this.route,
    });
  }

  onCancel(): void {
    console.log('canceled');
    this.router.navigate(['../details', this.editor.user._id], { relativeTo: this.route });
  }
}
