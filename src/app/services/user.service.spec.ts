import { TestBed, waitForAsync } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { UserService } from './user.service';
import { AgeEstimator } from 'src/domain/service/AgeEstimator';
import { GenderEstimator } from 'src/domain/service/GenderEstimator';
import { NationalityEstimator } from 'src/domain/service/NationalityEstimator';
import { User } from 'src/domain/entity/User';
import { Observable, concatMap, of, switchMap } from 'rxjs';
import { UserRepository } from 'src/domain/repository/UserRepository';
import { InMemoryUserRepository } from 'src/infrastructure/inmemory/InMemoryUserRepository';

describe('UserService', () => {
    let service: UserService;
    let ageEstimatorMock: Spy<AgeEstimator>
    let genderEstimatorMock: Spy<GenderEstimator>
    let nationalityEstimatorMock: Spy<NationalityEstimator>
    let userRepository: InMemoryUserRepository

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        ageEstimatorMock = createSpyFromClass<AgeEstimator>(AgeEstimator as any, ['estimateAgeForUser'])
        genderEstimatorMock = createSpyFromClass<GenderEstimator>(GenderEstimator as any, ['estimateGenderForUser'])
        nationalityEstimatorMock = createSpyFromClass<NationalityEstimator>(NationalityEstimator as any, ['estimateNationalityForUser'])

        TestBed.configureTestingModule({
            providers: [
                { provide: AgeEstimator, useValue: ageEstimatorMock },
                { provide: GenderEstimator, useValue: genderEstimatorMock },
                { provide: NationalityEstimator, useValue: nationalityEstimatorMock },
                { provide: UserRepository, useValue: userRepository }
            ]
        });
        service = TestBed.inject(UserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should estimate age', () => {
        const expectedAge = 35
        const user = User.createNew("Almudena");

        ageEstimatorMock.estimateAgeForUser.and.returnValue(of(expectedAge))
        // service.estimateAge(user).subscribe(() => {
        //     expect(ageEstimatorMock.estimateAgeForUser).toHaveBeenCalled()
        //     expect(user.age).toBe(expectedAge)
        // })
    })

    it('should estimate gender', () => {
        const expectedGender = "female"
        const user = User.createNew("Almudena");

        genderEstimatorMock.estimateGenderForUser.and.returnValue(of(expectedGender))
        // service.estimateGender(user).subscribe(() => {
        //     expect(genderEstimatorMock.estimateGenderForUser).toHaveBeenCalled()
        //     expect(user.gender).toBe(expectedGender)
        // })
    })

    it('should estimate nationality', () => {
        const expectedNationality = "Spanish"
        const user = User.createNew("Almudena");

        nationalityEstimatorMock.estimateNationalityForUser.and.returnValue(of(expectedNationality))
        // service.estimateNationality(user).subscribe(() => {
        //     expect(nationalityEstimatorMock.estimateNationalityForUser).toHaveBeenCalled()
        //     expect(user.country).toBe(expectedNationality)
        // })
    })

    it('should save users', waitForAsync(() => {
        const user1 = User.createNew("Pascual")

        service.getAllUsers().subscribe((users) => {
            expect(users.length).toBe(1)
            expect(users[0]).toBe(user1);
        })

        service
            .saveUser(user1)
            .subscribe()
    }))
});