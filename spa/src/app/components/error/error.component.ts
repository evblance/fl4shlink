import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

    errorText: string = undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            if (params.r === 'nf') {
                this.errorText = 'Sorry, the link you used could not be found...';
            } else if (params.r === 'exp') {
                this.errorText = 'This link has expired...';
            } else {
                this.router.navigate(['']);
            }
        });
    }

}
