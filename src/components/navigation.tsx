'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Settings, Home } from 'lucide-react'

export function Navigation() {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <Home className="h-5 w-5" />
              Formulir Online
            </Link>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Formulir
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </nav>
        </div>
      </CardContent>
    </Card>
  )
}