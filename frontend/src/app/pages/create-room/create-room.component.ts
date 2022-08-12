import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { nanoid } from 'nanoid'

import { Timeslot } from '../../models/timeslot'
import { PossibleTimeslots } from '../../models/possible-timeslots'
import { Room } from 'src/app/models/room'

import { UserService } from 'src/app/services/user.service'
import { RoomService } from 'src/app/services/room.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-create-room',
    templateUrl: './create-room.component.html',
    styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private UserProvider: UserService,
        private RoomProvider: RoomService
    ) {}
    eventDetails: FormGroup

    possibleTimeslots = PossibleTimeslots

    timeslots: Timeslot[]

    minDate: Date
    showDialog: boolean

    ngOnInit(): void {
        this.timeslots = []
        this.showDialog = false
        this.minDate = new Date()
        this.eventDetails = this.fb.group({
            name: '',
            description: '',
            location: '',
            date: '',
            duration: ''
        })
    }

    onSubmit() {
        const room: Room = {
            host: this.UserProvider.currentUser,
            id: nanoid(5),
            name: this.eventDetails.value.name,
            description: this.eventDetails.value.description,
            location: this.eventDetails.value.location,
            dates: this.eventDetails.value.date,
            duration: this.eventDetails.value.duration,
            participants: [
                {
                    user: this.UserProvider.currentUser,
                    timeslots: this.timeslots
                }
            ]
        }

        this.RoomProvider.insertRoom(room)

        this.router.navigateByUrl(`room/${room.id}`)
    }

    getAvailableDates() {
        return this.eventDetails.value.date
    }

    getUserTimeslots(availableDate: Date) {
        return this.timeslots
            .find(
                timeslot =>
                    timeslot.date.getDate() == availableDate.getDate() &&
                    timeslot.date.getMonth() == availableDate.getMonth() &&
                    timeslot.date.getFullYear() == availableDate.getFullYear()
            )
            ?.availability.sort(
                (a, b) => a.startTime.getTime() - b.startTime.getTime()
            )
    }

    toggleDialog() {
        this.showDialog = !this.showDialog
    }

    selectedTimeslots(date: Date, index: number, value: any) {
        const availability = {
            date: date,
            availability: value.map((slot: any) => {
                const year = date.getFullYear()
                const month = date.getMonth()
                const day = date.getDate()
                const hour = slot.value[0]
                const minute = slot.value[1]
                const duration = this.eventDetails.value.duration

                return {
                    startTime: new Date(year, month, day, hour, minute),
                    endTime: new Date(year, month, day, hour + duration, minute)
                }
            })
        }

        const indexOfDate = this.timeslots.findIndex(e => e.date === date)

        if (indexOfDate === -1) {
            this.timeslots.push(availability)
        } else {
            this.timeslots.splice(indexOfDate, 1, availability)
        }
    }
}
