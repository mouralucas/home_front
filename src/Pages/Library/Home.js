import Navbar from '../../Components/Navbar'
import Login from '../Login'
import Table from '../../Components/DataGrid'

import {isAuthenticated} from "../../Services/Auth/Auth";


function Home() {

    if (!isAuthenticated()) {
        return <Login/>
    }

    return (
        <div className="App">
            {/*<Header />*/}
            <Navbar/>
            <div className="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header d-flex flex-wrap bg-body">
                                <div>
                                    <img src="#" alt="" width="25"/>
                                    Livros
                                </div>
                            </div>
                            <div class="card-body">
                                <Table />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;