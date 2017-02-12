import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the Weather provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Weather {

    private weatherEndpoint = 'http://api.openweathermap.org/data/2.5/';
    private weatherKey = 'bae4603c7cce559217030e726ccb15cb';

    constructor(public http: Http) {
        console.log('Hello Weather Provider');
    }

    getCurrent(loc: any): Promise<any> {
        let url: string = this.makeDataURL(loc, 'weather');
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private makeDataURL(loc: any, command: string): string {
        //Build a weather service URL using the command string and
        //location data that we have.
        let uri = this.weatherEndpoint + command;

        //Do we have a location?
        if (loc.long) {
            //then use the 'grographical coordinates' version of the API
            uri += '?lat=' + loc.lat + '&lon=' + loc.long;
        } else {
            //Otherwise, use the zip code
            uri += '?zip=' + loc.zip;
        }

        //Configure output for imperial (English) measurements
        uri += '&units=imperial';
        //Use the following instead for metric
        //uri += '&units=metric';

        //Append the API Key to the end of the URI
        uri += '&APPID=' + this.weatherKey;
        //Return the value
        return uri;
    }

    //'Borrowed' from //https://angular.io/docs/ts/latest/guide/server-communication.html
    private extractData(res: Response) {
        //Convert the response to JSON format  
        let body = res.json();
        //Return the data (or nothing)
        return body || {};
    }

    //'Borrowed' from //https://angular.io/docs/ts/latest/guide/server-communication.html
    private handleError(res: Response | any) {
        console.error('Entering handleError');
        console.dir(res);
        return Promise.reject(res.message || res);
    }
}