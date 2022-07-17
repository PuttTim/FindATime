import { Timeslot } from './timeslot'
import { User } from './user'

export interface Participant {
    user: User
    timeslots: Timeslot[]
}
