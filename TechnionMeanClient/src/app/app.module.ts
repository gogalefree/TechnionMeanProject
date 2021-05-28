import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootContainerComponent } from './components/root-container/root-container.component';
import { HttpClientModule } from '@angular/common/http';
import { UiModule } from './modules/ui/ui.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserDetailToDoComponent } from './components/user-detail-to-do/user-detail-to-do.component';
import { UserDetailPostComponent } from './components/user-detail-post/user-detail-post.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

@NgModule({
  declarations: [AppComponent, RootContainerComponent, UserCardComponent, UserDetailsComponent, UserDetailToDoComponent, UserDetailPostComponent, CreateTaskComponent, CreatePostComponent, CreateUserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
