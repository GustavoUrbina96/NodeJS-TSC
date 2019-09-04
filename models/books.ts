import { Author } from "./author";

export interface Book {
    id: string,
    name: string,
    author: Author,
    totalPAges: number
}