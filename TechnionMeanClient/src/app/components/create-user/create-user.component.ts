import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/entities/user';
import { UserEditorService } from 'src/app/models/user-editor.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  name = '';
  email = '';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [Validators.required]);

  subbmitEnabeled = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private editor: UserEditorService
  ) {}

  ngOnInit(): void {
    this.editor.user = User.blankUser();
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAdd(): void {
    //TODO: add validation

    this.editor.user.name = this.name;
    this.editor.user.email = this.email;
    this.editor.addUser().then((u) => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
