import { Observable } from "rxjs";
import { IUser } from "../entity/User";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export abstract class NationalityEstimator {
    abstract estimateNationalityForUser(user: IUser): Observable<string>;
}