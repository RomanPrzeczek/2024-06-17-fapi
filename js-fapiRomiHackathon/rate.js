function getXMLHttpRequest (url, callback)
{
    let xhr = new XMLHttpRequest(); // A new instance of XMLHttpRequest is created.
    xhr.open('GET', url, true); // The open method initializes a GET request to the specified URL. The third parameter true makes it an asynchronous request.
    xhr.responseType = 'json'; // The responseType value defines the response type.

    xhr.onload = () => { // Inside the onload method, we wait for the response from the server.
        let status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send(); // The send method sends the request; the request is asynchronous by default.
}

let rate=1;

function getRate () {
    console.log("getRate()");
    getXMLHttpRequest('https://data.kurzy.cz/json/meny/b[1].json', (err, data) => {
        if (err != null) {
            console.error(err);
        } else {
            rate = data.kurzy.EUR.dev_stred;
            if (rate!=1){
                localStorage.setItem("ls_rate",rate);
                console.log(`             rate: ${rate}`);
            }
            let kurzElement = document.getElementById("inputKurz");
            kurzElement.innerHTML = rate;
        }
    });
}