import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service'
import { MessageService } from 'primeng/api'

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private UserProvider: UserService,
        private messageService: MessageService
    ) {}

    userDetails: FormGroup
    isPasswordVisible: boolean

    ngOnInit(): void {
        this.isPasswordVisible = false
        this.userDetails = this.fb.group({
            username: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        })
    }

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible
    }

    onSubmit() {
        console.log(this.userDetails.value)
        this.UserProvider.registerUser(this.userDetails.value).subscribe(
            res => {
                console.log(res)
                this.messageService.add({
                    key: 'tr',
                    severity: 'success',
                    summary: 'Success',
                    detail: 'User registered successfully'
                })
                this.UserProvider.setCurrentUser(res)
                // this.router.navigate(['/home'])
            },
            err => {
                if (err.status === 409) {
                    this.messageService.add({
                        key: 'tc',
                        severity: 'error',
                        summary: 'Error',
                        detail: err.error.message
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
