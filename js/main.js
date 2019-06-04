let data = [];
let activeId;
let loopCounter = 0;
let searchText = '';
const target = document.getElementById('search');
loadData();

function loadData(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.response)
        }
    };
    xhttp.open("GET", "js/data.json", true);
    xhttp.send();
}

function handleInputValueChange(value){
    searchText = value;
    if(searchText == ''){
        hideSearchResults();
    } else if( searchText.length > 2 ) {
        document.getElementById('resultsDiv').style.display = 'block';
        if((event.keyCode == 38) || event.keyCode == 40){
            return
        } else {
            let formResultArray = data.filter((item) => JSON.stringify(item).toLowerCase().includes(searchText.toLowerCase()));
            loopCounter = formResultArray.length;
            buildSearchResults(formResultArray)
        }
        
    }
}

function hideSearchResults(){
    document.getElementById('resultsDiv').style.display = 'none';
}

function buildSearchResults(searchResultsArray){
    if(searchResultsArray.length === 0){
        document.getElementById('resultsDiv').innerHTML = '';
        let list = document.createElement('ul');
        let item = document.createElement('li');
        item.setAttribute('class','text-center no-user');
        item.appendChild(document.createTextNode('No users found'));
        list.appendChild(item);
        document.getElementById('resultsDiv').append(list);
    } else {
        let createListOnDom = Promise.resolve(makeLi(searchResultsArray));
        createListOnDom.then(() => {
            setSelectedItemDefault();
            handleMouseSelection();
            markHighlightedText();
        });
    }
}

function makeLi(array) {
    var list = document.createElement('ul');
    let counter = 1;
    list.setAttribute('id','list');
    for (var i = 0; i < array.length; i++) {
        var item = document.createElement('li'); //Create a list Element
        
        item.setAttribute('class','objectItems'); // Start building the items for the list
        item.setAttribute('id',counter);
        
        let objDetailsId = document.createElement('span');
        objDetailsId.setAttribute('class','userId')
        objDetailsId.appendChild(document.createTextNode(array[i].id));
        item.appendChild(objDetailsId);
        item.appendChild(document.createElement('br'));

        let objDetailsName = document.createElement('span');
        objDetailsName.setAttribute('class','userName')
        objDetailsName.appendChild(document.createTextNode(array[i].name));
        item.appendChild(objDetailsName);
        item.appendChild(document.createElement('br'));

        let objDetailsAddress = document.createElement('span');
        objDetailsAddress.setAttribute('class','userAddress')
        objDetailsAddress.appendChild(document.createTextNode(array[i].address));
        item.appendChild(objDetailsAddress);
        
        list.appendChild(item);
        counter++;
    }
    document.getElementById('resultsDiv').innerHTML = ''; // Flush before you append 
    document.getElementById('resultsDiv').append(list);  // Append the list to the div
}


function setSelectedItemDefault(){
    activeId = 1;
    let element = document.getElementById(activeId);
    element.style.backgroundColor = '#fefee1';
}

function handleMouseSelection(){
    let listItems = document.querySelectorAll("#resultsDiv ul li");
    listItems.forEach(function(item) {
    item.onclick = function(e) {
        let previousSelectedId = activeId;
        if(e.target.parentNode.className == 'objectItems'){
            activeId = e.target.parentNode.id;
        } else {
            activeId = e.target.id
        }
        flushSelectedItem(previousSelectedId);
    }
    
});
}


document.onkeyup = keyCheck;

function keyCheck(e) {
    var previousId = activeId;
    var Key = (window.event) ? event.keyCode : e.keyCode;
    switch (Key) {
        case 40:
        activeId++;
        break;
        case 38:
        activeId--;
        break;
    }
    if (activeId < 1) activeId += loopCounter; if (activeId > loopCounter) activeId -= loopCounter;
    flushSelectedItem(previousId);
};

function flushSelectedItem(flushId){
    let Old = document.getElementById(flushId);
    (Old) ? Old.style.backgroundColor = 'white':'';
    let New = document.getElementById(activeId);
    (New) ? New.style.backgroundColor = '#fefee1':'';
    (New) ? New.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"}):'';
}

function markHighlightedText(){
    let keyword = searchText;
    let options = {};
    let markInstance = new Mark(document.querySelector("#resultsDiv ul"));
    markInstance.unmark({
        done: function(){
          markInstance.mark(keyword, options);
      }
    });
}