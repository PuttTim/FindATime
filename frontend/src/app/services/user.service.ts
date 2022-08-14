import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { UserData } from '../mockdata/user-data'
import { API_URL } from './config'
import { User } from '../models/user'
import { BehaviorSubject, Observable, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

    users = UserData

    currentUser: Subject<User> = new BehaviorSubject<any>(undefined)

    setCurrentUser(res: any) {
        console.log(API_URL + 'user/user/' + res)

        this.http.get(API_URL + 'user/user/' + res).subscribe(
            (res: any) => {
                this.currentUser.next(res)
                console.log('USER SET')

                this.currentUser.subscribe(user => {
                    console.log('yes', user)
                })
            },
            err => {
                console.log(err)
            }
        )
        console.log(this.currentUser)
    }

    registerUser(user: any) {
        console.log(user)
        return this.http.post(API_URL + 'user/register', user)
    }

    loginUser(user: any) {
        return this.http.post(API_URL + 'user/login', user)
    }
}
