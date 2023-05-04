import { Injectable } from "@angular/core";
import { Observable, of, AsyncSubject, Subject } from "rxjs";
import { IUser } from "src/domain/entity/User";
import { UserRepository } from "src/domain/repository/UserRepository";

@Injectable({
    providedIn: 'root'
})
export class InMemoryUserRepository extends UserRepository {

    private userStore: Record<string, IUser> = {}
    private subject = new Subject<IUser[]>()
    private observable = this.subject.asObservable()

    override getAll(): Observable<IUser[]> {
        return this.observable
    }

    override add(user: IUser): Observable<IUser> {
        this.userStore[user.id] = user
        this.subject.next(Object.values(this.userStore))
        return of(user)
    }

    getUsers(): IUser[] { return Object.values(this.userStore) }
}