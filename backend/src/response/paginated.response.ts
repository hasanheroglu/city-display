import { PageRequest } from '../request/page.request'

export interface PaginatedResponse<T> {
    data: T[]
    current: PageRequest
    prev?: PageRequest
    next?: PageRequest
    pages: number
}
