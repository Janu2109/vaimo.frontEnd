import QtyRockerView from "./qtyRocker";

function QtyRocker({responseObject, minValue, maxValue, incrementValue, setProductList}){
    return(
        <QtyRockerView responseObject={responseObject} minValue={minValue} maxValue={maxValue} incrementValue={incrementValue} setProductList={setProductList}/>
    )
}

export default QtyRocker;