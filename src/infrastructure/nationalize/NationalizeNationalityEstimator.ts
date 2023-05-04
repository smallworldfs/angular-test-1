import { Observable, map } from "rxjs";
import { IUser } from "src/domain/entity/User";
import { NationalityEstimator } from "src/domain/service/NationalityEstimator";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";


class NationalizeCountry { constructor(readonly country_id: string, readonly probability: number) { } }
class NationalizeResponse {
    constructor(readonly country: NationalizeCountry[], readonly name: string) { }
}
@Injectable({
    providedIn: 'root'
})
export class NationalizeNationalityEstimator extends NationalityEstimator {
    constructor(private readonly http: HttpClient) { super() }

    override estimateNationalityForUser(user: IUser): Observable<string> {
        const url = `https://api.nationalize.io?name=${user.name}`;
        return this.http.get<NationalizeResponse>(url).pipe(map(response => response.country[0].country_id))
    }
}