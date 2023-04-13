import { Injectable } from "@angular/core";
import { Observable, of, AsyncSubject, Subject } from "rxjs";
import { User } from "src/domain/entity/User";
import { UserRepository } from "src/domain/repository/UserRepository";

@Injectable({
    providedIn: 'root'
})
export class InMemoryUserRepository extends UserRepository {

    private userStore: Record<string, User> = {}
    private subject = new Subject<User[]>()
    private observable = this.subject.asObservable()

    override getAll(): Observable<User[]> {
        return this.observable
    }

    override add(user: User): Observable<User> {
        this.userStore[user.id] = user
        this.subject.next(Object.values(this.userStore))
        return of(user)
    }

    getUsers(): User[] { return Object.values(this.userStore) }
}