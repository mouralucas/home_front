/**
 * @author Lucas Penha de Moura - 29/09/2022
 *  This function filter the key 'label' from lists used in Select components
 * @param data: the state that will be filtered (must be in {value: '', label: ''} format)
 * @param query: the text that will be searched in the data
 * @returns the filtered data based on query in the same format as input
 */
const filterSelect = (data, query) => {
    return data.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
}

export default filterSelect;