document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get('lists', function (row) {
        var row = row.lists;
        for (var i = 0; i < row.length; i++) {
            document.getElementById('f-' + i).children[0].children[1].value = row[i].source;
            document.getElementById('f-' + i).children[1].children[1].value = row[i].destination;
            document.getElementById('f-' + i).children[2].children[1].value = row[i].mode;
        }
    });
});

document.getElementById('save').addEventListener('click', function () {
    var rowLists = [];
    for (var i = 0; i < 3; i++) {
        var row = new FormData(document.getElementById('f-' + i));
        rowLists[i] = {
            source: row.get('source'),
            destination: row.get('destination'),
            mode: row.get('mode')
        }
    }
    
    chrome.storage.sync.set({
        lists: rowLists
    }, function () {
        document.getElementById('alert').style.display = "block";
        setTimeout(() => {
            document.getElementById('alert').style.display = "none";
        }, 1000);
    });
});

document.getElementById('more').addEventListener('click', function () {
    console.log(document.getElementById("item-more"));
    var status = this.innerText;
    if (status == "more") {
        this.innerText = "less";
        document.getElementById("item-more").style.maxHeight = "1000px";
        document.getElementById("item-more").style.transition = "max-height 1.2s";
    } else {
        this.innerText = "more";
        document.getElementById("item-more").style.transition = "max-height 0.5s";
        document.getElementById("item-more").style.maxHeight = "0px";
    }
});