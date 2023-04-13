import { Observable, from, map } from "rxjs";
import { User } from "src/domain/entity/User";
import { AgeEstimator } from "src/domain/service/AgeEstimator";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";


class AgifyResponse {
    constructor(readonly age: number, readonly count: number, readonly name: string) { }
}
@Injectable({
    providedIn: 'root'
})
export class AgifyAgeEstimator extends AgeEstimator {
    constructor(private readonly http: HttpClient) { super() }

    override estimateAgeForUser(user: User): Observable<number> {
        const url = `https://api.agify.io?name=${user.name}`;
        return this.http.get<AgifyResponse>(url).pipe(map(response => response.age))
    }

}