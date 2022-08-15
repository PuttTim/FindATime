import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    currentUser: User
    constructor(private UserProvider: UserService) {}

    ngOnInit(): void {
        this.UserProvider.currentUser.subscribe(user => {
            this.currentUser = user
        })
    }
}
