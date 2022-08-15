import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from './config'
import { User } from '../models/user'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {
        // user1
        // this.setCurrentUser('62f9953613f9e83e6d162f73')
        // user2
        // this.setCurrentUser('62f5985e52253ac93923486b')
    }

    isAuthenticated = false

    currentUser: Subject<User> = new BehaviorSubject<any>(undefined)

    setCurrentUser(res: any) {
        this.http.get(API_URL + 'user/user/' + res).subscribe(
            (res: any) => {
                this.currentUser.next(res)
                this.isAuthenticated = true
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
    }

    loginUser(user: any) {
        return this.http.post(API_URL + 'user/login', user)
    }

    updateUser(user: any) {
        return this.http.put(API_URL + 'user/update', user)
    }
}
