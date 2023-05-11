import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { IUser, User } from 'src/domain/entity/User';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.sass', '../../../../node_modules/flag-icons/css/flag-icons.min.css']
})
export class UserFormComponent implements OnInit {

    constructor(private userService: UserService) { }
    $destroy = new Subject<boolean>();
    nameControl = new FormControl('',Validators.minLength(3))
    user?: IUser

    userForm = new FormGroup({
        name: this.nameControl
    })

    ngOnInit(): void {
        this.nameControl.valueChanges.pipe(
            debounceTime(500), // Wait for 800ms between API requests
            distinctUntilChanged() // Only make API requests if name changes
        ).subscribe(newValue => this.onNameChanged(newValue))
    }

    onSubmit() {
        if (this.user) {
            this.userService.saveUser(this.user).pipe(
                takeUntil(this.$destroy)
            ).subscribe((respose)=>{
                this,this.userForm.reset();
                this.user = undefined
            })
        }
    }

    onNameChanged(newName:any) {
        this.userService.createUser(newName).pipe(
            takeUntil(this.$destroy)
        ).subscribe((estimatedUser)=>{
            this.user=estimatedUser;
        })

    }
    ngOnDestroy() {
        this.$destroy.next(false);
        this.$destroy.complete();
    }
}