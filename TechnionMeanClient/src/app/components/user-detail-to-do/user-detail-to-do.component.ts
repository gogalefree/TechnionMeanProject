/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserTask } from 'src/app/models/entities/user-task';

@Component({
  selector: 'app-user-detail-to-do',
  templateUrl: './user-detail-to-do.component.html',
  styleUrls: ['./user-detail-to-do.component.css'],
})
export class UserDetailToDoComponent implements OnInit {
  constructor() {}

  @Input() task: UserTask = new UserTask('Task', false);
  @Output() taskUpdatedNotification: EventEmitter<void> = new EventEmitter()

  ngOnInit(): void {}

  onMarkCompleted():void {
    this.task.completed = true
    this.taskUpdatedNotification.emit()
    //Notify to update server
  }
}
