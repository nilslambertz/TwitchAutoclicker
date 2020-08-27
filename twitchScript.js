let username = "";
let website = "";
let autoclick = false;
updateValues();

setInterval(function() {
    let arr = Array.from(document.getElementsByClassName("chat-line__no-background")).slice(-10);

    for(let x of arr) {
        if (x.classList.contains("read")) continue;
        x.classList.add("read");

        let name = "";

        for(let c of x.childNodes) {
            if(c.classList.contains("chat-line__username-container")) {
                for(let child of c.childNodes) {
                    if(child.classList.contains("chat-line__username")) {
                        name = child.innerText;
                    }
                }
            }
        }

        if(name.toLowerCase() === username.toLowerCase()) {
            for(let child of x.childNodes) {
                if(child.classList.contains("link-fragment")) {
                    let link = child.innerText;
                    if (link.startsWith("http") && link.includes(website) && autoclick) {
                        window.open(link);
                    }
                }
            }
        }
    }
},50);

function updateValues() {
    chrome.storage.sync.get(['usernameData', 'autoclickData', 'websiteData'], function(items) {
        username = items.usernameData ? items.usernameData : "";
        autoclick = items.autoclickData;
        website = items.websiteData ? items.websiteData : "";
    });
}

chrome.runtime.onMessage.addListener(msgObj => {
    if(msgObj.update) {
        updateValues();
    }
});