import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import AdoptedCatsPage from "./pages/AdoptedCatsPage"
import EditCatPage from "./pages/EditCatPage"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/adopted" element={<AdoptedCatsPage />} />
            <Route path="/edit/:id" element={<EditCatPage />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
