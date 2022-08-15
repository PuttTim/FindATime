import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Clipboard } from '@angular/cdk/clipboard'
import { Room } from '../../models/room'
import { User } from '../../models/user'

import { RoomService } from '../../services/room.service'
import { UserService } from 'src/app/services/user.service'
import { Timeslot } from 'src/app/models/timeslot'
import { PossibleTimeslots } from 'src/app/models/possible-timeslots'
import { interval } from 'rxjs'
import { MessageService } from 'primeng/api'

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
    id: string
    roomData: Room
    currentUser: User

    possibleTimeslots = PossibleTimeslots
    timeslots: Timeslot[]
    timer: any

    constructor(
        private route: ActivatedRoute,
        private clipboard: Clipboard,
        private router: Router,
        private messageService: MessageService,
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
    }

    getRoomData() {
        this.RoomProvider.getRoomById(this.id).subscribe(
            (room: any) => {
                console.log('Room re-fetched')

                this.roomData = room as Room

                const isUserInRoom = this.roomData.participants.findIndex(
                    participant => {
                        return participant.user._id == this.currentUser._id
                    }
                )

                if (isUserInRoom === -1) {
                    this.router.navigateByUrl('/home')
                    this.messageService.add({
                        key: 'tc',
                        severity: 'error',
                        summary: 'Error',
                        detail: 'You are not in this room, please join through the home page'
                    })
                }
            },
            error => {
                this.messageService.add({
                    key: 'tc',
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Room not found'
                })
                this.router.navigateByUrl('/home')
            }
        )
    }

    clipboardCopy() {
        this.clipboard.copy('http://localhost:4200/room/' + this.id)
        console.log('Copied to clipboard')
    }

    getAvailableDates() {
        return this.roomData?.dates
    }

    getUserTimeslots(availableDate: Date) {
        const timeslots = this.roomData.participants
            .find(participant => participant.user._id == this.currentUser._id)
            ?.timeslots.find((timeslot: Timeslot) => {
                return timeslot.date === availableDate
            })
            ?.availability.sort((a: any, b: any) => {
                return a.startTime.getTime - b.startTime.getTime
            })

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

    ngOnDestroy() {
        this.timer.unsubscribe()
    }
}
