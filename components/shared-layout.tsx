import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cat, Heart, Home } from "lucide-react"

interface SharedLayoutProps {
  children: React.ReactNode
}

export default function SharedLayout({ children }: SharedLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <Cat className="h-6 w-6" />
              Cat Adoption Center
            </Link>
            <nav className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Link href="/adopted" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  My Cats
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-muted border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Cat Adoption Center. Made with ❤️ for our feline friends.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
