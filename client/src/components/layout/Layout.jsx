import Navigation from './Navigation'
import Footer from './Footer'
import { Toaster } from '@/components/ui/sonner'

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navigation />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <Toaster
                position="bottom-right"
                expand={false}
                richColors
                closeButton
            />
        </div>
    )
}