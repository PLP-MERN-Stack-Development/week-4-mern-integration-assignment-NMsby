import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import layout
import Layout from './components/layout/Layout'

// Import pages
import Home from './pages/Home'
import Posts from './pages/Posts'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Categories from './pages/Categories'
import TestTailwind from './pages/TestTailwind'
import ComponentShowcase from './pages/ComponentShowcase'

// Import context providers
import { AuthProvider } from './context/AuthContext'
import { PostProvider } from './context/PostContext'

function App() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate app initialization
        const initializeApp = async () => {
            try {
                // Check if user is logged in
                const token = localStorage.getItem('token')
                if (token) {
                    console.log('User token found')
                }
            } catch (error) {
                console.error('App initialization error:', error)
            } finally {
                setIsLoading(false)
            }
        }

        initializeApp()
    }, [])

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">Loading...</div>
            </div>
        )
    }

    return (
        <AuthProvider>
            <PostProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/posts" element={<Posts />} />
                            <Route path="/posts/create" element={<CreatePost />} />
                            <Route path="/posts/:id" element={<PostDetail />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/categories" element={<Categories />} />
                            <Route path="/test" element={<TestTailwind />} />
                            <Route path="/showcase" element={<ComponentShowcase />} />
                        </Routes>
                    </Layout>
                </Router>
            </PostProvider>
        </AuthProvider>
    )
}

export default App