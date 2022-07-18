import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user.service'

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    constructor(private UserProvider: UserService) {}

    ngOnInit(): void {}

    setCurrentUser(userIndex: number) {
        this.UserProvider.setCurrentUser(userIndex)
    }
}
