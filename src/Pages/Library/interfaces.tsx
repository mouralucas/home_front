import DateTime from "../../Utils/DateTime";


export interface Item {
    itemId?: string
    lastStatusId: string
    lastStatusDate: Date
    mainAuthorId: number
    authorsId?: number[]
    translatorId?: number
    title: string
    subtitle?: string
    titleOriginal?: string
    subtitleOriginal?: string
    isbnFormatted?: string
    isbn10Formatted?: string
    itemType: number
    pages?: number
    volume?: number
    edition?: number
    publishedAt: Date
    publishedOriginalAt: Date
    serieId: number
    collectionId: number
    publisherId: number
    itemFormatId: string
    languageId: 'PT'
    coverPrice: number
    paidPrice: number
    dimensions: string
    height: 0
    width: 0
    thickness: 0
    summary?: string
    createdBy?: string
    createdAt?: Date
    lastEditedBy?: string
    lastEditedAt?: Date
}

export interface Author {
    authorId?: string
}

export interface Serie {
    serieId?: string
}

export interface Collection {
    collectionId?: string
}

export interface Publisher {
    publisherId?: string
}