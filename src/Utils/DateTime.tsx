

const getCurrentPeriod = () => {
    const now: Date = new Date();
    const year: number = now.getFullYear()
    const month: number = now.getMonth() + 1

    return year * 100 + month
}

const getListPeriods = (startYear: number, startMont: number, endYear: number, endMonth: number) => {
    let list_periods = []



    return list_periods
}

export default getCurrentPeriod;
export {getListPeriods}