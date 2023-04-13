import { Observable } from "rxjs";
import { User } from "../entity/User";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export abstract class GenderEstimator {
    abstract estimateGenderForUser(user: User): Observable<string>;
}