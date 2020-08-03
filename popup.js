document.addEventListener('DOMContentLoaded', function() {
    let button = document.getElementById("usernameChangeButton");
    button.addEventListener('click', function() {
        let text = document.getElementById("usernameInput").value;
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, text);
            });
        });
        chrome.storage.sync.set({"usernameData": text});
        chrome.storage.sync.get(['usernameData'], function(r) {
            console.log("XD1");
            console.log(r);
            console.log("XD2");
        })
    })
})

chrome.storage.sync.get(['usernameData'], function(r) {
    if(r.usernameData !== null) {
        document.getElementById("usernameInput").value = r.usernameData;
    }
})