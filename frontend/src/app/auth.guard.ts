import { Injectable } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router'
import { MessageService } from 'primeng/api'
import { Observable, timer } from 'rxjs'
import { UserService } from './services/user.service'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private UserProvider: UserService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const permission = route.data['permission']

        return new Promise((resolve, reject) => {
            if (!this.UserProvider.isAuthenticated) {
                setTimeout(() => this.router.navigateByUrl('/sign-in'), 500)
                resolve(false)
            } else {
                this.UserProvider.currentUser.subscribe(res => {
                    if (permission.includes(res.tier)) {
                        console.log('You have permission to access this page')

                        resolve(true)
                    } else {
                        setTimeout(
                            () => this.router.navigateByUrl('/home'),
                            500
                        )
                        console.log(
                            'You do not have permission to access this page'
                        )

                        resolve(false)
                    }
                })
            }
        })
    }
}
