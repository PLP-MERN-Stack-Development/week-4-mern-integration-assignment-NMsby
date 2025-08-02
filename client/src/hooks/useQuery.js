import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'

// Posts queries
export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: () => api.get('/posts').then(res => res.data)
    })
}

export const usePost = (id) => {
    return useQuery({
        queryKey: ['posts', id],
        queryFn: () => api.get(`/posts/${id}`).then(res => res.data),
        enabled: !!id
    })
}

// Categories queries
export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => api.get('/categories').then(res => res.data)
    })
}

// Mutations
export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (postData) => api.post('/posts', postData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, ...postData }) => api.put(`/posts/${id}`, postData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })
}

export const useDeletePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id) => api.delete(`/posts/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })
}