import React from "react";
import handleSubmit from "../../../../Services/Axios/Post";
import {URL_ACCOUNT_STATEMENT} from "../../../../Services/Axios/ApiUrls";
import Modal from "../../../../Components/Modal";


interface CategoryExpensesDetails {
    modalState: boolean,
    hideModal: any
}

const App = (props: CategoryExpensesDetails) => {
    const body = () => {
        return (
            <></>
        )
    }

    return (
        <Modal
            showModal={props.modalState}
            hideModal={props.hideModal}
            title={'Despesa por categoria'}
            body={body()}
            fullscreen={false}
            size={'lg'}
        />
    )
}


export default App;
