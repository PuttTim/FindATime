import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from './config'
import { User } from '../models/user'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

    isAuthenticated = false

    currentUser: Subject<User> = new BehaviorSubject<any>(undefined)

    setCurrentUser(res: any) {
        this.http.get(API_URL + 'user/user/' + res).subscribe(
            (res: any) => {
                this.currentUser.next(res)
                this.isAuthenticated = true
                localStorage.setItem('userId', res._id)
            },
            err => {
                console.log(err)
            }
        )
        // console.log(this.currentUser)
    }

    registerUser(user: any) {
        return this.http.post(API_URL + 'user/register', {
            ...user,
            tier: 'free'
        })
    }

    logoutUser() {
        this.currentUser.next(undefined)
        this.isAuthenticated = false
        localStorage.removeItem('userId')
    }

    loginUser(user: any) {
        return this.http.post(API_URL + 'user/login', user)
    }

    updateUser(user: any) {
        return this.http.put(API_URL + 'user/update', user)
    }
}
