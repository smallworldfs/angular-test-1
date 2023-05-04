import { Observable } from "rxjs";
import { IUser } from "../entity/User";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export abstract class GenderEstimator {
    abstract estimateGenderForUser(user: IUser): Observable<string>;
}