import {User} from "@/types/type.ts";
import {useState} from "react";
import {FilterBar} from "@/components/dashboard-components/filter-bar";
import {BulkActions} from "@/components/dashboard-components/bulk-actions";
import {UserTable} from "@/components/dashboard-components/user-table";
import {Button } from "@/components/ui/button";
import {Plus} from "lucide-react";
import {AddUserDialog} from "@/components/dashboard-components/add-user-dialog.tsx";
import {RoleRequestDialog} from "@/components/dashboard-components/role-request-dialog.tsx";

// Sample data - replace with your actual data fetching logic
const sampleUsers: User[] = [
    {
        id: '1',
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        role: 'admin',
        isActive: true,
        createdAt: '2024-01-14T12:00:00Z',
    },
    {
        id: '2',
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane@example.com',
        role: 'user',
        isActive: true,
        createdAt: '2024-01-13T12:00:00Z',
    }
]

const DashboardPage = () => {

    const user:User = {
        name:"Faisal Shahzad",
        username:"faisal_ranjha",
        email:"faisal@ranjha.com",
        role:"user",
        id:"dsadasd12asd",
        createdAt: new Date().toISOString(),
        isActive:true
    }

    const [users, setUsers] = useState<User[]>(sampleUsers)
    const [filteredUsers, setFilteredUsers] = useState<User[]>(sampleUsers)
    const [showRoleDialog, setShowRoleDialog] = useState(false)
    const [showAddDialog, setShowAddDialog] = useState(false)

    const hasAdminPrivileges = (): boolean => user.role === "admin";

    const handleFilter = (searchTerm: string) => {
        const filtered = users.filter((user) =>
            Object.values(user).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredUsers(filtered)
    }

    const handleBulkDelete = () => {
        if (!hasAdminPrivileges()) {
            // Handle insufficient permissions
            return
        }
        // Handle bulk delete
    }

    const handleBulkActivate = () => {
        if (!hasAdminPrivileges()) {
            // Handle insufficient permissions
            return
        }
        // Handle bulk activate
    }

    const handleBulkDeactivate = () => {
        if (!hasAdminPrivileges()) {
            // Handle insufficient permissions
            return
        }
        // Handle bulk deactivate
    }

    const handleAddUser = (userData: {
        name: string
        username: string
        email: string
        password: string
        roles: string[]
    }) => {
        if (user.role !== 'admin') {
            setShowRoleDialog(true)
            return
        }

        // Here you would typically make an API call to create the user
        const newUser: User = {
            id: String(users.length + 1),
            name: userData.name,
            username: userData.username,
            email: userData.email,
            role: userData.roles.includes('admin') ? 'admin' : 'user',
            isActive: true,
            createdAt: new Date().toISOString(),
        }

        setUsers((prev) => [...prev, newUser])
        setFilteredUsers((prev) => [...prev, newUser])
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-8 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <Button onClick={() => setShowAddDialog(true)}>
                        <Plus className="mr-2 h-4 w-4"/> Add User
                    </Button>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="w-full md:w-96">
                        <FilterBar onFilterChange={handleFilter}/>
                    </div>
                    <BulkActions
                        selectedCount={0}
                        onDelete={handleBulkDelete}
                        onActivate={handleBulkActivate}
                        onDeactivate={handleBulkDeactivate}
                    />
                </div>
            </div>

            <UserTable users={filteredUsers} currentUserRole={user.role}/>

            <AddUserDialog
                isOpen={showAddDialog}
                onClose={() => setShowAddDialog(false)}
                onSubmit={handleAddUser}
            />

            <RoleRequestDialog
                isOpen={showRoleDialog}
                onClose={() => setShowRoleDialog(false)}
                onRequest={() => {
                    console.log('Requesting admin role')
                    setShowRoleDialog(false)
                }}
            />
        </div>
    );
};

export default DashboardPage;