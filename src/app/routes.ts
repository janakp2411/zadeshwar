import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { DirectoryComponent } from './directory/directory.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'signup',
        component: UserComponent,
        children: [
            {   path: '', 
                component: SignUpComponent 
            }]
    },
    {
        path: 'login',
        component: UserComponent,
        children: [
            {   
                path: '', 
                component: SignInComponent 
            }]
    },
    {
        path: 'userprofile', 
        component: UserProfileComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'directory', 
        component: DirectoryComponent,
        // redirectTo: '/login', 
        // pathMatch: 'full'
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'aboutUs',
        component: AboutUsComponent
    },
    {
        path: 'gallery',
        component: GalleryComponent
    }
];