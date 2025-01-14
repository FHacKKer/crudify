import {LogIn, UserPlus} from 'lucide-react'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'
import {Link} from "react-router-dom";

interface AuthRequiredDialogProps {
    isOpen: boolean
}

export function AuthRequiredDialog({ isOpen }: AuthRequiredDialogProps) {

    return (
        <Dialog open={isOpen} onOpenChange={() => {}}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Authentication Required</DialogTitle>
                    <DialogDescription>
                        Please sign in or create an account to access the dashboard.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    <Button
                        className="flex-1 "
                    >
                        <Link to={"/login"} className={`flex items-center justify-center`}>
                            <LogIn className="mr-2 h-4 w-4" />
                            Sign In
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1"
                    >
                        <Link to={"/register"} className={`flex items-center justify-center`}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Create Account
                        </Link>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
