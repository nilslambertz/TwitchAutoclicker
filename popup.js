document.addEventListener('DOMContentLoaded', function() {
    let button = document.getElementById("usernameChangeButton");
    let checkbox = document.getElementById("autoclickInput");
    button.addEventListener('click', function() {
        let text = document.getElementById("usernameInput").value;
        let checked = checkbox.checked;
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {username: text, autoclick: checked});
            });
        });
        chrome.storage.sync.set({"usernameData": text});
        chrome.storage.sync.set({"autoclickData": checked});
        window.close();
    })
})

chrome.storage.sync.get(['usernameData'], function(r) {
    if(r.usernameData !== null) {
        document.getElementById("usernameInput").value = r.usernameData;
    }
})


chrome.storage.sync.get(['autoclickData'], function(r) {
    if(r.autoclickData !== null) {
        document.getElementById("autoclickInput").checked = r.autoclickData;
    }
})