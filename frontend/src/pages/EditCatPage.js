"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { ArrowLeft, Save, Loader2 } from "lucide-react"

const EditCatPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cat, setCat] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    description: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchCat()
  }, [id])

  const fetchCat = async () => {
    try {
      const response = await axios.get(`/api/cats/${id}`)
      const catData = response.data

      if (!catData.isAdopted) {
        toast.error("This cat has not been adopted yet.")
        navigate("/adopted")
        return
      }

      setCat(catData)
      setFormData({
        name: catData.name,
        age: catData.age,
        breed: catData.breed,
        description: catData.description,
      })
    } catch (error) {
      console.error("Error fetching cat:", error)
      toast.error("Cat not found.")
      navigate("/adopted")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error("Cat name is required.")
      return
    }

    setSaving(true)
    try {
      await axios.put(`/api/cats/${id}`, formData)
      toast.success(`${formData.name}'s information has been updated! ✅`)
      navigate("/adopted")
    } catch (error) {
      console.error("Error saving cat:", error)
      toast.error("Failed to save changes. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span>Loading cat information...</span>
      </div>
    )
  }

  if (!cat) {
    return (
      <div className="empty-state">
        <h1>Cat Not Found</h1>
        <p>The cat you're looking for doesn't exist or hasn't been adopted yet.</p>
        <Link to="/adopted" className="btn btn-primary">
          Back to My Cats
        </Link>
      </div>
    )
  }

  return (
    <div className="edit-container">
      <Link to="/adopted" className="back-link">
        <ArrowLeft size={16} />
        Back to My Cats
      </Link>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Edit Cat Information</h1>
      <p style={{ color: "#64748b", marginBottom: "2rem" }}>Update your cat's details</p>

      <div className="edit-grid">
        {/* Cat Image */}
        <div className="card">
          <div className="card-content">
            <h3 style={{ marginBottom: "1rem" }}>Current Photo</h3>
            <div style={{ position: "relative", height: "250px", borderRadius: "0.5rem", overflow: "hidden" }}>
              <img
                src={cat.imageUrl || "/placeholder.svg"}
                alt={cat.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                crossOrigin="anonymous"
              />
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="card">
          <div className="card-content">
            <h3 style={{ marginBottom: "1rem" }}>Cat Details</h3>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter cat's name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  className="form-input"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="e.g., 2 years"
                />
              </div>

              <div className="form-group">
                <label htmlFor="breed" className="form-label">
                  Breed
                </label>
                <input
                  type="text"
                  id="breed"
                  className="form-input"
                  value={formData.breed}
                  onChange={(e) => handleInputChange("breed", e.target.value)}
                  placeholder="Enter cat's breed"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-input form-textarea"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your cat's personality and traits"
                  rows={4}
                />
              </div>

              <button type="submit" disabled={saving || !formData.name.trim()} className="btn btn-primary btn-full">
                {saving ? (
                  <>
                    <Loader2 size={16} className="spinner" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCatPage
