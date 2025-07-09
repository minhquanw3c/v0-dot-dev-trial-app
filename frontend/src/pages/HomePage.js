"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Heart, Loader2 } from "lucide-react"

const HomePage = () => {
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)
  const [adoptingId, setAdoptingId] = useState(null)

  useEffect(() => {
    fetchCats()
  }, [])

  const fetchCats = async () => {
    try {
      const response = await axios.get("/api/cats")
      setCats(response.data)
    } catch (error) {
      console.error("Error fetching cats:", error)
      toast.error("Failed to load cats. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const adoptCat = async (cat) => {
    setAdoptingId(cat._id)
    try {
      await axios.post(`/api/cats/${cat._id}/adopt`, {
        adoptedBy: "Current User",
      })

      toast.success(`Congratulations! You've successfully adopted ${cat.name}! 🎉`)

      // Update the cat's adopted status in the current list
      setCats((prevCats) => prevCats.map((c) => (c._id === cat._id ? { ...c, isAdopted: true } : c)))
    } catch (error) {
      console.error("Error adopting cat:", error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Failed to adopt cat. Please try again.")
      }
    } finally {
      setAdoptingId(null)
    }
  }

  const seedDatabase = async () => {
    try {
      await axios.post("/api/seed")
      toast.success("Database seeded with new cats!")
      fetchCats()
    } catch (error) {
      console.error("Error seeding database:", error)
      toast.error("Failed to seed database.")
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span>Loading adorable cats...</span>
      </div>
    )
  }

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Find Your Perfect Companion</h1>
        <p style={{ fontSize: "1.125rem", color: "#64748b", marginBottom: "1rem" }}>
          Browse our available cats and give them a loving home
        </p>
        <button onClick={seedDatabase} className="btn btn-outline">
          Refresh Cats Database
        </button>
      </div>

      {cats.length === 0 ? (
        <div className="empty-state">
          <h2>No cats available</h2>
          <p>Click "Refresh Cats Database" to load some adorable cats!</p>
        </div>
      ) : (
        <div className="card-grid">
          {cats.map((cat) => (
            <div key={cat._id} className="card">
              <div style={{ position: "relative" }}>
                <img
                  src={cat.imageUrl || "/placeholder.svg"}
                  alt={cat.name}
                  className="card-image"
                  crossOrigin="anonymous"
                />
                {cat.isAdopted && (
                  <div className="badge">
                    <Heart size={12} fill="currentColor" />
                    Adopted
                  </div>
                )}
              </div>
              <div className="card-content">
                <h3 className="card-title">{cat.name}</h3>
                <div className="card-details">
                  <p>
                    <strong>Age:</strong> {cat.age}
                  </p>
                  <p>
                    <strong>Breed:</strong> {cat.breed}
                  </p>
                </div>
                <p className="card-description">{cat.description}</p>
                <button
                  onClick={() => adoptCat(cat)}
                  disabled={cat.isAdopted || adoptingId === cat._id}
                  className={`btn btn-full ${cat.isAdopted ? "btn-secondary" : "btn-primary"}`}
                >
                  {adoptingId === cat._id ? (
                    <>
                      <Loader2 size={16} className="spinner" />
                      Adopting...
                    </>
                  ) : cat.isAdopted ? (
                    <>
                      <Heart size={16} fill="currentColor" />
                      Adopted
                    </>
                  ) : (
                    <>
                      <Heart size={16} />
                      Adopt
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
