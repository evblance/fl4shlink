import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';

import { NewComponent } from './components/new/new.component';
import { SuccessComponent } from './components/success/success.component';
import { FlashComponent } from './components/flash/flash.component';
import { ErrorComponent } from './components/error/error.component';
import { RedirectComponent } from './components/redirect/redirect.component';

const redirectUrl = new InjectionToken('redirectUrlResolver');

const routes: Routes = [
    { path: '', redirectTo: '0/new', pathMatch: 'full' },
    { path: '0/new', component: NewComponent },
    { path: '0/new/success', component: SuccessComponent },
    { path: '0/error', component: ErrorComponent },
    { path: '0/redirect', resolve: { redirectUrl }, component: RedirectComponent },
    { path: ':flash', component: FlashComponent },
    { path: '**', component: NewComponent }
];

@NgModule({
    providers: [
        {
            provide: redirectUrl,
            useValue: (route: ActivatedRouteSnapshot) => {
                const redirectUrl = route.paramMap.get('redirectUrl');
                window.location.href = redirectUrl;
            }
        }
    ],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
