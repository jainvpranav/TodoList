
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL:"https://firstone-afca6-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

onValue(shoppingListInDB, function(snapshot) {
    if(snapshot.exists()) {
        let items = Object.entries(snapshot.val());
        clearList();
        // items.forEach(appendShoppingList)
        for(var i=0; i<items.length; i++) {
            let curitem = items[i];
            appendShoppingList(curitem);
        }
    } 
    else {
        shoppingListEl.innerHTML = "No Items here yet..."
    }
    
})

function clearList() {
    shoppingListEl.innerHTML = ""
}

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if(inputValue!='') {
        push(shoppingListInDB, inputValue)
        clearInputFieldEl()
    }
})

function clearInputFieldEl() {
    inputFieldEl.value=""
}

function appendShoppingList(inputValue) {
    let itemId = inputValue[0];
    let itemname = inputValue[1];
    let newEl = document.createElement("li");
    newEl.textContent = itemname;
    shoppingListEl.append(newEl);

    newEl.addEventListener("dblclick", function() {
        let location = ref(database, `shoppingList/${itemId}`);
        remove(location);
    });
} 