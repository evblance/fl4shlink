import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

import ETimeMeasure from '../../enums/time-measure.enum';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss']
})

export class NewComponent implements OnInit {

    lifetimeMeasures: ETimeMeasure[] = Object.keys(ETimeMeasure).map(k => ETimeMeasure[k]);
    bUrlValid: boolean = true;

    form = new FormGroup({
        url: new FormControl(''),
        lifetimeOptions: new FormControl(ETimeMeasure.MINUTES),
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
                case ETimeMeasure.SECONDS:
                    lifetimeSeconds = formValues.lifetime.value;
                    break;
                case ETimeMeasure.MINUTES:
                    lifetimeSeconds = formValues.lifetime.value * 60;
                    break;
                case ETimeMeasure.HOURS:
                    lifetimeSeconds = formValues.lifetime.value * 3600;
                    break;
                default:
                    break;
            }
            this.apiService.createLink(url, lifetimeSeconds).subscribe((response) => {
                if (response.status === 'success') {
                    this.apiService.setCreatedLinkData(response.flash, response.expiry);
                    this.router.navigate(['0/new/success']);
                } else {
                    this.router.navigate(['0/error', { queryParams: { r: 'g' } }]);
                }
            });
        } else {
            this.bUrlValid = false;
            return;
        }

    }

    urlIsValid(url: string): boolean {
        const validURLRegExp = new RegExp(/^([w]{3}.)?[a-zA-Z\-]{3,}.[a-z]{2,3}$/);
        return validURLRegExp.test(url);
    }

}
