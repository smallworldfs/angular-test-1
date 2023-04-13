import { Observable, map } from "rxjs";
import { User } from "src/domain/entity/User";
import { GenderEstimator } from "src/domain/service/GenderEstimator";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

class GenderizeResponse {
    //{"name": "peter","gender": "male","probability": 0.99,"count": 165452}
    constructor(
        readonly name: string,
        readonly gender: string,
        readonly probability: number,
        readonly count: number
    ) { }
}
@Injectable({
    providedIn: 'root'
})
export class GenderizeGenderEstimator extends GenderEstimator {
    constructor(private readonly http: HttpClient) { super() }

    override estimateGenderForUser(user: User): Observable<string> {
        const url = `https://api.genderize.io?name=${user.name}`;
        return this.http.get<GenderizeResponse>(url).pipe(map(response => response.gender))

    }

}