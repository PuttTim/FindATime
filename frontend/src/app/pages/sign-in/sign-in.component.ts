import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from 'src/app/services/user.service'
import { MessageService } from 'primeng/api'

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private UserProvider: UserService,
        private messageService: MessageService,
        private router: Router
    ) {}

    userDetails: FormGroup
    isPasswordVisible: boolean

    ngOnInit(): void {
        this.isPasswordVisible = false
        this.userDetails = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        })
        if (this.UserProvider.isAuthenticated) {
            setTimeout(() => this.router.navigateByUrl('/home'), 500)
        }
    }

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible
    }

    onSubmit() {
        this.UserProvider.loginUser(this.userDetails.value).subscribe(
            (res: any) => {
                console.log(res)
                this.UserProvider.setCurrentUser(res._id)
                setTimeout(() => this.router.navigateByUrl('/home'), 500)
                this.messageService.add({
                    key: 'tc',
                    severity: 'success',
                    summary: `Welcome back ${res.username}!`,
                    detail: 'You have successfully logged in'
                })
            },
            err => {
                if (err.status === 401 || err.status === 404) {
                    this.messageService.add({
                        key: 'tc',
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Wrong email or password'
                    })
                } else {
                    this.messageService.add({
                        key: 'tc',
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Something went wrong, please try again'
                    })
                }
            }
        )
    }
}
