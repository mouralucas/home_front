import Modal from '../../../../Components/Modal'
import {ReactElement, useEffect, useState} from "react";
import {URL_CATEGORIES, URL_CREDIT_CARD} from "../../../../Services/Axios/ApiUrls";
import DateBox from 'devextreme-react/date-box';
import Moment from 'moment';
import Currency from '../../../../Components/Form/Currency'
import AsyncSelect from "react-select/async";
import {getData} from "../../../../Services/Axios/Get";
import filterSelect from "../../../../Utils/DataHandling";
import {format as formatDate, getDefaultDate} from "../../../../Utils/DateTime";
import {handleSubmit} from "../../../../Services/Axios/Post";
import {CreditCardTransaction} from "../../Interfaces";


const DefaultCreditCardBill: CreditCardTransaction = {
    transactionId: null,
    creditCardId: '',
    categoryId: '',
    currencyId: 'BRL',
    transactionCurrencyId: 'BRL',
    transactionAmount: 0,
    isInstallment: false,
    dollarExchangeRate: 0,
    currencyDollarExchangeRate: 0,
    totInstallments: 1,
    installments: [],
    totalAmount: 0,
    parentId: null,
    amount: 0,
    transactionDate: getDefaultDate(),
    description: '',
    createdAt: undefined,
    lastEditedAt: undefined
}

interface CreditCardBillProps {
    creditCardTransaction: CreditCardTransaction | null
    modalState: boolean
    hideModal: any
}

/**
 * Modal to create new entry for the credit card bill
 * @param props
 * @returns {React.ReactElement}
 * @constructor
 */
const App = (props: CreditCardBillProps): ReactElement => {
    // Combo boxes
    const [creditCard, setCreditCard] = useState<any | null>([]);
    const [selectedCreditCard, setSelectedCreditCard] = useState<any | null>();
    const [category, setCategory] = useState<any | null>([]);
    const [selectedCategory, setSelectedCategory] = useState<any | null>();


    const body = () => {
        let body_html =
            <form>
                <div className="container-fluid">

                </div>
            </form>;

        return body_html

    }

    return (
        <div>
            <Modal
                showModal={props.modalState}
                hideModal={props.hideModal}
                title={'Fatura'}
                body={body()}
                fullscreen={false}
                size={'lg'}
            />
        </div>
    );
}

export default App