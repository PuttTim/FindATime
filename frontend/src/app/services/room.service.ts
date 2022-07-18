import { Injectable } from '@angular/core'

import { RoomData } from '../mockdata/room-data'
import { Room } from '../models/room'
import { Timeslot } from '../models/timeslot'
import { User } from '../models/user'

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    roomsList = RoomData

    constructor() {}

    insertRoom(room: Room) {
        this.roomsList.push(room)
    }

    getRoomById(id: string) {
        return this.roomsList.find(room => room.id === id)
    }

    updateTimeslots(roomId: string, user: User, timeslots: Timeslot[]) {
        const room = this.getRoomById(roomId)
        room?.participants.splice(
            room?.participants.findIndex(e => e.user === user),
            1,
            { user, timeslots }
        )
    }
}
