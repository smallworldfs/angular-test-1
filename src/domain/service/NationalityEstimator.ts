import { Observable } from "rxjs";
import { User } from "../entity/User";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export abstract class NationalityEstimator {
    abstract estimateNationalityForUser(user: User): Observable<string>;
}