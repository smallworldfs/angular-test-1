import { Observable } from "rxjs";
import { IUser } from "../entity/User";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export abstract class AgeEstimator {
    abstract estimateAgeForUser(user: IUser): Observable<number>;
}