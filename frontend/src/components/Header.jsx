import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const { pathname } = useLocation()

  return (
    <header className="site-header">
      {pathname !== '/' && (
        <Link to="/" className="site-header-back">← Home</Link>
      )}
      <Link to="/" className="site-header-brand">Duitflow</Link>
    </header>
  )
}

export default Header
