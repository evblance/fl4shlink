import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewComponent } from './components/new/new.component';
import { SuccessComponent } from './components/success/success.component';
import { LinkNotFoundComponent } from './components/link-not-found/link-not-found.component';
import { LinkExpiredComponent } from './components/link-expired/link-expired.component';
import { FailureComponent } from './components/failure/failure.component';
import { FlashComponent } from './components/flash/flash.component';
import { ErrorComponent } from './components/error/error.component';

import { ApiService } from './services/api.service';

import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { BrandComponent } from './components/brand/brand.component';
import { RedirectComponent } from './components/redirect/redirect.component';


@NgModule({
    declarations: [
        NewComponent,
        SuccessComponent,
        LinkNotFoundComponent,
        AppComponent,
        LinkExpiredComponent,
        FailureComponent,
        FlashComponent,
        ErrorComponent,
        FooterComponent,
        BannerComponent,
        BrandComponent,
        RedirectComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        ApiService,
        { provide: 'API_URL', useValue: 'https://fl4shlink.herokuapp.com/api' }, // TODO: Update to PROD URI
        { provide: 'HOST_URL', useValue: 'https://fl4shlink.herokuapp.com' } // TODO: Update to PROD URI (https://fl4sh.me)
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
