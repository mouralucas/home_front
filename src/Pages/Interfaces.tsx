import {UUID} from "crypto";

export interface Country {
    countryId: UUID
}

export interface Category {
    categoryId: UUID
    name: string
    description: string
    fatherId: UUID
    fatherName: string
}