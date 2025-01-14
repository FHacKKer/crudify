'use client'

import { Trash, UserCheck, UserX } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BulkActionsProps {
    selectedCount: number
    onDelete: () => void
    onActivate: () => void
    onDeactivate: () => void
}

export function BulkActions({
    selectedCount,
    onDelete,
    onActivate,
    onDeactivate,
}: BulkActionsProps) {
    return (
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="w-full sm:w-auto mb-2 sm:mb-0">
        <span className="text-sm text-muted-foreground">
          {selectedCount} users selected
        </span>
            </div>
            <div className="flex flex-wrap gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onActivate}
                    disabled={selectedCount === 0}
                >
                    <UserCheck className="mr-2 h-4 w-4" />
                    Activate
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onDeactivate}
                    disabled={selectedCount === 0}
                >
                    <UserX className="mr-2 h-4 w-4" />
                    Deactivate
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={onDelete}
                    disabled={selectedCount === 0}
                >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </Button>
            </div>
        </div>
    )
}

