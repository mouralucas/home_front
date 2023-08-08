import React, {useState} from "react";
import {Author, Item, ItemModalProps} from "../../interfaces";
import filterSelect from "../../../../Utils/DataHandling";
import {getData} from "../../../../Services/Axios/Get";
import {URL_AUTHOR} from "../../../../Services/Axios/ApiUrls";
import {getDefaultDate} from "../../../../Utils/DateTime";
import AsyncSelect from "react-select/async";

const ItemDefault: Item = {
    itemId: null,
    lastStatusId: null,
    lastStatusDate: getDefaultDate(),
    mainAuthorId: 0,
    authorsId: [],
    translatorId: 0,
    title: '',
    subtitle: '',
    titleOriginal: '',
    subtitleOriginal: null,
    isbnFormatted: '',
    isbn10Formatted: '',
    itemType: 0,
    pages: 0,
    volume: 1,
    edition: 1,
    publishedAt: null,
    publishedOriginalAt: null,
    serieId: 0,
    collectionId: 0,
    publisherId: 0,
    itemFormatId: 0,
    languageId: 'PT',
    coverPrice: 0,
    paidPrice: 0,
    dimensions: '',
    height: 0,
    width: 0,
    thickness: 0,
    summary: '',
    createdBy: null,
    createdAt: null,
    lastEditedBy: null,
    lastEditedAt: null
}

const App = (props: ItemModalProps) => {
    const [mainAuthor, setMainAuthor] = useState<Author[]>();
    const [selectedMainAuthor, setSelectedMainAuthor] = useState<Author | null>();

    const [otherAuthors, setOtherAuthors] = useState<Author[]>();
    const [selectedOtherAuthors, setSelectedOtherAuthors] = useState<Author | null>();

    const [itemType, setItemType] = useState([]);
    const [selectedItemType, setSelectedItemType] = useState();

    const [items, setItems] = useState<Item>(ItemDefault)
    const getAuthors = (query: string, callback: any) => {
        if (query) {
            callback(filterSelect(mainAuthor, query));
        } else {
            getData(URL_AUTHOR).then(response => {
                let options = response?.authors.map((author: Author) => ({value: author.authorId, label: author.authorName}))
                callback(options);
                setMainAuthor(options);
                setSelectedMainAuthor(options.filter((i: { value: number; }) => i.value === items.mainAuthorId)[0])
            })

        }
    }

    let html = (
        <>
            <div className="">
                <div className="row">
                    <div className="col-4">
                        <AsyncSelect loadOptions={(query, callback) => getAuthors(query, callback)}
                                     onChange={(e) => setCombo(e, 'mainAuthorId', setSelectedMainAuthor)}
                                     defaultOptions
                                     value={selectedMainAuthor}/>
                    </div>
                </div>
            </div>
        </>
    )

    const setCombo = (e: any, name: string, setFunction: any) => {
        if (e !== null) {
            if (Array.isArray(e)) {
                let list_values: any[] = [];
                e.forEach(key => list_values.push(key.value));
                setFunction(e);
                return setItems(oldValues => ({...oldValues, [name]: list_values}));
            } else {
                setFunction(e);
                return setItems(oldValues => ({...oldValues, [name]: e.value}));
            }
        }
        return setItems(oldValues => ({...oldValues, [name]: e.value}));
    }

    return html
}

export default App;