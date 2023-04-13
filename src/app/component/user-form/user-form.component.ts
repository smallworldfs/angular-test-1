import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/domain/entity/User';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.sass', '../../../../node_modules/flag-icons/css/flag-icons.min.css']
})
export class UserFormComponent implements OnInit {

    constructor(private userService: UserService) { }

    nameControl = new FormControl()
    user?: User

    userForm = new FormGroup({
        name: this.nameControl
    })

    ngOnInit(): void {
        this.nameControl.valueChanges.subscribe(newValue => this.onNameChanged(newValue))
    }

    onSubmit() {
        if (this.user) {
            this.userService.saveUser(this.user).subscribe()
            this.nameControl.setValue("")
            this.user = undefined
        }
    }

    onNameChanged(newName: string) {
        if (newName.length < 3) {
            return
        }
        this.user = User.createNew(newName)
        this.userService.estimateAge(this.user).subscribe()
        this.userService.estimateGender(this.user).subscribe()
        this.userService.estimateNationality(this.user).subscribe()
    }
}
