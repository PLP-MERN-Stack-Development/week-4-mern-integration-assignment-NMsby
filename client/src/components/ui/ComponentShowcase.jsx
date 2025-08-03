import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./dropdown-menu"
import { Textarea } from "./textarea"
import { BookOpen, User, Settings, LogOut, Plus, Search } from "lucide-react"

export default function ComponentShowcase() {
    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">shadcn/ui Components</h1>
                <p className="text-muted-foreground">Testing our beautiful UI component library</p>
            </div>

            {/* Buttons Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Buttons</CardTitle>
                    <CardDescription>Various button styles and sizes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="hero">Hero</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                        <Button size="xl">Extra Large</Button>
                        <Button size="icon">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Form Components */}
            <Card>
                <CardHeader>
                    <CardTitle>Form Components</CardTitle>
                    <CardDescription>Input fields and form elements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Email" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="message">Message</Label>
                        <Textarea placeholder="Type your message here." id="message" />
                    </div>
                </CardContent>
            </Card>

            {/* Badges */}
            <Card>
                <CardHeader>
                    <CardTitle>Badges</CardTitle>
                    <CardDescription>Status indicators and labels</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Avatar and Dropdown */}
            <Card>
                <CardHeader>
                    <CardTitle>Avatar & Dropdown</CardTitle>
                    <CardDescription>User interface elements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <User className="mr-2 h-4 w-4" />
                                User Menu
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardContent>
            </Card>

            {/* Cards Example */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Blog Post</CardTitle>
                        <CardDescription>Latest updates from our blog</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            This is a sample blog post card demonstrating how our card component works with content.
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Badge variant="secondary">Technology</Badge>
                        <Button size="sm">Read More</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Search</CardTitle>
                        <CardDescription>Find what you're looking for</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex w-full items-center space-x-2">
                            <Input placeholder="Search posts..." />
                            <Button size="icon">
                                <Search className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Frequently used actions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button className="w-full" variant="outline">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Create Post
                        </Button>
                        <Button className="w-full" variant="outline">
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}