import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, concatMap, forkJoin, map, of, takeUntil, tap } from 'rxjs';
import { UserBuilder } from 'src/domain/builder/UserBuilder';
import { IUser } from 'src/domain/entity/User';
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
    
    createUser(name: string): Observable<IUser | undefined> {
        if (!name || name.length < 3) {
            return of(undefined);
        }else{
            const user = new UserBuilder(name).build()
            const age$ = this.ageEstimator.estimateAgeForUser(user);
            const countries$ = this.nationalityEstimator.estimateNationalityForUser(user);
            const gender$ = this.genderEstimator.estimateGenderForUser(user);
        
            // Combine the three API responses using the zip operator
            return forkJoin([age$, countries$, gender$]).pipe(
              map(([age, country, gender]) => {
                // Use the UserBuilder to construct the User object
                const user = new UserBuilder(name)
                  .setAge(age)
                  .setGender(gender)
                  .setCountry(country)
                  .build();
                return user;
              })
            );
        }

      }

    getAllUsers(): Observable<IUser[]> {
        return this.userRepository.getAll()
    }

    saveUser(user1: IUser): Observable<IUser> {
        return this.userRepository.add(user1)
    }
}