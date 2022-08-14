import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms'
import { MessageService } from 'primeng/api'

import { RoomService } from '../../services/room.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    showDialog: boolean
    isRoomIdValid: boolean

    roomId = new FormControl('')

    constructor(
        private router: Router,
        private messageService: MessageService,
        private RoomProvider: RoomService
    ) {}

    ngOnInit(): void {
        this.isRoomIdValid = false
        this.showDialog = false
        this.roomId.valueChanges.subscribe(value => {
            this.isRoomIdValid = this.validateRoomId(value)
        })
    }

    toggleDialog() {
        this.showDialog = !this.showDialog
    }

    navigateToCreateRoom() {
        this.router.navigateByUrl('create-room')
    }

    onJoinRoom() {
        this.RoomProvider.getAllRoomId().subscribe(
            (res: any) => {
                if (res.includes(this.roomId.value)) {
                    this.messageService.add({
                        key: 'tr',
                        severity: 'success',
                        summary: 'Success',
                        detail: 'You have successfully joined the room'
                    })
                    this.router.navigateByUrl(`room/${this.roomId.value}`)
                } else {
                    console.log('room not found')
                }
            },
            err => {
                console.log(err)
            }
        )
    }

    validateRoomId(value: string) {
        if (value.length === 5) {
            return true
        }
        return false
    }
}
