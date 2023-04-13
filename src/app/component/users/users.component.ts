import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/domain/entity/User';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.sass', '../../../../node_modules/flag-icons/css/flag-icons.min.css']
})
export class UsersComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'gender', 'country', 'age']
    users$: Observable<User[]> = EMPTY

    constructor(
        private readonly userService: UserService
    ) { }
    ngOnInit(): void {
        this.users$ = this.userService.getAllUsers()
    }
}
