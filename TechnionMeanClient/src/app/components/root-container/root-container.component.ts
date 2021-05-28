/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/models/app-data.service';
import { User } from 'src/app/models/entities/user';
import { Subscription } from 'rxjs';
import { UserCardData } from 'src/app/models/uiData/user-card-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root-container',
  templateUrl: './root-container.component.html',
  styleUrls: ['./root-container.component.css'],
})
export class RootContainerComponent implements OnInit {
  constructor(
    private appModel: AppDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  subs: Subscription[] = [];
  users: User[] = [];
  uiData: UserCardData[] = [];
  filteredUiData: UserCardData[] = [];
  searchValue = '';
  rowSpan = 1;
  colSpan = 1;
  rowHeight = 270;

  ngOnInit(): void {
    const s = this.appModel.getAllUsers().subscribe((data) => {
      if (data) {
        console.log('new data:' + data);

        this.users = data;
        this.uiData = this.users.map((u) => new UserCardData(u));
        this.filteredUiData = this.uiData;
      } else {
        alert(
          'could not load data. please check your internet connection and refresh.'
        );
      }
    });

    this.subs.push(s);
  }

  onRowSpanChanged(tasksCount: number): void {
    if (tasksCount == 0) {
      this.rowSpan = 1;
    } else {
      const factor = (30 * tasksCount + 100) / this.rowHeight;
      this.rowSpan = 1 + factor;
    }
    console.log(this.rowSpan);
  }

  onSearchChanged(str: string): void {
    this.searchValue = str;
    if (str == '') {
      this.filteredUiData = this.uiData;
    } else {
      this.filteredUiData = this.uiData.filter((u) =>
        u.user.name.toLocaleLowerCase().includes(str.toLocaleLowerCase())
      );

      this.filteredUiData.concat(
        this.uiData.filter((u) =>
          u.user.name.toLocaleLowerCase().includes(str.toLocaleLowerCase())
        )
      );
    }
  }

  onCardSelected(userId: string): void {
    this.uiData.forEach((cd) => {
      if (cd.user._id != userId) {
        cd.isSelected = false;
      }
    });
  }

  onAddUser(): void {
    this.router.navigate(['newUser'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe);
  }
}
