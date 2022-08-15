import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from './config'
import { Room } from '../models/room'
import { Timeslot } from '../models/timeslot'
import { User } from '../models/user'

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    constructor(private http: HttpClient) {}

    createRoom(room: Room) {
        return this.http.post(API_URL + 'room/create', room)
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

    getAllUserRooms(user: User) {
        return this.http.get(API_URL + 'room/user/' + user._id)
    }
}
