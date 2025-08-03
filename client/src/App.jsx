import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import components (we'll create these in Phase 3)
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Posts from './pages/Posts'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import Login from './pages/Login'
import Register from './pages/Register'

// Import context providers
import { AuthProvider } from './context/AuthContext'
import { PostProvider } from './context/PostContext'
import TestTailwind from "@components/TestTailwind.jsx";

function App() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate app initialization
        const initializeApp = async () => {
            try {
                // Check if user is logged in
                const token = localStorage.getItem('token')
                if (token) {
                    // Verify token validity (we'll implement this later)
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
            <TestTailwind />
            <PostProvider>
                <Router>
                    <div className="app">
                        <Navbar />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/posts" element={<Posts />} />
                                <Route path="/posts/create" element={<CreatePost />} />
                                <Route path="/posts/:id" element={<PostDetail />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Routes>
                        </main>
                    </div>
                </Router>
            </PostProvider>
        </AuthProvider>
    )
}

export default App