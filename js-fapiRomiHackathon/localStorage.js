function printLocalStorage(){
    const sampleObject = {
        id : "node 01",
        id : [
            {
                subid: "subnode 01"
            },
            {
                subid: "subnode 02"
            }
        ]
    };

    console.log("ACTUAL LOCAL STORED ITEMS:")
        // iterate localStorage
    for (let i = 0; i < localStorage.length; i++) {

        // set iteration key name
        const key = localStorage.key(i);
    
        // use key name to retrieve the corresponding value
        const value = localStorage.getItem(key);
    
        // console.log the iteration key and value
        console.log('Key: ' + key + ', Value: ' + value);  
        
        //console.log(JSON.stringify(sampleObject));
    }
};

function clearLS(){
    localStorage.clear();
    printLocalStorage();
}