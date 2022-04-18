import QtyRockerView from "./qtyRocker";

function QtyRocker({responseObject, minValue, maxValue, incrementValue}){
    return(
        <QtyRockerView responseObject={responseObject} minValue={minValue} maxValue={maxValue} incrementValue={incrementValue}/>
    )
}

export default QtyRocker;