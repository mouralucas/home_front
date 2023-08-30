import {useEffect, useState} from "react";
import {getData} from "../../../../Services/Axios/Get";
import {URL_FINANCE_CURRENCY_FLOW} from "../../../../Services/Axios/ApiUrls";
import {toast} from "react-toastify";
import Doughnut from "../../../../Components/Chart/Doughnut";
import React from "react";


const App = () => {
    // useEffect(() => {
    //     getData(URL_FINANCE_CURRENCY_FLOW).then(response => {
    //     }).catch(err => {
    //         toast.error('Houve um erro ao buscar a proporção de fluxo de moedas')
    //     })
    // }, [])


    return (
        <></>
    )
}

export default App;