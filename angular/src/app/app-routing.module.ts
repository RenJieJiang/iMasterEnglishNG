import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { WordsComponent } from './words/words.component';
import { ChildOneComponent } from './words/child-one/child-one.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard], data: { breadcrumb: 'Home' }},
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users', breadcrumb: 'Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles', breadcrumb: 'Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants', breadcrumb: 'Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, data: { breadcrumb: 'About' } },
                    { path: 'update-password', component: ChangePasswordComponent, data: { breadcrumb: 'Update Password' } },
                    {
                        path: 'words',
                        loadChildren: () => import('app/words/words.module').then(m => m.WordsModule), // Lazy load WordsModule
                        data: { breadcrumb: {alias: '@Words'} }
                    }
                ]
            },
        ])

    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
