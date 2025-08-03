import { createContext, useContext, useState } from 'react'

const PostContext = createContext()

export const usePost = () => {
    const context = useContext(PostContext)
    if (!context) {
        throw new Error('usePost must be used within a PostProvider')
    }
    return context
}

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const addPost = (post) => {
        setPosts(prev => [post, ...prev])
    }

    const updatePost = (id, updatedPost) => {
        setPosts(prev => prev.map(post =>
            post._id === id ? { ...post, ...updatedPost } : post
        ))
    }

    const deletePost = (id) => {
        setPosts(prev => prev.filter(post => post._id !== id))
    }

    const value = {
        posts,
        setPosts,
        categories,
        setCategories,
        isLoading,
        setIsLoading,
        error,
        setError,
        addPost,
        updatePost,
        deletePost,
    }

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )
}