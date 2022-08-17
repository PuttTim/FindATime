import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Room } from 'src/app/models/room'
import { User } from 'src/app/models/user'
import { RoomService } from 'src/app/services/room.service'
import { UserService } from 'src/app/services/user.service'

declare var paypal: any

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    @ViewChild('paypal', { static: true }) paypalElement: ElementRef

    currentUser: User
    allRooms: Room[]
    userDetails: FormGroup
    isUpdateDialogVisible: boolean
    isUpgradeDialogVisible: boolean
    isPasswordVisible: boolean

    constructor(
        private UserProvider: UserService,
        private RoomProvider: RoomService,
        private fb: FormBuilder,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.isUpdateDialogVisible,
            (this.isUpgradeDialogVisible, (this.isPasswordVisible = false))
        this.UserProvider.currentUser.subscribe(user => {
            this.currentUser = user
            this.RoomProvider.getAllUserRooms(user).subscribe((rooms: any) => {
                this.allRooms = rooms
                console.log(rooms)
            })
        })
        this.userDetails = this.fb.group({
            username: '',
            email: new FormControl('', [Validators.email]),
            password: ''
        })
    }

    toggleUpdateDialog() {
        this.isUpdateDialogVisible = !this.isUpdateDialogVisible
    }

    toggleUpgradeDialog() {
        this.isUpgradeDialogVisible = !this.isUpgradeDialogVisible
        this.isUpgradeDialogVisible
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
                                          _id: this.currentUser._id,
                                          tier: 'paid'
                                      }).subscribe((res: any) => {
                                          this.toggleUpgradeDialog()
                                          this.UserProvider.setCurrentUser(
                                              this.currentUser._id
                                          )
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

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible
    }

    logout() {
        this.UserProvider.logoutUser()
        this.router.navigateByUrl('/sign-in')
        this.messageService.add({
            key: 'tc',
            severity: 'success',
            summary: 'Success',
            detail: 'You have logged out successfully'
        })
    }

    onUpdateProfile() {
        this.toggleUpdateDialog()
        this.UserProvider.updateUser({
            _id: this.currentUser._id,
            ...this.userDetails.value
        }).subscribe((res: any) => {
            this.messageService.add({
                key: 'tc',
                severity: 'success',
                summary: 'Success',
                detail: 'You have updated your profile successfully'
            })
            // this.toggleUpdateDialog()
        })
    }

    onUpgradeAccount() {}
}
