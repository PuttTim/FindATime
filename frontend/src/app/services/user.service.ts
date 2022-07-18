import { Injectable } from '@angular/core'

import { UserData } from '../mockdata/user-data'

@Injectable({
    providedIn: 'root'
})
export class UserService {
    users = UserData

    currentUser = this.users[0]

    constructor() {}
}
