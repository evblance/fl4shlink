import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

interface IFlashData {
    flash: String,
    expiry: String
};

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

    url: String = undefined;
    expiry: String = undefined;

    constructor(
        private router: Router,
        private apiService: ApiService
    ) { }

    ngOnInit() {
        const data = this.apiService.getCreatedLinkData() || undefined;

        // Redirect to landing page if data is stale or non-available
        if (!data) {
            this.router.navigate(['/']);
        }

        this.url = data.url;
        this.expiry = data.expiry;
    }

}
