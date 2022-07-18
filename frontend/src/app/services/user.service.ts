import { Injectable } from '@angular/core'

import { UserData } from '../mockdata/user-data'

@Injectable({
    providedIn: 'root'
})
export class UserService {
    users = UserData

    currentUser = this.users[0]

    setCurrentUser(userIndex: number) {
        this.currentUser = this.users[userIndex]
        console.log(this.currentUser)
    }

    constructor() {}
}
