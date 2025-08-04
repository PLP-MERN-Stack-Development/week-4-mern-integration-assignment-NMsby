import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check for existing token on app load
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')

        if (token && userData) {
            try {
                const parsedUser = JSON.parse(userData)
                setUser(parsedUser)
                setIsAuthenticated(true)
            } catch (error) {
                console.error('Error parsing user data:', error)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
        }

        setIsLoading(false)
    }, [])

    const login = async (email, password) => {
        try {
            // Simulate API call
            console.log('Logging in:', { email, password })

            // Mock user data
            const mockUser = {
                id: '1',
                name: 'John Doe',
                email: email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('John Doe')}&background=6366f1&color=fff`
            }

            const mockToken = 'mock-jwt-token-' + Date.now()

            // Store in localStorage
            localStorage.setItem('token', mockToken)
            localStorage.setItem('user', JSON.stringify(mockUser))

            setUser(mockUser)
            setIsAuthenticated(true)

            return { success: true, user: mockUser }
        } catch (error) {
            console.error('Login error:', error)
            return { success: false, error: 'Login failed' }
        }
    }

    const register = async (name, email, password) => {
        try {
            // Simulate API call
            console.log('Registering:', { name, email, password })

            // Mock user data
            const mockUser = {
                id: '1',
                name: name,
                email: email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`
            }

            const mockToken = 'mock-jwt-token-' + Date.now()

            // Store in localStorage
            localStorage.setItem('token', mockToken)
            localStorage.setItem('user', JSON.stringify(mockUser))

            setUser(mockUser)
            setIsAuthenticated(true)

            return { success: true, user: mockUser }
        } catch (error) {
            console.error('Registration error:', error)
            return { success: false, error: 'Registration failed' }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setIsAuthenticated(false)
    }

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}