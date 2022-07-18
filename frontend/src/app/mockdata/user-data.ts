import { User, USER_TIER } from '../models/user'

export const UserData: User[] = [
    {
        id: 1,
        username: 'Putt',
        email: 'putt@email.com',
        password: 'password',
        tier: USER_TIER.FREE
    },
    {
        id: 2,
        username: 'User 2',
        email: 'randomuser@email.com',
        password: 'password',
        tier: USER_TIER.FREE
    }
]
