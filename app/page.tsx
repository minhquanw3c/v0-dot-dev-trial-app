"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Heart, Loader2 } from "lucide-react"

interface Cat {
  id: string
  name: string
  age: string
  breed: string
  description: string
  imageUrl: string
  adopted?: boolean
}

export default function HomePage() {
  const [cats, setCats] = useState<Cat[]>([])
  const [loading, setLoading] = useState(true)
  const [adoptingId, setAdoptingId] = useState<string | null>(null)
  const { toast } = useToast()

  // Generate dummy cat data with real images
  const generateCats = async () => {
    const catNames = ["Whiskers", "Luna", "Oliver", "Bella", "Max", "Lucy", "Charlie", "Daisy", "Leo", "Chloe"]
    const breeds = [
      "Persian",
      "Siamese",
      "Maine Coon",
      "British Shorthair",
      "Ragdoll",
      "Bengal",
      "Russian Blue",
      "Abyssinian",
    ]
    const ages = ["2 months", "6 months", "1 year", "2 years", "3 years", "4 years", "5 years"]

    const generatedCats: Cat[] = []

    for (let i = 0; i < 8; i++) {
      const cat: Cat = {
        id: `cat-${i + 1}`,
        name: catNames[i % catNames.length],
        age: ages[Math.floor(Math.random() * ages.length)],
        breed: breeds[Math.floor(Math.random() * breeds.length)],
        description: "A lovely and playful cat looking for a forever home. Very friendly with children and other pets.",
        imageUrl: `https://cataas.com/cat?${i + Date.now()}`, // Add timestamp to avoid caching
      }
      generatedCats.push(cat)
    }

    return generatedCats
  }

  useEffect(() => {
    const loadCats = async () => {
      try {
        const generatedCats = await generateCats()
        setCats(generatedCats)
      } catch (error) {
        console.error("Error loading cats:", error)
        toast({
          title: "Error",
          description: "Failed to load cats. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadCats()
  }, [toast])

  const adoptCat = async (cat: Cat) => {
    setAdoptingId(cat.id)

    try {
      // Get existing adopted cats from localStorage
      const existingAdopted = JSON.parse(localStorage.getItem("adoptedCats") || "[]")

      // Check if cat is already adopted
      if (existingAdopted.some((adoptedCat: Cat) => adoptedCat.id === cat.id)) {
        toast({
          title: "Already Adopted",
          description: `${cat.name} is already in your adopted cats!`,
          variant: "destructive",
        })
        return
      }

      // Add cat to adopted list
      const updatedAdopted = [...existingAdopted, { ...cat, adopted: true }]
      localStorage.setItem("adoptedCats", JSON.stringify(updatedAdopted))

      toast({
        title: "Congratulations! 🎉",
        description: `You've successfully adopted ${cat.name}!`,
      })

      // Update the cat's adopted status in the current list
      setCats((prevCats) => prevCats.map((c) => (c.id === cat.id ? { ...c, adopted: true } : c)))
    } catch (error) {
      console.error("Error adopting cat:", error)
      toast({
        title: "Error",
        description: "Failed to adopt cat. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAdoptingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading adorable cats...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Companion</h1>
        <p className="text-lg text-muted-foreground">Browse our available cats and give them a loving home</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cats.map((cat) => (
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
                {cat.adopted && <Badge className="absolute top-2 right-2 bg-green-500">Adopted</Badge>}
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
              <Button
                onClick={() => adoptCat(cat)}
                disabled={cat.adopted || adoptingId === cat.id}
                className="w-full"
                variant={cat.adopted ? "secondary" : "default"}
              >
                {adoptingId === cat.id ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Adopting...
                  </>
                ) : cat.adopted ? (
                  <>
                    <Heart className="h-4 w-4 mr-2 fill-current" />
                    Adopted
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    Adopt
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
