export interface IPost {
    id: number
    title: string
    content: string
}

export interface ISection {
    id: string
    name: string
    hidden: boolean
}

export interface IPB {
    id: number
    name: string
    description: string
    path: string
}
