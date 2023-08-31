//Pie chart to show the allocation of the investment
// Fixed and floating, type, etc (I don't know yet)
import React from "react";
import AllocationChart from "../../../../../Components/Chart/Pie"

const App = () => {
    return (
        <div className="row">
            <div className="col-6">
                <AllocationChart
                    data={[]}
                    title={"Alocação por tipo"}
                    axis={{argumentField: 'category', valueField: 'total'}}
                />
            </div>
            <div className="col-6">
                <AllocationChart
                    data={[]}
                    title={"Alocação por caralhos"}
                    axis={{argumentField: 'category', valueField: 'total'}}
                    type={'doughnut'}
                />
            </div>
        </div>
    )
}

export default App;