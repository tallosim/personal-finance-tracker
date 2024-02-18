export interface APIError {
    success: false
    message: string
    type: string
    data: Record<string, never>
}

export interface APIResponse<T> {
    success: true
    message: string
    data: T
}
