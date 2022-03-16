import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './Pages/Home'

const App: React.FC = () => {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </Layout>
  )
}

export default App
