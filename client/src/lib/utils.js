import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

/**
 * Format date to readable string
 */
export function formatDate(date) {
    if (!date) return ""

    const d = new Date(date)
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

/**
 * Format date to relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date) {
    if (!date) return ""

    const now = new Date()
    const d = new Date(date)
    const diffInSeconds = Math.floor((now - d) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`

    return formatDate(date)
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, length = 100) {
    if (!text || text.length <= length) return text
    return text.substring(0, length).trim() + "..."
}

/**
 * Generate slug from title
 */
export function generateSlug(title) {
    if (!title) return ""

    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Calculate reading time estimate
 */
export function calculateReadingTime(content) {
    if (!content) return 0

    const wordsPerMinute = 200
    const wordCount = content.trim().split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Generate avatar URL from name (using initials)
 */
export function generateAvatarUrl(name, size = 40) {
    if (!name) return `https://ui-avatars.com/api/?size=${size}&background=random`

    const initials = name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return `https://ui-avatars.com/api/?name=${initials}&size=${size}&background=6366f1&color=ffffff`
}