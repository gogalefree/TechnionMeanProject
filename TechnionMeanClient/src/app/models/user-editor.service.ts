import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppDataService } from './app-data.service';
import { User } from './entities/user';
import { UserPost } from './entities/user-post';
import { UserTask } from './entities/user-task';

@Injectable({
  providedIn: 'root',
})
export class UserEditorService implements OnDestroy {
  constructor(private server: AppDataService) {}
  user: User = User.blankUser();
  subs: Subscription[] = [];

  addTask(t: UserTask): void {
    this.user.tasks.push(t);
    this.updateUser();
  }

  addPost(p: UserPost): void {
    this.user.posts.push(p);
    this.updateUser();
  }

  addUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      const s = this.server.postUser(this.user).subscribe(
        (u) => {
          console.log('incoming user after post: ' + JSON.stringify(u));
          resolve(u);
        },
        (error) => {
          reject(error);
        }
      );

      this.subs.push(s);
    });
  }

  private updateUser(): void {
    console.log('editor: ' + JSON.stringify(this.user));
    const s = this.server.updateUser(this.user).subscribe((u) => {
      console.log('user updated: ' + JSON.stringify(u));
    });
    this.subs.push(s);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
