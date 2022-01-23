export interface Form {
    id: string
    agenda: string
    duration: number
    order: number
    created_at: Date
    updated_at?: Date
}
export interface Forms {
    [key: string]: Form
}
