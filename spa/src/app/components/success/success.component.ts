import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

import IFlashData from '../../interfaces/flash-data.interface';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

    url: string = undefined;
    expiry: number = undefined;

    constructor(
        private router: Router,
        private apiService: ApiService
    ) { }

    ngOnInit() {
        const data: IFlashData = this.apiService.getCreatedLinkData() || undefined;

        // Redirect to landing page if data is stale or non-available
        if (!data) {
            this.router.navigate(['/']);
        }

        this.url = data.url;
        this.expiry = data.expiry;
    }

}
