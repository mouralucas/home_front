import {getFinanceData} from "../Axios/Get";
import {URL_CATEGORIES, URL_CREDIT_CARD, URL_CURRENCY, URL_FINANCE_TAX_FEE} from "../Axios/ApiUrls";
import {CreditCard, Currency, TaxFee} from "../../Pages/Finance/Interfaces";
import {toast, ToastOptions} from "react-toastify";
import {Category} from "../../Pages/Interfaces";


interface GetCreditCardsResponse {
    quantity: number;
    creditCards: CreditCard[];
}


interface GetCategoryResponse {
    quantity: number;
    categories: Category[];
}

interface GetCurrencyResponse {
    quantity: number;
    currencies: Currency[];
}

interface GetTaxFeeResponse {
    quantity: number;
    taxFee: TaxFee[];
}

export const getCreditCards = async (): Promise<any[]> => {
    try {
        const response: GetCreditCardsResponse = await getFinanceData(URL_CREDIT_CARD);
        return response.creditCards.map((i: CreditCard) => ({
            value: i.creditCardId,
            label: i.nickname,
        }));
    } catch (err: any | ToastOptions) {
        toast.error('Houve um erro ao buscar os cartões de crédito');
        return [];
    }
};

export const getCategories = async (): Promise<any[]> => {
    try {
        const response: GetCategoryResponse = await getFinanceData(URL_CATEGORIES);
        return response.categories.map((i: Category) =>
            ({value: i.categoryId, label: i.name})
        );
    } catch (err: any | ToastOptions) {
        toast.error('Houve um erro ao buscar as categorias' + err);
        return [];
    }
};

export const getCurrencies = async (): Promise<any[]> => {
    try {
        const response: GetCurrencyResponse = await getFinanceData(URL_CURRENCY);
        return response.currencies.map((i: Currency) =>(
            {value: i.currencyId, label: i.symbol}
        ));
    } catch (err: any | ToastOptions) {
        toast.error('Houve um erro ao buscar as moedas');
        return [];
    }
};

export const getTaxFee = async (countryId: string, taxFeeType: string): Promise<any[]> => {
    try {
        const response: GetTaxFeeResponse = await getFinanceData(URL_FINANCE_TAX_FEE, {countryId: countryId, type: taxFeeType});
        return response.taxFee.map((i: TaxFee) => (
            {value: i.taxFeeId, label: i.name}
        ))
    } catch (err: any | ToastOptions) {
        toast.error('Houve um erro ao buscar as taxas e impostos')
        return []
    }
};