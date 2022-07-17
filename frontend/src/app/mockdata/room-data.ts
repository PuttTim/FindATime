import { Room } from '../models/room'
import { UserData } from './user-data'

export const RoomData: Room[] = [
    {
        id: 1,
        name: 'Innova Project discussion: Ideation',
        description:
            'To discuss about the design thinking process and how to tackle our problem statement',
        location: 'TP',
        dates: [new Date(2022, 7, 13), new Date(2022, 7, 13)],
        duration: 2,
        host: UserData[0],
        availability: {
            userId: UserData[0].id,
            times: [new Date(2022, 13, 7, 9, 0), new Date(2022, 13, 7, 11, 0)]
        }
    },
    {
        id: 2,
        name: 'Innova Project discussion: Protoyping',
        description: 'To work together and create a prototype',
        location: 'TP',
        dates: [new Date(2022, 7, 13), new Date(2022, 7, 13)],
        duration: 5,
        host: UserData[0],
        availability: {
            userId: UserData[0].id,
            times: [new Date(2022, 13, 7, 9, 0), new Date(2022, 13, 7, 11, 0)]
        }
    }
]
