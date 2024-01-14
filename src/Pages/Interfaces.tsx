import {UUID} from "crypto";

export interface ReactSelectInterface {
    value: string | null | undefined
    label: string | null | undefined
}

export interface Country {
    countryId: UUID
}

export interface Category {
    categoryId: UUID
    categoryName: string
    description: string
    fatherId: UUID
    fatherName: string
}