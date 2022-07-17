interface Availability {
    startTime: Date
    endTime: Date
}

export interface Timeslot {
    date: Date
    availability: Availability[]
}
