const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/cat-adoption", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
  console.log("Connected to MongoDB")
})

// Cat Schema
const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  breed: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isAdopted: { type: Boolean, default: false },
  adoptedBy: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
})

const Cat = mongoose.model("Cat", catSchema)

// Routes

// Get all available cats
app.get("/api/cats", async (req, res) => {
  try {
    const cats = await Cat.find()
    res.json(cats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get adopted cats
app.get("/api/cats/adopted", async (req, res) => {
  try {
    const adoptedCats = await Cat.find({ isAdopted: true })
    res.json(adoptedCats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single cat by ID
app.get("/api/cats/:id", async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id)
    if (!cat) {
      return res.status(404).json({ message: "Cat not found" })
    }
    res.json(cat)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Adopt a cat
app.post("/api/cats/:id/adopt", async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id)
    if (!cat) {
      return res.status(404).json({ message: "Cat not found" })
    }
    if (cat.isAdopted) {
      return res.status(400).json({ message: "Cat is already adopted" })
    }

    cat.isAdopted = true
    cat.adoptedBy = req.body.adoptedBy || "Anonymous"
    await cat.save()

    res.json({ message: "Cat adopted successfully", cat })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update cat information
app.put("/api/cats/:id", async (req, res) => {
  try {
    const { name, age, breed, description } = req.body
    const cat = await Cat.findByIdAndUpdate(
      req.params.id,
      { name, age, breed, description },
      { new: true, runValidators: true },
    )

    if (!cat) {
      return res.status(404).json({ message: "Cat not found" })
    }

    res.json({ message: "Cat updated successfully", cat })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Seed database with initial cats
app.post("/api/seed", async (req, res) => {
  try {
    await Cat.deleteMany({}) // Clear existing cats

    const catNames = ["Whiskers", "Luna", "Oliver", "Bella", "Max", "Lucy", "Charlie", "Daisy"]
    const breeds = ["Persian", "Siamese", "Maine Coon", "British Shorthair", "Ragdoll", "Bengal"]
    const ages = ["2 months", "6 months", "1 year", "2 years", "3 years"]

    const cats = []
    for (let i = 0; i < 8; i++) {
      cats.push({
        name: catNames[i],
        age: ages[Math.floor(Math.random() * ages.length)],
        breed: breeds[Math.floor(Math.random() * breeds.length)],
        description: "A lovely and playful cat looking for a forever home. Very friendly with children and other pets.",
        imageUrl: `https://cataas.com/cat?${i + Date.now()}`,
      })
    }

    await Cat.insertMany(cats)
    res.json({ message: "Database seeded successfully", count: cats.length })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
