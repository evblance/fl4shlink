import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewComponent } from './components/new/new.component';
import { LinkNotFoundComponent } from './components/link-not-found/link-not-found.component';
import { SuccessComponent } from './components/success/success.component';
import { FlashComponent } from './components/flash/flash.component';
import { FailureComponent } from './components/failure/failure.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
    { path: '', redirectTo: '/api/new', pathMatch: 'full' },
    { path: ':flash', component: FlashComponent },
    { path: 'api/new', component: NewComponent },
    { path: 'api/new/success', component: SuccessComponent },
    { path: 'api/new/failure', component: FailureComponent },
    { path: 'api/error', component: ErrorComponent },
    { path: '**', component: LinkNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
