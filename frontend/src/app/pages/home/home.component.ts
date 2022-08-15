import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms'
import { MessageService } from 'primeng/api'

import { RoomService } from '../../services/room.service'
import { UserService } from 'src/app/services/user.service'
import { User } from 'src/app/models/user'
import { Room } from 'src/app/models/room'
import { Timeslot } from 'src/app/models/timeslot'
import { PossibleTimeslots } from 'src/app/models/possible-timeslots'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    showDialog: boolean
    showTimeslotDialog: boolean
    isRoomIdValid: boolean
    possibleTimeslots = PossibleTimeslots

    roomId = new FormControl('')
    currentUser: User
    roomData: Room
    timeslots: Timeslot[]

    constructor(
        private router: Router,
        private messageService: MessageService,
        private RoomProvider: RoomService,
        private UserProvider: UserService
    ) {}

    ngOnInit(): void {
        this.isRoomIdValid, this.showDialog, (this.showTimeslotDialog = false)
        this.roomId.valueChanges.subscribe(value => {
            this.isRoomIdValid = this.validateRoomId(value)
        })
        this.UserProvider.currentUser.subscribe(user => {
            this.currentUser = user
            console.log('AAAA', this.currentUser)
        }),
            (this.timeslots = [])
    }

    toggleDialog() {
        this.showDialog = !this.showDialog
    }

    toggleTimeslotDialog() {
        this.showTimeslotDialog = !this.showTimeslotDialog
    }

    navigateToCreateRoom() {
        this.router.navigateByUrl('create-room')
    }

    selectedTimeslots(date: Date, index: number, value: any) {
        const newDate = new Date(date)

        const availability = {
            date: newDate,
            availability: value.map((slot: any) => {
                const year = newDate.getFullYear()
                const month = newDate.getMonth()
                const day = newDate.getDate()
                const hour = slot.value[0]
                const minute = slot.value[1]
                const duration = this.roomData?.duration

                return {
                    startTime: new Date(year, month, day, hour, minute),
                    endTime: new Date(year, month, day, hour + duration, minute)
                }
            })
        }

        const indexOfDate = this.timeslots.findIndex(e => {
            return e.date.getTime() === newDate.getTime()
        })

        if (indexOfDate === -1) {
            this.timeslots.push(availability)
            console.log('THIRD TIMESLOT PRINT', this.timeslots)

            return
        } else {
            this.timeslots.splice(indexOfDate, 1, availability)
            console.log('FORTH TIMESLOT PRINT', this.timeslots)

            return
        }
    }

    validateRoomId(value: string) {
        if (value.length === 5) {
            return true
        }
        return false
    }

    insertParticipant() {
        this.RoomProvider.getRoomById(this.roomId.value).subscribe(room => {
            console.log(room)

            this.roomData = room as Room
            this.toggleTimeslotDialog()
        })
    }

    onJoinRoom() {
        this.RoomProvider.getAllRoomId().subscribe(
            (res: any) => {
                if (res.includes(this.roomId.value)) {
                    this.insertParticipant()

                    // this.router.navigateByUrl(`room/${this.roomId.value}`)
                } else {
                    console.log('room not found')
                }
            },
            err => {
                console.log(err)
            }
        )
    }

    updateTimeslots() {
        this.toggleTimeslotDialog()

        console.log('before insert ', this.timeslots)

        this.RoomProvider.updateParticipant(
            this.roomId.value,
            this.currentUser,
            this.timeslots
        ).subscribe(
            (res: any) => {
                console.log('RES', res)
                this.messageService.add({
                    key: 'tc',
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Joined the room!'
                })
                this.router.navigateByUrl(`room/${this.roomId.value}`)
            },
            (err: any) => {
                if (err.status === 400) {
                    this.messageService.add({
                        key: 'tc',
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Welcome back!'
                    })
                    this.router.navigateByUrl(`room/${this.roomId.value}`)
                }
            }
        )
    }
}
