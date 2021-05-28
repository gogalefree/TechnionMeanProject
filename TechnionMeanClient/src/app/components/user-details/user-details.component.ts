/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/models/app-data.service';
import { User } from 'src/app/models/entities/user';
import { UserEditorService } from 'src/app/models/user-editor.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dataService: AppDataService,
    private router: Router,
    private editor: UserEditorService
  ) {}

  userId = '';
  user: User = User.blankUser();
  subs: Subscription[] = [];

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userId = userId;
    const s = this.dataService.getUserbyID(this.userId).subscribe((u) => {
      this.user = u;
      console.log('userById:' + JSON.stringify(u));
    });

    this.subs.push(s);
  }

  setId(t: any): string {
    return t._id ? t._id : t.id;
  }

  updateUser(): void {
    console.log('update user:' + JSON.stringify(this.user.tasks));
  }

  onNewTask(): void {
    console.log('new task');
    this.editor.user = this.user
    this.router.navigate(['../../newTask'], { relativeTo: this.route });
  }

  onNewPost(): void {
    console.log('new post');
    this.editor.user = this.user
    this.router.navigate(['../../newPost'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
