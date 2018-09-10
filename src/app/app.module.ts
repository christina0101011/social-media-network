import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { NavigationComponent } from './navigation/navigation-component'
import { BlogsListComponent } from './blogs-list/blogs-list';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { EditBlog } from './edit-blog/edit-blog-component';
import { BlogsService } from './blogs.service';
import { InitialPageComponent } from './initia-page/initial-page-component';
import { NewBlogComponent } from './new-blog/new-blog-component';

const routes: Routes = [
  { path: 'blogs', component: BlogsListComponent, canActivate: [AuthGuardService] },
  { path: 'initial', component: InitialPageComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: '', component: AppComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    BlogsListComponent,
    NewBlogComponent,
    EditBlog,
    NavigationComponent,
    InitialPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    YoutubePlayerModule
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService,
    BlogsService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
