import { cn } from '@/lib/utils'

export default function TestTailwind() {
    return (
        <div className="p-8 max-w-md mx-auto">
            <div className={cn(
                "bg-gradient-primary text-primary-foreground",
                "p-6 rounded-lg shadow-elegant",
                "hover:scale-105 transition-transform duration-300"
            )}>
                <h2 className="text-2xl font-heading font-bold mb-4">
                    Tailwind + shadcn/ui Test
                </h2>
                <p className="text-primary-foreground/90">
                    If you can see this styled card with hover effects,
                    Tailwind CSS is working perfectly!
                </p>
                <button className="btn-hero mt-4">
                    Test Button
                </button>
            </div>

            <div className="mt-6 space-y-2">
                <div className="w-full h-2 bg-muted rounded-full">
                    <div className="w-3/4 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                    Progress bar example
                </p>
            </div>
        </div>
    )
}