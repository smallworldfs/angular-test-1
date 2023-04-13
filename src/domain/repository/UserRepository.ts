import { Observable } from "rxjs";
import { User } from "../entity/User";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export abstract class UserRepository {
    abstract getAll(): Observable<User[]>
    abstract add(user: User): Observable<User>
}