import { Component } from '@angular/core'
import { MessageService } from 'primeng/api'
import { UserService } from './services/user.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MessageService]
})
export class AppComponent {
    title = 'FindATime'

    constructor(private UserProvider: UserService) {}

    ngOnInit(): void {
        localStorage.getItem('userId')
            ? this.UserProvider.setCurrentUser(localStorage.getItem('userId'))
            : undefined
    }
}
