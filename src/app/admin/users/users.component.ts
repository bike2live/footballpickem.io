import { Component, OnInit } from '@angular/core';
import { DataService } from "../../core/data.service";
import { FbUser } from "../../users/fbUser";

@Component({
    selector: 'fp-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    users: FbUser[];


    constructor(private dataService: DataService) {
    }

    ngOnInit() {
        this.dataService.getUserList().subscribe(
            (data: FbUser[]) => {
                this.users = data;
            },
            (err: any) => console.log(err)
        );
    }

    deleteUser(user: FbUser) {
        alert('about to delete a user!');
        this.dataService.deleteUser(user.uid).subscribe(() => {
            alert('successfully deleted user');
        }, (err: any) => {
            alert(`Failed to delete user: ${err}`)
        });
    }
}
