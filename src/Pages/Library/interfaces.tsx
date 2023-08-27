export interface Item {
    itemId?: string | null
    lastStatusId: string | null
    lastStatusDate: string | null
    mainAuthorId: any
    authorsId?: number[]
    translatorId?: number
    title: string
    subtitle?: string | null
    titleOriginal?: string
    subtitleOriginal?: string | null
    isbnFormatted?: string
    isbn10Formatted?: string
    itemType: number
    pages?: number
    volume?: number
    edition?: number
    publishedAt: Date | null
    publishedOriginalAt: Date | null
    serieId: number
    collectionId: number
    publisherId: number
    itemFormatId: number
    languageId: 'PT'
    coverPrice: number
    paidPrice: number
    dimensions: string
    height: 0
    width: 0
    thickness: 0
    summary?: string
    createdBy?: string | null
    createdAt?: Date | null
    lastEditedBy?: string | null
    lastEditedAt?: Date | null
}

export interface Author {
    authorId?: string
    authorName: string
    birthDate?: string
    languageId?: string
    languageName?: string
    countryId?: string
    countryName?: string
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

export interface ItemType {
    itemTypeId?: string
}

export interface ItemFormat {
    itemFormatId?: string
}

export interface Language {
    languageId?: string
}

export interface LastStatus {
    statusId?: string
    statusName?: string
    description?: string
    order?: number
    image?: string
    type?: string
}

// Modal Props
export interface ItemModalProps {
    item: Item | null
    modalState: boolean
    hideModalItem: any
}