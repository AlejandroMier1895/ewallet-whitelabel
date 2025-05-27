import sharedData from './sharedData.json'

const getData = async() => {
    sharedData.tariffs = [{
        id: 4,
        media: "Transfer",
        percent: "1",
        fixed: "0",
        min: "2000",
        tax: "19",
        gmf: false,
    }, ]
}

(() => {
    if (!__filename) return;
    getData();
})();