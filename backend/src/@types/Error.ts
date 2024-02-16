interface APIErrorInterface {
    status: number
    message: string
    type: string
}

export class APIError implements APIErrorInterface {
    status: number
    message: string
    type: string

    constructor(status: number, message: string, type: string) {
        this.status = status
        this.message = message
        this.type = type
    }
}
