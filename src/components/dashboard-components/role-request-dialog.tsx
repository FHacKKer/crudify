'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface RoleRequestDialogProps {
    isOpen: boolean
    onClose: () => void
    onRequest: () => void
}

export function RoleRequestDialog({
                                      isOpen,
                                      onClose,
                                      onRequest,
                                  }: RoleRequestDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Insufficient Permissions</DialogTitle>
                    <DialogDescription>
                        You need administrator privileges to perform this action. Would you like
                        to request admin access?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={onRequest}>Request Admin Access</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

