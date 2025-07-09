"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Save, Loader2 } from "lucide-react"

interface Cat {
  id: string
  name: string
  age: string
  breed: string
  description: string
  imageUrl: string
  adopted?: boolean
}

export default function EditCatPage({ params }: { params: { id: string } }) {
  const [cat, setCat] = useState<Cat | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    description: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Load the specific cat from localStorage
    const stored = localStorage.getItem("adoptedCats")
    if (stored) {
      const adoptedCats: Cat[] = JSON.parse(stored)
      const foundCat = adoptedCats.find((c) => c.id === params.id)

      if (foundCat) {
        setCat(foundCat)
        setFormData({
          name: foundCat.name,
          age: foundCat.age,
          breed: foundCat.breed,
          description: foundCat.description,
        })
      } else {
        toast({
          title: "Cat Not Found",
          description: "The cat you're trying to edit was not found.",
          variant: "destructive",
        })
        router.push("/adopted")
      }
    } else {
      router.push("/adopted")
    }
    setLoading(false)
  }, [params.id, router, toast])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    if (!cat) return

    setSaving(true)

    try {
      // Get current adopted cats
      const stored = localStorage.getItem("adoptedCats")
      if (stored) {
        const adoptedCats: Cat[] = JSON.parse(stored)

        // Update the specific cat
        const updatedCats = adoptedCats.map((c) => (c.id === cat.id ? { ...c, ...formData } : c))

        // Save back to localStorage
        localStorage.setItem("adoptedCats", JSON.stringify(updatedCats))

        toast({
          title: "Success! ✅",
          description: `${formData.name}'s information has been updated.`,
        })

        // Navigate back to adopted cats page
        router.push("/adopted")
      }
    } catch (error) {
      console.error("Error saving cat:", error)
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading cat information...</span>
      </div>
    )
  }

  if (!cat) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Cat Not Found</h1>
        <p className="text-lg text-muted-foreground mb-6">
          The cat you're looking for doesn't exist or hasn't been adopted yet.
        </p>
        <Button asChild>
          <Link href="/adopted">Back to My Cats</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/adopted">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Cats
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Cat Information</h1>
        <p className="text-muted-foreground">Update your cat's details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Cat Image */}
        <Card>
          <CardHeader>
            <CardTitle>Current Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <Image
                src={cat.imageUrl || "/placeholder.svg"}
                alt={cat.name}
                fill
                className="object-cover"
                crossOrigin="anonymous"
              />
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Cat Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter cat's name"
              />
            </div>

            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="e.g., 2 years"
              />
            </div>

            <div>
              <Label htmlFor="breed">Breed</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) => handleInputChange("breed", e.target.value)}
                placeholder="Enter cat's breed"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your cat's personality and traits"
                rows={4}
              />
            </div>

            <Button onClick={handleSave} disabled={saving || !formData.name.trim()} className="w-full">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
