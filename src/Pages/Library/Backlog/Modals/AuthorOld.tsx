import Modal from "../../../../Components/Modal";
import {CheckBox} from 'devextreme-react/check-box';
import {Author} from "../../interfaces";
import DropdownList from 'react-widgets/DropdownList'
import {Controller, useForm} from "react-hook-form";

interface AuthorModalProps {
    author: Author | undefined
    modalState: boolean
    hideModal: any
}

const App = (props: AuthorModalProps) => {
    const {handleSubmit, control, setValue} = useForm();

    let colors = [
        {id: 0, name: 'orange', parent:'lucas'},
        {id: 1, name: 'purple', parent: 'lucas'},
        {id: 2, name: 'red', parent: 'moura'},
        {id: 3, name: 'blue', parent: 'moura'},
    ];

    const body = () => {
        let body_html =
            <form>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Nome</label>
                            <input type="text" className="form-control input-default"/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Data nascimento</label>

                        </div>
                        <div className="col-3">
                            <label htmlFor="">Country</label>
                            <Controller
                                name={'countryId'}
                                control={control}
                                render={field => (
                                    <DropdownList
                                        data={colors}
                                        groupBy={'parent'}
                                        dataKey={'id'}
                                        textField={'name'}
                                        onChange={(e: any) => setValue('countryId', e.id)}
                                        {...field}
                                    />
                                )}
                            />

                        </div>
                        <div className="col-3">
                            <label htmlFor="">Idioma</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-2">
                            <CheckBox
                                text="É tradutor"
                                hint="Approve"
                                iconSize="25"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <textarea className='form-control' id=""></textarea>
                        </div>
                    </div>
                </div>
            </form>;

        return body_html
    }

    return (
        <div>
            <Modal
                showModal={props.modalState}
                hideModal={props.hideModal}
                title={'Autor'}
                body={body()}
                fullscreen={false}
                // actionModal={(e: any) => handleSubmit(e, URL_AUTHOR, values, null, '')}
                size={'lg'}
            />
        </div>
    );
}

export default App;