import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/root/app.component';
import { UsersComponent } from './component/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { UserRepository } from 'src/domain/repository/UserRepository';
import { InMemoryUserRepository } from 'src/infrastructure/inmemory/InMemoryUserRepository';
import { UserFormComponent } from './component/user-form/user-form.component';
import { AgeEstimator } from 'src/domain/service/AgeEstimator';
import { GenderEstimator } from 'src/domain/service/GenderEstimator';
import { NationalityEstimator } from 'src/domain/service/NationalityEstimator';
import { AgifyAgeEstimator } from 'src/infrastructure/agify/AgifyAgeEstimator';
import { GenderizeGenderEstimator } from 'src/infrastructure/genderize/GenderizeGenderEstimator';
import { NationalizeNationalityEstimator } from 'src/infrastructure/nationalize/NationalizeNationalityEstimator';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        UserFormComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        MatTableModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatChipsModule,
        MatGridListModule
    ],
    providers: [
        { provide: UserRepository, useClass: InMemoryUserRepository },
        { provide: AgeEstimator, useClass: AgifyAgeEstimator },
        { provide: GenderEstimator, useClass: GenderizeGenderEstimator },
        { provide: NationalityEstimator, useClass: NationalizeNationalityEstimator },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
