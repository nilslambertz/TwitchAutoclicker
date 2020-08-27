let usernameData;
let autoclickData;
let websiteData;

document.addEventListener('DOMContentLoaded', function() {
    let button = document.getElementById("changeButton");
    let checkbox = document.getElementById("autoclickInput");
    button.addEventListener('click', function() {
        let username = document.getElementById("usernameInput").value.trim();
        let website = document.getElementById("websiteInput").value.trim();
        let checked = checkbox.checked;

        chrome.storage.sync.set({"usernameData": username});
        chrome.storage.sync.set({"autoclickData": checked});
        chrome.storage.sync.set({"websiteData": website});

        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {update:true});
            });
        });

        window.close();
    })
});

chrome.storage.sync.get(['usernameData'], function(r) {
    if(r.usernameData !== undefined) {
        usernameData = r.usernameData;
        document.getElementById("usernameInput").value = usernameData
    }
});

chrome.storage.sync.get(['autoclickData'], function(r) {
    if(r.autoclickData !== undefined) {
        autoclickData = r.autoclickData;
        document.getElementById("autoclickInput").checked = autoclickData;
    }
});

chrome.storage.sync.get(['websiteData'], function(r) {
    if(r.websiteData !== undefined) {
        websiteData = r.websiteData;
        document.getElementById("websiteInput").value = websiteData;
    }
});