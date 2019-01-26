var itemLists = "";
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get("lists", function (items) {
        itemLists = items.lists;
    });
});

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        for (var i = 0; i < itemLists.length; i++) {
            if (!(/^https?:\/\//.test(itemLists[i].source))) {
                console.log("source address error");
                continue;
            }
            if (!(/^https?:\/\//.test(itemLists[i].destination))) {
                console.log("destination address error");
                continue;
            }
            if (itemLists[i].source == itemLists[i].destination) {
                console.log("address conflict");
                continue;
            }
            var source_patt = new RegExp("^" + itemLists[i].source);
            if (source_patt.test(details.url)) {
                console.log("patt yes");
                switch (itemLists[i].mode) {
                    case "drop":
                        console.log("drop");
                        return {
                            cancel: true
                        };
                        break;
                    case "redirect":
                        console.log("redirect");
                        return {
                            redirectUrl: itemLists[i].destination
                        }
                        break;
                    case "keep":
                        console.log("keep");
                        var data_patt = new RegExp("^" + itemLists[i].source);
                        var new_url = details.url.replace(data_patt, itemLists[i].destination);
                        return {
                            redirectUrl: new_url
                        }
                        break;
                }
            } else {
                console.log("patt no");
            }
        }
    }, {
        urls: ["<all_urls>"]
    },
    ["blocking"]);