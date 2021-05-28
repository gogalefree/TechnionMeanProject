import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { RootContainerComponent } from './components/root-container/root-container.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    component: RootContainerComponent,
    children: [
      { path: 'details/:id', component: UserDetailsComponent },
      { path: 'newTask', component: CreateTaskComponent },
      { path: 'newPost', component: CreatePostComponent },
      { path: 'newUser', component: CreateUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
