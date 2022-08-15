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
        if (!this.UserProvider.isAuthenticated) {
            this.router.navigateByUrl('/sign-in')
            return false
        } else {
            return true
        }
    }
}
