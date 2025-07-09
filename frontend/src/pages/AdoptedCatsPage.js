"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { Edit, Heart } from "lucide-react"

const AdoptedCatsPage = () => {
  const [adoptedCats, setAdoptedCats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdoptedCats()
  }, [])

  const fetchAdoptedCats = async () => {
    try {
      const response = await axios.get("/api/cats/adopted")
      setAdoptedCats(response.data)
    } catch (error) {
      console.error("Error fetching adopted cats:", error)
      toast.error("Failed to load adopted cats.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span>Loading your cats...</span>
      </div>
    )
  }

  if (adoptedCats.length === 0) {
    return (
      <div className="empty-state">
        <Heart size={64} color="#64748b" style={{ margin: "0 auto 1rem" }} />
        <h1>No Adopted Cats Yet</h1>
        <p>You haven't adopted any cats yet. Visit our home page to find your perfect companion!</p>
        <Link to="/" className="btn btn-primary">
          Browse Available Cats
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>My Adopted Cats</h1>
        <p style={{ fontSize: "1.125rem", color: "#64748b", marginBottom: "1rem" }}>
          Your beloved feline family members
        </p>
        <div className="badge" style={{ position: "static", display: "inline-flex" }}>
          {adoptedCats.length} {adoptedCats.length === 1 ? "Cat" : "Cats"} Adopted
        </div>
      </div>

      <div className="card-grid">
        {adoptedCats.map((cat) => (
          <div key={cat._id} className="card">
            <div style={{ position: "relative" }}>
              <img
                src={cat.imageUrl || "/placeholder.svg"}
                alt={cat.name}
                className="card-image"
                crossOrigin="anonymous"
              />
              <div className="badge">
                <Heart size={12} fill="currentColor" />
                Adopted
              </div>
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
              <Link to={`/edit/${cat._id}`} className="btn btn-outline btn-full">
                <Edit size={16} />
                Edit Cat
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdoptedCatsPage
