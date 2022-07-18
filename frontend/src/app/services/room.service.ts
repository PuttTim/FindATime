import { Injectable } from '@angular/core'

import { RoomData } from '../mockdata/room-data'
import { Room } from '../models/room'

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
}
