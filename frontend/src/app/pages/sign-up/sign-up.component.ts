import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { UserService } from '../../services/user.service'
import { MessageService } from 'primeng/api'

declare var paypal: any

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    @ViewChild('paypal', { static: true }) paypalElement: ElementRef

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private UserProvider: UserService,
        private messageService: MessageService
    ) {}

    userDetails: FormGroup
    isPasswordVisible: boolean
    isDialogVisible: boolean
    _id: String

    ngOnInit(): void {
        this.isPasswordVisible, (this.isDialogVisible = false)
        this.userDetails = this.fb.group({
            username: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        })
    }

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible
    }

    toggleDialog() {
        this.isDialogVisible = !this.isDialogVisible
        this.isDialogVisible
            ? paypal
                  .Buttons({
                      createOrder: (data: any, actions: any) => {
                          return actions.order.create({
                              purchase_units: [
                                  {
                                      description: 'FindATime Account Upgrade',
                                      amount: {
                                          currency_code: 'USD',
                                          value: '4.99'
                                      }
                                  }
                              ]
                          })
                      },
                      onApprove: async (data: any, actions: any) => {
                          const order = await actions.order
                              .capture()
                              .then((details: any) => {
                                  if (details.status === 'COMPLETED') {
                                      this.UserProvider.updateUser({
                                          _id: this._id,
                                          tier: 'paid'
                                      }).subscribe((res: any) => {
                                          this.navigateToSignIn()
                                          this.messageService.add({
                                              key: 'tr',
                                              severity: 'success',
                                              summary: 'Success',
                                              detail: 'Account upgraded to paid tier!'
                                          })
                                      })
                                  }
                              })
                      },
                      onError: (err: any) => {}
                  })
                  .render(this.paypalElement.nativeElement)
            : null
    }

    onSubmit() {
        this.UserProvider.registerUser(this.userDetails.value).subscribe(
            (res: any) => {
                this._id = res._id
                this.UserProvider.setCurrentUser(res._id)
                this.toggleDialog()
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

    navigateToSignIn() {
        this.router.navigate(['/sign-in'])
    }
}
