export interface APIResponse {
    success: boolean
    message: string
    data: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    type?: string
}
