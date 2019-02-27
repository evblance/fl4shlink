import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-flash',
    templateUrl: './flash.component.html',
    styleUrls: ['./flash.component.scss']
})
export class FlashComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.apiService.redirectToUrl(params.flash).subscribe(
                (response: any) => {
                    if (response.status === 'success') {
                        document.location.href = response.url;
                    }
                },
                (error: any) => {
                    if (error.error.reason === 'not found') {
                        this.router.navigate(['api/error'], { queryParams: { r: 'nf' } });
                    } else if (error.error.reason === 'expired') {
                        this.router.navigate(['api/error'], { queryParams : { r: 'exp' } });
                    }
                }
            );
        });
    }

}
