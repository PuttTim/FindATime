import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Clipboard } from '@angular/cdk/clipboard'
import { Room } from '../../models/room'
import { User } from '../../models/user'

import { RoomService } from '../../services/room.service'
import { UserService } from 'src/app/services/user.service'
import { Timeslot } from 'src/app/models/timeslot'
import { PossibleTimeslots } from 'src/app/models/possible-timeslots'
import { interval } from 'rxjs'

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
    id: string
    roomData?: Room
    currentUser: User

    showDialog: boolean
    possibleTimeslots = PossibleTimeslots
    timeslots: Timeslot[]
    timer: any

    constructor(
        private route: ActivatedRoute,
        private clipboard: Clipboard,
        private RoomProvider: RoomService,
        private UserProvider: UserService
    ) {
        this.UserProvider.currentUser.subscribe(user => {
            this.currentUser = user
        })

        this.timer = interval(5000).subscribe(() => {
            this.getRoomData()
        })
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params.id
        })
        this.getRoomData()
        this.timeslots = []
        this.showDialog = false
        this.roomData = this.RoomProvider.getRoomByIdOld(this.id)
    }

    getRoomData() {
        this.RoomProvider.getRoomById(this.id).subscribe((room: any) => {
            console.log('ROOM GOTTEN AY')

            this.roomData = room as Room
            this.timeslots = room.participants.find(
                (participant: any) =>
                    participant.user._id == this.currentUser._id
            )?.timeslots
        })
    }

    toggleDialog() {
        this.showDialog = !this.showDialog
    }

    clipboardCopy() {
        this.clipboard.copy('http://localhost:4200/room/' + this.id)
        console.log('Copied to clipboard')
    }

    getAvailableDates() {
        return this.roomData?.dates
    }

    getUserTimeslots(availableDate: Date) {
        const timeslots = this.roomData?.participants
            .find(participant => participant.user._id == this.currentUser._id)
            ?.timeslots.find(
                (timeslot: Timeslot) =>
                    timeslot.date.getDate == availableDate.getDate &&
                    timeslot.date.getMonth == availableDate.getMonth &&
                    timeslot.date.getFullYear == availableDate.getFullYear
            )
            ?.availability.sort(
                (a: any, b: any) => a.startTime.getTime - b.startTime.getTime
            )

        // console.log(typeof timeslots)

        return timeslots
    }

    getParticipants() {
        return this.roomData?.participants
    }

    getBestTimeslot() {
        const allStartTimes: Date[] = []

        // Get every participant's start times and push it into the allStartTimes array
        this.roomData?.participants.forEach(participant => {
            return participant.timeslots.map(timeslot => {
                return timeslot.availability.map(availability => {
                    allStartTimes.push(availability.startTime)
                })
            })
        })

        // Count the number of times each start time occurs into a 2d array of
        // [[Date, count], [Date, count], ...]
        // console.log('AY', this.countStartTimes(allStartTimes))

        return this.countStartTimes(allStartTimes)
    }

    // Counts the amount of times a start time occurs in the allStartTimes array
    countStartTimes(array: any[]) {
        const counts: any = {}
        for (const num of array) {
            counts[num] = counts[num] ? counts[num] + 1 : 1
        }

        return this.sortObject(counts)
    }

    // Sorts the object by the key:value pairs, the highest value is at the top of the array
    // the array is modeled in [[Key, value], [Key, value], ...].
    sortObject(obj: any) {
        const sorted: any = []
        for (const [key, value] of Object.entries(obj)) {
            sorted.push([key, value])
        }
        return sorted.sort((a: any, b: any) => b[1] - a[1])
    }

    getEndTime(startTime: Date, duration: number) {
        console.log(typeof startTime)

        return new Date(startTime.getHours() + duration * 60000)
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
                const duration = this.roomData?.duration

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

    updateTimeslots() {
        this.toggleDialog()
        this.RoomProvider.updateTimeslots(
            this.id,
            this.currentUser,
            this.timeslots
        )
    }

    ngOnDestroy() {
        this.timer.unsubscribe()
    }
}
