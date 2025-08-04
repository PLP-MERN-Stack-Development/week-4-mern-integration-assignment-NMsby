import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@ui/button.jsx'
import { Input } from '@ui/input.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar.jsx'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@ui/dropdown-menu.jsx'
import { Badge } from '@ui/badge.jsx'
import {
    BookOpen,
    Search,
    Menu,
    X,
    PenTool,
    User,
    Settings,
    LogOut,
    Home,
    FileText,
    Tag,
    Bell
} from 'lucide-react'
import { useAuth } from '@context/AuthContext.jsx'

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const location = useLocation()
    const { user, isAuthenticated, logout } = useAuth()

    const navigation = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Posts', href: '/posts', icon: FileText },
        { name: 'Categories', href: '/categories', icon: Tag },
    ]

    const isActive = (path) => location.pathname === path

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            // TODO: Implement search functionality
            console.log('Searching for:', searchQuery)
        }
    }

    const handleLogout = () => {
        logout()
        setIsMenuOpen(false)
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                            <BookOpen className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold font-heading bg-gradient-primary bg-clip-text text-transparent">
              MERN Blog
            </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navigation.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                        isActive(item.href)
                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden lg:flex items-center">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-64 bg-muted/50 border-border/50 focus:bg-background transition-colors"
                            />
                        </form>
                    </div>

                    {/* Right Side - Auth & User Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Notifications - when authenticated */}
                        {isAuthenticated && (
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="w-4 h-4" />
                                <Badge
                                    variant="destructive"
                                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                                >
                                    3
                                </Badge>
                            </Button>
                        )}

                        {/* Create Post Button - when authenticated */}
                        {isAuthenticated && (
                            <Link to="/posts/create">
                                <Button variant="default" size="sm" className="hidden sm:flex">
                                    <PenTool className="w-4 h-4 mr-2" />
                                    Write
                                </Button>
                            </Link>
                        )}

                        {/* User Menu or Auth Buttons */}
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user?.avatar} alt={user?.name} />
                                            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user?.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link to="/profile" className="flex items-center">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/settings" className="flex items-center">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">
                                        Log in
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm">
                                        Sign up
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t bg-background/95 backdrop-blur">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {/* Search - Mobile */}
                            <form onSubmit={handleSearch} className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 w-full"
                                />
                            </form>

                            {/* Navigation Links - Mobile */}
                            {navigation.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                                            isActive(item.href)
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                        }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                )
                            })}

                            {/* Mobile Auth Actions */}
                            {isAuthenticated ? (
                                <div className="pt-4 border-t">
                                    <Link
                                        to="/posts/create"
                                        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <PenTool className="w-5 h-5" />
                                        <span>Write Post</span>
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <User className="w-5 h-5" />
                                        <span>Profile</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent w-full text-left"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Log out</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="pt-4 border-t space-y-2">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-start">
                                            Log in
                                        </Button>
                                    </Link>
                                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full justify-start">
                                            Sign up
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}