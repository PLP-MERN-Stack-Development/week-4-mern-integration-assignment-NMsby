import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
    BookOpen,
    Twitter,
    Github,
    Linkedin,
    Mail,
    Heart,
    ArrowRight
} from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        company: [
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
        ],
        content: [
            { label: 'All Posts', href: '/posts' },
            { label: 'Categories', href: '/categories' },
            { label: 'Authors', href: '/authors' },
            { label: 'Archive', href: '/archive' },
        ],
        resources: [
            { label: 'Writing Guide', href: '/guide' },
            { label: 'Community', href: '/community' },
            { label: 'Support', href: '/support' },
            { label: 'API Docs', href: '/api-docs' },
        ],
    }

    const socialLinks = [
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-blue-400' },
        { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:text-gray-400' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-600' },
        { icon: Mail, href: 'mailto:hello@mernblog.dev', label: 'Email', color: 'hover:text-green-400' },
    ]

    const handleNewsletterSubmit = (e) => {
        e.preventDefault()
        // TODO: Implement newsletter subscription
        console.log('Newsletter subscription')
    }

    return (
        <footer className="bg-muted/30 border-t">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="py-12 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-1 space-y-6">
                            <Link to="/" className="flex items-center space-x-2 group">
                                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                                    <BookOpen className="w-5 h-5 text-primary-foreground" />
                                </div>
                                <span className="text-xl font-bold font-heading bg-gradient-primary bg-clip-text text-transparent">
                                  MERN Blog
                                </span>
                            </Link>

                            <p className="text-muted-foreground leading-relaxed max-w-sm">
                                A modern platform where developers share knowledge, insights, and stories.
                                Built with MongoDB, Express, React, and Node.js.
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center space-x-4">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon
                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-2 rounded-lg bg-background border border-border hover:border-primary/50 transition-all duration-200 ${social.color}`}
                                            aria-label={social.label}
                                        >
                                            <Icon className="w-4 h-4" />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {/* Company */}
                            <div>
                                <h3 className="font-bold font-heading text-foreground mb-4">Company</h3>
                                <ul className="space-y-3">
                                    {footerLinks.company.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                to={link.href}
                                                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="font-bold font-heading text-foreground mb-4">Content</h3>
                                <ul className="space-y-3">
                                    {footerLinks.content.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                to={link.href}
                                                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Resources */}
                            <div>
                                <h3 className="font-bold font-heading text-foreground mb-4">Resources</h3>
                                <ul className="space-y-3">
                                    {footerLinks.resources.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                to={link.href}
                                                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Newsletter Section */}
                        <div className="lg:col-span-1 space-y-6">
                            <div>
                                <h3 className="font-bold font-heading text-foreground mb-4">Stay Updated</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Get the latest posts and updates delivered to your inbox.
                                </p>
                            </div>

                            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-background border-border"
                                    required
                                />
                                <Button type="submit" className="w-full group">
                                    Subscribe
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                </Button>
                            </form>

                            <p className="text-xs text-muted-foreground">
                                By subscribing, you agree to our Privacy Policy and consent to receive updates from our team.
                            </p>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Bottom Section */}
                <div className="py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                            <span>© {currentYear} MERN Blog. Made with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                            <span>for developers everywhere.</span>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <span>Built with MongoDB, Express, React & Node.js</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}