import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    constructor(private fb: FormBuilder) {}

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
    }
}
