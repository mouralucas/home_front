

const getCurrentPeriod = () => {
    const now: Date = new Date();
    const year: number = now.getFullYear()
    const month: number = now.getMonth() + 1

    const period = year*100 + month

    return '202211'
}

const getListPeriods = (start: number, end: number) => {
    const json = {
        values:  [
            {
                value: "201801",
                label: "201801"
            }
        ]
    }
    return json.values.map(i => ({value: i.value, label: i.label}))
}

export default getCurrentPeriod;
export {getListPeriods}