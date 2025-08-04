import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Users, TrendingUp, PenTool } from 'lucide-react'

export default function Home() {
    const stats = [
        { icon: BookOpen, label: 'Articles Published', value: '250+', color: 'text-blue-600' },
        { icon: Users, label: 'Active Writers', value: '85+', color: 'text-green-600' },
        { icon: TrendingUp, label: 'Monthly Readers', value: '12K+', color: 'text-purple-600' },
    ]

    const featuredPosts = [
        {
            title: 'Getting Started with the MERN Stack',
            excerpt: 'Learn how to build full-stack applications with MongoDB, Express, React, and Node.js.',
            category: 'Tutorial',
            readTime: '8 min read',
            author: 'John Doe'
        },
        {
            title: 'Advanced React Patterns',
            excerpt: 'Explore compound components, render props, and other advanced React patterns.',
            category: 'React',
            readTime: '12 min read',
            author: 'Jane Smith'
        },
        {
            title: 'Database Design Best Practices',
            excerpt: 'Essential principles for designing scalable and efficient database schemas.',
            category: 'Database',
            readTime: '10 min read',
            author: 'Mike Johnson'
        }
    ]

    return (
        <div className="container mx-auto px-4 py-12 space-y-16">
            {/* Hero Section */}
            <section className="text-center space-y-8 py-12">
                <div className="max-w-4xl mx-auto space-y-6">
                    <Badge variant="secondary" className="mb-4">
                        Welcome to MERN Blog
                    </Badge>

                    <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight">
                        Share Your{' '}
                        <span className="bg-gradient-primary bg-clip-text text-transparent">
              Developer Journey
            </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A modern platform for developers to share knowledge, insights, and stories.
                        Built with the latest technologies and designed for the community.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link to="/posts">
                            <Button size="lg" className="group">
                                Explore Posts
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                            </Button>
                        </Link>

                        <Link to="/register">
                            <Button variant="outline" size="lg">
                                <PenTool className="w-4 h-4 mr-2" />
                                Start Writing
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <Card key={index} className="text-center border-border/50 hover:shadow-card transition-shadow duration-200">
                                <CardContent className="pt-6">
                                    <Icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                                    <div className="text-3xl font-bold font-heading mb-2">{stat.value}</div>
                                    <div className="text-muted-foreground">{stat.label}</div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </section>

            {/* Featured Posts */}
            <section className="space-y-8">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold font-heading">Featured Posts</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover the latest insights and tutorials from our community of developers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredPosts.map((post, index) => (
                        <Card key={index} className="group cursor-pointer hover:shadow-card transition-all duration-200 border-border/50">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="secondary">{post.category}</Badge>
                                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                                </div>
                                <CardTitle className="group-hover:text-primary transition-colors duration-200">
                                    {post.title}
                                </CardTitle>
                                <CardDescription>{post.excerpt}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">By {post.author}</span>
                                    <Button variant="ghost" size="sm" className="group-hover:text-primary">
                                        Read More →
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/posts">
                        <Button variant="outline" size="lg">
                            View All Posts
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <Card className="bg-gradient-subtle border-border/50">
                    <CardContent className="p-12 text-center">
                        <h2 className="text-3xl font-bold font-heading mb-4">
                            Ready to Share Your Story?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            Join our community of developers and start sharing your knowledge,
                            experiences, and insights with developers around the world.
                        </p>
                        <Link to="/register">
                            <Button size="lg" variant="hero">
                                <PenTool className="w-4 h-4 mr-2" />
                                Get Started Today
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}