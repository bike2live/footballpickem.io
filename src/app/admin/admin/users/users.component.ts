import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../core/data.service";
import { User } from "../../../users/user";

@Component({
    selector: 'fp-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    users: User[];


    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.dataService.getUserList().subscribe(
            (data: User[]) => {
                this.users = data;
            },
            (err: any) => console.log(err)
        );
    }

    deleteUser(user: User) {
        alert('about to delete a user!');
    }
}
