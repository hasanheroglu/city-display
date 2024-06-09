import { PageRequest } from '../request/page.request'

export interface PaginatedResponse<T> {
    data: T[]
    pages: number
    current: PageRequest
    prev?: PageRequest
    next?: PageRequest
}
