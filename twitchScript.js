let username = "syrinxx1337";

setInterval(function() {
    updateUsername();
    let arr = Array.from(document.getElementsByClassName("chat-line__message")).slice(-10);
    for(let x of arr) {
        if(x.classList.contains("read")) continue;
        for(let outer of x.childNodes) {
            if(outer.classList.contains("chat-line__username")) {
                if(outer.innerText === username) {
                    for(let c of x.childNodes) {
                        if(c.classList.contains("link-fragment")) {
                            let link = c.innerText;
                            if(link.startsWith("https://daddyskins.com/arena")) {
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

function updateUsername() {
    try {
        chrome.storage.sync.get(['usernameData'], function (r) {
            if (r.usernameData === null || username === r.usernameData) return;
            username = r.usernameData;
        })
    } catch(e) {
        console.log("doof");
    }
}

chrome.runtime.onMessage.addListener(msgObj => {
    username = msgObj;
});