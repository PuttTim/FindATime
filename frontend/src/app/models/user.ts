enum USER_TIER {
    FREE = 'Free',
    PREMIUM = 'Premium'
}

interface User {
    id: number
    username: string
    email: string
    password: string
    profilePicture?: any
    tier: USER_TIER
}

export { User, USER_TIER }
