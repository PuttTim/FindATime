import { Room } from '../models/room'
import { UserData } from './user-data'

export const RoomData: Room[] = [
    {
        id: 'rW21a',
        name: 'Innova Project discussion: Ideation',
        description:
            'To discuss about the design thinking process and how to tackle our problem statement',
        location: 'TP',
        dates: [new Date(2022, 8, 13), new Date(2022, 8, 14)],
        duration: 2,
        host: UserData[0],
        participants: [
            {
                user: UserData[0],
                timeslots: [
                    {
                        date: new Date(2022, 8, 13),
                        availability: [
                            {
                                startTime: new Date(2022, 8, 13, 9),
                                endTime: new Date(2022, 8, 13, 11, 30)
                            }
                        ]
                    },
                    {
                        date: new Date(2022, 8, 13),
                        availability: [
                            {
                                startTime: new Date(2022, 8, 13, 9),
                                endTime: new Date(2022, 8, 13, 11, 30)
                            }
                        ]
                    }
                ]
            },
            {
                user: UserData[1],
                timeslots: [
                    {
                        date: new Date(2022, 8, 13),
                        availability: [
                            {
                                startTime: new Date(2022, 8, 13, 12, 0, 0),
                                endTime: new Date(2022, 8, 13, 14, 0, 0)
                            }
                        ]
                    },
                    {
                        date: new Date(2022, 8, 14),
                        availability: [
                            {
                                startTime: new Date(2022, 8, 14, 9, 0, 0),
                                endTime: new Date(2022, 8, 14, 11, 0, 0)
                            },
                            {
                                startTime: new Date(2022, 8, 14, 23, 0, 0),
                                endTime: new Date(2022, 8, 14, 12, 0, 0)
                            },
                            {
                                startTime: new Date(2022, 8, 14, 23, 0, 0),
                                endTime: new Date(2022, 8, 14, 12, 0, 0)
                            },
                            {
                                startTime: new Date(2022, 8, 14, 22, 0, 0),
                                endTime: new Date(2022, 8, 14, 24, 0, 0)
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'rP0wA',
        name: 'Innova Project discussion: Protoyping',
        description: 'To work together and create a prototype',
        location: 'TP',
        dates: [new Date(2022, 7, 13), new Date(2022, 7, 13)],
        duration: 5,
        host: UserData[0],
        participants: [
            {
                user: UserData[0],
                timeslots: [
                    {
                        date: new Date(2022, 7, 13),
                        availability: [
                            {
                                startTime: new Date(2022, 7, 13, 9, 0, 0),
                                endTime: new Date(2022, 7, 13, 11, 0, 0)
                            }
                        ]
                    },
                    {
                        date: new Date(2022, 7, 13),
                        availability: [
                            {
                                startTime: new Date(2022, 7, 13, 9, 0, 0),
                                endTime: new Date(2022, 7, 13, 11, 0, 0)
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
