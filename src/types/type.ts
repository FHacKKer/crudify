export type UserRoles = 'admin' | 'moderator' | 'user'

export interface User {
    id: string
    name: string
    username: string
    email: string
    role: UserRoles
    isActive: boolean
    createdAt: string
}

export interface UserTableProps {
    users: User[]
    currentUserRole: UserRoles
}

