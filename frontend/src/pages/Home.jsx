import { Link } from 'react-router-dom'
import '../App.css'

function Home() {
  return (
    <section className="home-page text-center">
      <h1 className="mb-3">Duitflow</h1>
      <p className="mb-4">Continuous execution flow: organize less, conclude more.</p>
      <Link to="/tasks" className="btn-primary">
        View tasks
      </Link>
    </section>
  )
}

export default Home
