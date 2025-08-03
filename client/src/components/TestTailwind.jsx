import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function TestTailwind() {
    return (
        <div className="container mx-auto p-8">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-heading font-bold">
                        shadcn/ui + Tailwind Test
                    </CardTitle>
                    <CardDescription>
                        Professional UI components with beautiful styling
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        If you can see this styled card with components,
                        everything is working perfectly!
                    </p>

                    <div className="flex gap-2">
                        <Button variant="hero">Hero Button</Button>
                        <Button variant="outline">Outline</Button>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="success">Success</Badge>
                    </div>

                    <div className="w-full h-2 bg-muted rounded-full">
                        <div className="w-3/4 h-2 bg-gradient-primary rounded-full"></div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}