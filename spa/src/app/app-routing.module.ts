import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewComponent } from './components/new/new.component';
import { LinkNotFoundComponent } from './components/link-not-found/link-not-found.component';
import { SuccessComponent } from './components/success/success.component';
import { FlashComponent } from './components/flash/flash.component';
import { FailureComponent } from './components/failure/failure.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
    { path: '', redirectTo: '0/new', pathMatch: 'full' },
    { path: '0/new', component: NewComponent },
    { path: '0/new/success', component: SuccessComponent },
    { path: '0/new/failure', component: FailureComponent },
    { path: '0/error', component: ErrorComponent },
    { path: ':flash', component: FlashComponent },
    { path: '**', component: LinkNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
