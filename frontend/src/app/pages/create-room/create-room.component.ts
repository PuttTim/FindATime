import { Component, OnInit, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Timeslot } from '../../models/timeslot'
import { PossibleTimeslots } from '../../models/possible-timeslots'

@Component({
    selector: 'app-create-room',
    templateUrl: './create-room.component.html',
    styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
    constructor(private fb: FormBuilder) {}
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
        console.log(this.eventDetails.valid)
        console.log(this.timeslots.length >= 1)
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
