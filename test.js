(async function doSomeStuff() {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        // do some stuff
        console.log("test")
    }
})();