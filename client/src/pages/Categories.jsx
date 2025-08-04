import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Code, Database, Globe, Smartphone, Cpu } from 'lucide-react'

export default function Categories() {
    const categories = [
        {
            name: 'Frontend',
            description: 'React, Vue, Angular, and modern frontend technologies',
            icon: Globe,
            count: 45,
            color: 'bg-blue-500/10 text-blue-700 border-blue-200'
        },
        {
            name: 'Backend',
            description: 'Node.js, Express, APIs, and server-side development',
            icon: Code,
            count: 32,
            color: 'bg-green-500/10 text-green-700 border-green-200'
        },
        {
            name: 'Database',
            description: 'MongoDB, PostgreSQL, and database design',
            icon: Database,
            count: 28,
            color: 'bg-purple-500/10 text-purple-700 border-purple-200'
        },
        {
            name: 'Mobile',
            description: 'React Native, Flutter, and mobile app development',
            icon: Smartphone,
            count: 19,
            color: 'bg-orange-500/10 text-orange-700 border-orange-200'
        },
        {
            name: 'DevOps',
            description: 'Docker, AWS, deployment, and infrastructure',
            icon: Cpu,
            count: 23,
            color: 'bg-red-500/10 text-red-700 border-red-200'
        },
        {
            name: 'Tutorial',
            description: 'Step-by-step guides and learning resources',
            icon: BookOpen,
            count: 67,
            color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200'
        }
    ]

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-heading mb-4">Categories</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Explore posts organized by topics and technologies. Find exactly what you're looking for.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => {
                    const Icon = category.icon
                    return (
                        <Card key={category.name} className="group cursor-pointer hover:shadow-card transition-all duration-200 border-border/50">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className={`p-3 rounded-lg ${category.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <Badge variant="secondary">{category.count} posts</Badge>
                                </div>
                                <CardTitle className="group-hover:text-primary transition-colors duration-200">
                                    {category.name}
                                </CardTitle>
                                <CardDescription>{category.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="ghost" className="w-full group-hover:bg-accent">
                                    View Posts →
                                </Button>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}