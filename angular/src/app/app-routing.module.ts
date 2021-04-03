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

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard], data: { breadcrumb: 'Home', icon: "fas fa-home" }},
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users', breadcrumb: 'Users', icon: "fas fa-users" }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles', breadcrumb: 'Roles', icon: "fas fa-theater-masks" }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants', breadcrumb: 'Tenants',icon: "fas fa-building" }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, data: { breadcrumb: 'About', icon: "fas fa-user-graduate" } },
                    { path: 'update-password', component: ChangePasswordComponent, data: { breadcrumb: 'Update Password',icon: "fas fa-user-edit" } },
                    {
                        path: 'words',
                        loadChildren: () => import('app/words/words.module').then(m => m.WordsModule), // Lazy load WordsModule
                        data: {
                            permission: 'Pages.Words',
                            breadcrumb: {alias: '@Words'},
                            icon: "fas fa-pen",
                            children: [
                                {
                                    path: 'word-maintenance',
                                    data : {
                                        permission: 'Pages.Words',
                                        breadcrumb: {alias: '@WordMaintenance'},
                                        icon: "fas fa-tools",
                                        children: [
                                            {
                                                path: 'child-one',
                                                data: {
                                                    breadcrumb: {alias: '@ChildOne'},
                                                    icon: "fas fa-baby",
                                                }
                                            }
                                        ]
                                    }

                                }
                            ]
                        },
                        canActivate: [AppRouteGuard]
                    }
                ]
            },
        ])

    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
