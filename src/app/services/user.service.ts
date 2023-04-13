import { Injectable } from '@angular/core';
import { EMPTY, Observable, concatMap, of, tap } from 'rxjs';
import { User } from 'src/domain/entity/User';
import { UserRepository } from 'src/domain/repository/UserRepository';
import { AgeEstimator } from 'src/domain/service/AgeEstimator';
import { GenderEstimator } from 'src/domain/service/GenderEstimator';
import { NationalityEstimator } from 'src/domain/service/NationalityEstimator';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private userRepository: UserRepository,
        private ageEstimator: AgeEstimator,
        private genderEstimator: GenderEstimator,
        private nationalityEstimator: NationalityEstimator
    ) { }

    estimateNationality(user: User): Observable<string> {
        return this.nationalityEstimator.estimateNationalityForUser(user).pipe(concatMap(country => {
            user.country = country
            return of(country)
        }))
    }

    estimateGender(user: User): Observable<string> {
        return this.genderEstimator.estimateGenderForUser(user).pipe(concatMap(gender => {
            user.gender = gender
            return of(gender)
        }))
    }

    estimateAge(user: User): Observable<number> {
        return this.ageEstimator.estimateAgeForUser(user).pipe(concatMap(age => {
            user.age = age
            return of(age)
        }))
    }

    getAllUsers(): Observable<User[]> {
        return this.userRepository.getAll()
    }

    saveUser(user1: User): Observable<User> {
        return this.userRepository.add(user1)
    }
}
