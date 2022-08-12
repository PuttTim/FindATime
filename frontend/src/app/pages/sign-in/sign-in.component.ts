import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    constructor(private fb: FormBuilder) {}

    userDetails: FormGroup
    isPasswordVisible: boolean

    ngOnInit(): void {
        this.isPasswordVisible = false
        this.userDetails = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        })
    }

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible
    }

    onSubmit() {
        console.log(this.userDetails.value)
    }
}
