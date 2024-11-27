export interface Item {
    itemId?: string | null
    lastStatusId: string | null
    lastStatusDate: string
    mainAuthorId: any
    authorsId?: number[]
    translatorId?: number
    title: string
    subtitle?: string
    titleOriginal?: string
    subtitleOriginal?: string
    isbn?: string
    isbn10?: string
    itemType: number
    pages?: number
    volume?: number
    edition?: number
    publicationDate: string | null
    originalPublicationDate: string | null
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
    serieId: string
    serieName: string
}

export interface Collection {
    collectionId: string
    collectionName: string
}

export interface Publisher {
    publisherId: string
    publisherName: string
}

export interface ItemType {
    itemTypeId?: string
}

export interface ItemFormat {
    itemFormatId?: string
}

export interface Language {
    languageId: string
    languageName: string
}

export interface LastStatus {
    statusId?: string
    name?: string
    description?: string
    order?: number
    image?: string
    itemType?: string
}

// Modal Props
export interface ItemModalProps {
    item: Item | null
    modalState: boolean
    hideModalItem: any
}