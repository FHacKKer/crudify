'use client'

import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

interface FilterBarProps {
    onFilterChange: (value: string) => void
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
    return (
        <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search users..."
                onChange={(e) => onFilterChange(e.target.value)}
                className="pl-8"
            />
        </div>
    )
}

