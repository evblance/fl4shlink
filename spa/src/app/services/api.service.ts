import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import IFlash from '../interfaces/flash.interface';
import IFlashData from '../interfaces/flash-data.interface';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    createdLinkData: IFlashData;

    constructor(
        @Inject('API_URL') private apiUrl: string,
        @Inject('HOST_URL') private hostUrl: string,
        private httpClient: HttpClient
    ) { }

    createLink(url: string, lifetime: number): Observable<any> {
        const httpUrl = `${this.apiUrl}/createLink`;
        const postData: IFlash = { url, lifetime };
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': `*`,
                'Content-Type': 'application/json'
            })
        };
        return this.httpClient.post<IFlash>(httpUrl, postData, httpOptions);
    }

    redirectToUrl(flash: string): Observable<string> {
        const httpUrl = `${this.apiUrl}/retrieve/${flash}`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': `*`,
                'Content-Type': 'application/json'
            })
        };
        return this.httpClient.get<string>(httpUrl, httpOptions);
    }

    setCreatedLinkData(flash: string, expiry: number): void {
        this.createdLinkData = {
            url: `${this.hostUrl}/${flash}`,
            expiry: expiry
        };
    }

    getCreatedLinkData(): IFlashData {
        return this.createdLinkData;
    }
}
