import { Link } from "react-router-dom"
import { Cat, Heart, Home } from "lucide-react"

const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <Cat size={24} />
              Cat Adoption Center
            </Link>
            <nav className="nav">
              <Link to="/" className="nav-link">
                <Home size={16} />
                Home
              </Link>
              <Link to="/adopted" className="nav-link">
                <Heart size={16} />
                My Cats
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">{children}</div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Cat Adoption Center. Made with ❤️ for our feline friends.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
