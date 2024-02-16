export interface APIResponse {
    suceess: boolean
    message: string
    data: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    type?: string
}
