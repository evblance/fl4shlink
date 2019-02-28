import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';

import { NewComponent } from './components/new/new.component';
import { LinkNotFoundComponent } from './components/link-not-found/link-not-found.component';
import { SuccessComponent } from './components/success/success.component';
import { FlashComponent } from './components/flash/flash.component';
import { FailureComponent } from './components/failure/failure.component';
import { ErrorComponent } from './components/error/error.component';

const redirectUrl = new InjectionToken('redirectUrlResolver');

const routes: Routes = [
    { path: '', redirectTo: '0/new', pathMatch: 'full' },
    { path: '0/new', component: NewComponent },
    { path: '0/new/success', component: SuccessComponent },
    { path: '0/new/failure', component: FailureComponent },
    { path: '0/error', component: ErrorComponent },
    { path: ':flash', component: FlashComponent },
    { path: 'redirect', resolve: { redirectUrl }, component: LinkNotFoundComponent },
    { path: '**', component: LinkNotFoundComponent }
];

@NgModule({
    providers: [
        {
            provide: redirectUrl,
            useValue: (route: ActivatedRouteSnapshot) => {
                const redirectUrl = route.paramMap.get('redirectUrl');
                console.log(route);
                console.log(redirectUrl);
                window.location.href = redirectUrl;
            }
        }
    ],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
