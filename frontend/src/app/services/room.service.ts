import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from './config'
import { RoomData } from '../mockdata/room-data'
import { Room } from '../models/room'
import { Timeslot } from '../models/timeslot'
import { User } from '../models/user'

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    roomsList = RoomData

    constructor(private http: HttpClient) {}

    insertRoom(room: Room) {
        this.roomsList.push(room)
    }

    getRoomByIdOld(id: string) {
        return this.roomsList.find(room => room.id === id)
    }

    updateTimeslots(roomId: string, user: User, timeslots: Timeslot[]) {
        const room = this.getRoomByIdOld(roomId)
        room?.participants.splice(
            room?.participants.findIndex(e => e.user === user),
            1,
            { user, timeslots }
        )
    }

    createRoom(room: Room) {
        this.http.post(API_URL + 'room/create', room).subscribe(
            (res: any) => {
                console.log(res)
            },
            err => {
                console.log(err)
            }
        )
    }

    getAllRoomId() {
        return this.http.get(API_URL + 'room/allrooms')
    }

    getRoomById(id: string) {
        return this.http.get(API_URL + 'room/' + id)
    }

    updateParticipant(roomId: string, user: User, timeslots?: Timeslot[]) {
        return this.http.put(API_URL + 'room/insert-participant', {
            roomId,
            participant: {
                user,
                timeslots
            }
        })
    }

    isUserInRoom(roomId: string, user: User) {
        return this.http.post(API_URL + 'room/isuserinroom/', {
            roomId,
            _id: user._id
        })
    }

    deleteParticipant(roomId: string, user: User) {
        return this.http.post(API_URL + 'room/delete-participant', {
            roomId,
            _id: user._id
        })
    }
}
