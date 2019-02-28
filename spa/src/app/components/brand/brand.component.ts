import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

    @Input()
    isSmall: boolean = false;

    @Input()
    isInline: boolean = false;

    constructor() { }

    ngOnInit() {
    }

}
