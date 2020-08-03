let username = "syrinxx1337";
let autoclick = false;

setInterval(function() {
    let arr = Array.from(document.getElementsByClassName("chat-line__message")).slice(-10);
    for (let x of arr) {
        if (x.classList.contains("read")) continue;
        for (let outer of x.childNodes) {
            if (outer.classList.contains("chat-line__username")) {
                if (outer.innerText === username) {
                    for (let c of x.childNodes) {
                        if (c.classList.contains("link-fragment")) {
                            let link = c.innerText;
                            if (link.startsWith("https://daddyskins.com/arena") && autoclick) {
                                window.open(link);
                            }
                        }
                    }
                }
                break;
            }
        }
        x.classList.add("read");
    }
},50);

chrome.storage.sync.get(['usernameData', 'autoclickData'], function(items) {
    username = items.usernameData;
    autoclick = items.autoclickData;
});

chrome.runtime.onMessage.addListener(msgObj => {
    let newAutoclick = JSON.pars
    if(msgObj.username !== null) {
        username = msgObj.username;
    }
    if(msgObj.autoclick !== null) {
        autoclick = msgObj.autoclick;
    }
});