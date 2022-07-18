import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms'

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

    constructor(private router: Router, private RoomProvider: RoomService) {}

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

    navigateToRoom() {
        this.router.navigateByUrl(`room/${this.roomId.value}`)
    }

    validateRoomId(value: string) {
        if (value.length === 5) {
            if (this.RoomProvider.getRoomById(value) !== undefined) {
                return true
            }
        }
        return false
    }
}
