'use client'

import {useState} from 'react'
import {MoreHorizontal, Pencil, Trash, UserCog} from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'
import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {Badge} from '@/components/ui/badge'
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area'
import {RoleRequestDialog} from './role-request-dialog'
import type {UserTableProps} from '@/types/type'

export function UserTable({ users, currentUserRole }: UserTableProps) {
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
    const [showRoleDialog, setShowRoleDialog] = useState(false)

    const handleSelectAll = () => {
        if (selectedUsers.size === users.length) {
            setSelectedUsers(new Set())
        } else {
            setSelectedUsers(new Set(users.map((user) => user.id)))
        }
    }

    const handleSelectUser = (userId: string) => {
        const newSelected = new Set(selectedUsers)
        if (newSelected.has(userId)) {
            newSelected.delete(userId)
        } else {
            newSelected.add(userId)
        }
        setSelectedUsers(newSelected)
    }

    const handleAction = (action: 'edit' | 'delete' | 'toggle-status') => {
        if (currentUserRole !== 'admin') {
            setShowRoleDialog(true)
            return
        }
        // Handle admin actions here
        console.log(`Performing ${action}`)
    }

    const handleRoleRequest = () => {
        console.log('Requesting admin role')
        setShowRoleDialog(false)
    }

    return (
        <div className="relative rounded-md border">
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                <div className="relative w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="sticky left-0 bg-background w-[50px]">
                                    <Checkbox
                                        checked={selectedUsers.size === users.length}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </TableHead>
                                <TableHead className="sticky left-[50px] bg-background min-w-[200px] text-center">Name</TableHead>
                                <TableHead className="min-w-[150px] text-center">Username</TableHead>
                                <TableHead className="min-w-[200px] text-center">Email</TableHead>
                                <TableHead className="min-w-[100px] ">Role</TableHead>
                                <TableHead className="min-w-[100px]">Status</TableHead>
                                <TableHead className="min-w-[150px] text-center">Created At</TableHead>
                                <TableHead className="sticky right-0 bg-background w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="sticky left-0 bg-background">
                                        <Checkbox
                                            checked={selectedUsers.has(user.id)}
                                            onCheckedChange={() => handleSelectUser(user.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="sticky left-[50px] bg-background font-medium text-center">
                                        {user.name}
                                    </TableCell>
                                    <TableCell className={`text-center`}>{user.username}</TableCell>
                                    <TableCell className={`text-center`}>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.role === 'admin' ? 'default' : 'secondary'}
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.isActive ? 'default' : 'destructive'}
                                        >
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={`text-center`}>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="sticky right-0 bg-background">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Open menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleAction('edit')}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit user
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleAction('toggle-status')}
                                                >
                                                    <UserCog className="mr-2 h-4 w-4" />
                                                    Toggle status
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleAction('delete')}
                                                    className="text-red-600"
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Delete user
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </div>
            </ScrollArea>

            <RoleRequestDialog
                isOpen={showRoleDialog}
                onClose={() => setShowRoleDialog(false)}
                onRequest={handleRoleRequest}
            />
        </div>
    )
}

