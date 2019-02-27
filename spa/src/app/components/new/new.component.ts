import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ParamMap } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss']
})

export class NewComponent implements OnInit {

    lifetimeMeasures: string[] = ['seconds', 'minutes', 'hours'];
    bUrlValid: boolean = true;

    form = new FormGroup({
        url: new FormControl(''),
        lifetimeOptions: new FormControl('minutes'),
        lifetime: new FormControl(60)
    });

    constructor(
        private apiService: ApiService,
        private router: Router    
    ) { }

    ngOnInit() {
    }

    onSubmitForm() {
        const formValues: any = {...this.form.controls};

        if (!formValues.url.value) { return; }

        if (this.urlIsValid(formValues.url.value)) {
            this.bUrlValid = true;
            const url: string = formValues.url.value;
            let lifetimeSeconds: number;
            switch (formValues.lifetimeOptions.value) {
                case 'seconds':
                    lifetimeSeconds = formValues.lifetime.value;
                    break;
                case 'minutes':
                    lifetimeSeconds = formValues.lifetime.value * 60;
                    break;
                case 'hours':
                    lifetimeSeconds = formValues.lifetime.value * 3600;
                    break;
                default:
                    break;
            }
            this.apiService.createLink(url, lifetimeSeconds).subscribe((response) => {
                if (response.status === 'success') {
                    console.log(response);
                    this.apiService.setCreatedLinkData(response.flash, response.expiry);
                    this.router.navigate(['0/new/success']);
                }
            });
        } else {
            this.bUrlValid = false;
            return;
        }

    }

    urlIsValid(url: string): boolean {
        const validURLRegExp = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/, 'g');
        return (url.replace(validURLRegExp, '') !== url) ? true : false;
    }

}
