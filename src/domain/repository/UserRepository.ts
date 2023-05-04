import { Observable } from "rxjs";
import { IUser } from "../entity/User";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export abstract class UserRepository {
    abstract getAll(): Observable<IUser[]>
    abstract add(user: IUser): Observable<IUser>
}