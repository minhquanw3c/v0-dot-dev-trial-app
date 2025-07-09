"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Edit, Heart } from "lucide-react"

interface Cat {
  id: string
  name: string
  age: string
  breed: string
  description: string
  imageUrl: string
  adopted?: boolean
}

export default function AdoptedCatsPage() {
  const [adoptedCats, setAdoptedCats] = useState<Cat[]>([])

  useEffect(() => {
    // Load adopted cats from localStorage
    const stored = localStorage.getItem("adoptedCats")
    if (stored) {
      setAdoptedCats(JSON.parse(stored))
    }
  }, [])

  if (adoptedCats.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-4">No Adopted Cats Yet</h1>
        <p className="text-lg text-muted-foreground mb-6">
          You haven't adopted any cats yet. Visit our home page to find your perfect companion!
        </p>
        <Button asChild>
          <Link href="/">Browse Available Cats</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">My Adopted Cats</h1>
        <p className="text-lg text-muted-foreground">Your beloved feline family members</p>
        <Badge variant="secondary" className="mt-2">
          {adoptedCats.length} {adoptedCats.length === 1 ? "Cat" : "Cats"} Adopted
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {adoptedCats.map((cat) => (
          <Card key={cat.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={cat.imageUrl || "/placeholder.svg"}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
                <Badge className="absolute top-2 right-2 bg-green-500">
                  <Heart className="h-3 w-3 mr-1 fill-current" />
                  Adopted
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="mb-2">{cat.name}</CardTitle>
              <div className="space-y-1 text-sm text-muted-foreground mb-3">
                <p>
                  <strong>Age:</strong> {cat.age}
                </p>
                <p>
                  <strong>Breed:</strong> {cat.breed}
                </p>
              </div>
              <p className="text-sm">{cat.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full bg-transparent" variant="outline">
                <Link href={`/edit/${cat.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Cat
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
