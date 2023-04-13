import { Observable } from "rxjs";
import { User } from "../entity/User";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export abstract class AgeEstimator {
    abstract estimateAgeForUser(user: User): Observable<number>;
}