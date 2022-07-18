import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Clipboard } from '@angular/cdk/clipboard'
import { Room } from '../../models/room'
import { User } from '../../models/user'
import { RoomData } from '../../mockdata/room-data'
import { UserData } from '../../mockdata/user-data'

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
    id: string
    roomData?: Room
    currentUser: User = UserData[1]

    constructor(private route: ActivatedRoute, private clipboard: Clipboard) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params.id
            this.roomData = RoomData.find(room => room.id == this.id)
        })
    }

    clipboardCopy() {
        this.clipboard.copy('http://localhost:4200/room/' + this.id)
        console.log('Copied to clipboard')
    }

    getAvailableDates() {
        return this.roomData?.dates
    }

    getUserTimeslots(availableDate: Date) {
        // console.log(availableDate.getDate())
        const timeslots = this.roomData?.participants
            .find(participant => participant.user.id == this.currentUser.id)
            ?.timeslots.find(
                timeslot =>
                    timeslot.date.getDate() == availableDate.getDate() &&
                    timeslot.date.getMonth() == availableDate.getMonth() &&
                    timeslot.date.getFullYear() == availableDate.getFullYear()
            )
            ?.availability.sort(
                (a, b) => a.startTime.getTime() - b.startTime.getTime()
            )

        console.log(typeof timeslots)

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
        console.log(typeof this.countStartTimes(allStartTimes)[0][0])

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
}
