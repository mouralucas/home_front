import Header from "../../Components/Header";
import MyChart from "../../Components/Chart";
import Button from '../../Components/Button'
import Navbar from '../../Components/Navbar'

function Home () {
    return (
        <div className="App">
            {/*<Header />*/}
            <Navbar />
            <div className="content">
                <h1>App component</h1>
            </div>
        </div>
    );
}

export default Home;