let tStart = null;
let tEnd = null;
let image = new Image();
let counter = 0;
let arrTimes = [];
let abortFallback = false;


export default function checkConnectivity(timeToCount = 3, threshold = 3000, offlineTimeOut = 3000){
    if(navigator.onLine){
        changeConnectivity(true);
    }else{
        setTimeout(()=>{
            changeConnectivity(false);
        },offlineTimeOut);
    }
    window.addEventListener('online', e => {
        checkConnectivity(true);
    });

    window.addEventListener('offline', e => {
        setTimeout(()=>{
            checkConnectivity(false);
        },offlineTimeOut);

    });
    timeoutFallback(threshold);
    checkLatency(timeToCount,offlineTimeOut, avg => handleLatency((avg,threshold)))
    setInterval( () => {
        reset();
        timeoutFallback(threshold);
        checkLatency(timeToCount,offlineTimeOut, avg => handleLatency((avg,threshold)))
    },6000)
}

function checkLatency(timeToCount, offlineTimeOut, cb){
    tStart = new Date().getTime();
    if (counter < timeToCount){
        image.src = "https://www.google.com/images/phd/px.gif?t=" + tStart;
        image.onload = function() {
            abortFallback = true;
            tEnd = new Date().getTime();
            let time = tEnd - tStart;
            arrTimes.push(time);
            counter++;
            checkLatency(timeToCount, offlineTimeOut,cb);
        };
        image.onerror = function() {
            setTimeout(()=>{
                changeConnectivity(false);
                },offlineTimeOut);
        }
    }else{
        const sum = arrTimes.reduce((a,b) => a + b);
        const avg = sum / arrTimes.length;
        cb(avg);
    }
}

function handleLatency(avg, threshold) {
    const isConnectedFast = avg <= threshold;
    changeConnectivity(isConnectedFast);
}

function reset() {
    arrTimes = [];
    counter = 0;

}
function changeConnectivity(state){
    const event = new CustomEvent('connection-changed',{
        detail: state
    });

    document.dispatchEvent(event);

}
function timeoutFallback(threshold){
    setTimeout(() => {
        if(!abortFallback){
            console.log("Connection is too slow, falling back ");
            changeConnectivity(false);
        }
    },threshold +1)
}