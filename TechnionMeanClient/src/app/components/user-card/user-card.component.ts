/* eslint-disable @typescript-eslint/no-empty-function */
import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppDataService } from 'src/app/models/app-data.service';
import { User } from 'src/app/models/entities/user';
import { UserCardData } from 'src/app/models/uiData/user-card-data';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  constructor(
    private dataService: AppDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Input()
  id = 0;

  @Input()
  cardData: UserCardData = new UserCardData(User.blankUser());

  @Output() cardSelected: EventEmitter<string> = new EventEmitter();

  moreButtonTitle = 'Show More';
  showMore = false;
  subs: Subscription[] = [];
  updated = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {}

  onShowMore(): void {
    this.showMore = true;
    this.cardData.rowSpan = 2;
    this.moreButtonTitle = 'Show Less';
  }

  onShowLess(): void {
    this.showMore = false;
    this.cardData.rowSpan = 1;
    this.moreButtonTitle = 'Show More';
  }

  hasUncompletedTasks(): boolean {
    let comp = false;
    this.cardData.user.tasks.forEach((t) => {
      if (t.completed == false) {
        comp = true;
      }
    });
    return comp;
  }

  onUpdate(): void {
    console.log('user before:' + JSON.stringify(this.cardData.user));
    const s = this.dataService
      .updateUser(this.cardData.user)
      .subscribe((data) => {
        console.log('incoming update data' + JSON.stringify(data));
        this.cardData.rowSpan = 1;
        this.showMore = false;
        this.updated = true;
        setTimeout(() => {
          this.updated = false;
        }, 3000);
      });
    this.subs.push(s);
  }

  onDelete(): void {
    const s = this.dataService
      .deleteUser(this.cardData.user)
      .subscribe((data) => {
        console.log('incoming delete data' + JSON.stringify(data));
        this.reload();
      });

    this.subs.push(s);
  }

  reload(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  onShowDetails(): void {
    this.cardData.isSelected = true;
    this.cardSelected.emit(this.cardData.user._id);
    const uid = this.cardData.user._id;
    console.log('route: ' + this.router.url);

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router
        .navigate(['details', uid], {
          relativeTo: this.route
        })
        .then(() => {
          console.log('route: ' + this.router.url);
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
