export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to MERN Blog</h1>
                <p className="text-lg text-muted-foreground mb-8">
                    A modern blog platform built with React, Node.js, Express, and MongoDB
                </p>
                <div className="bg-card p-6 rounded-lg shadow-card">
                    <p className="text-sm text-muted-foreground">
                        This is the home page. More content will be added soon!
                    </p>
                </div>
            </div>
        </div>
    )
}