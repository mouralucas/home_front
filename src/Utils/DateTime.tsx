const getCurrentPeriod = () => {
    const now: Date = new Date();
    const year: number = now.getFullYear()
    const month: number = now.getMonth() + 1

    return year * 100 + month
}

function getDefaultDate(): string {
    /**
     * Returns current date in format 'yyyy-dd-mm' as string
     */
    const today: Date = new Date();
    const year: string = today.getFullYear().toString();
    const month: string = (today.getMonth() + 1).toString().padStart(2, '0');
    const day: string = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const format = (rawDate: any): string | undefined => {
    let currentDate = new Date();
    let timeOffset = currentDate.getTimezoneOffset() / 60;

    if (rawDate && rawDate.substring) {
        let year = rawDate.substring(0, 4);
        let month = rawDate.substring(5, 7);
        let day = rawDate.substring(8, 10);
        let hour = rawDate.substring(11, 13);
        let minute = rawDate.substring(14, 16);

        let new_date;
        if (hour && minute) {
            new_date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour) - timeOffset, parseInt(minute));
        } else {
            new_date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        }

        let nova_data_dia = new_date.getDate().toString().length === 1 ? '0' + new_date.getDate().toString() : new_date.getDate().toString();
        let nova_data_mes = (new_date.getMonth() + 1).toString().length === 1 ? '0' + (new_date.getMonth() + 1).toString() : (new_date.getMonth() + 1).toString();
        let nova_data_ano = new_date.getFullYear().toString().length === 1 ? '0' + new_date.getFullYear().toString() : new_date.getFullYear().toString();
        let nova_data_horas = new_date.getHours().toString().length === 1 ? '0' + new_date.getHours().toString() : new_date.getHours().toString();
        let nova_data_minutos = new_date.getMinutes().toString().length === 1 ? '0' + new_date.getMinutes().toString() : new_date.getMinutes().toString();

        return nova_data_dia + '/' + nova_data_mes + '/' + nova_data_ano + ' às ' + nova_data_horas + ":" + nova_data_minutos;
    }

}

export {format, getCurrentPeriod, getDefaultDate}