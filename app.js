let initialize = () => {

    let sortList = document.getElementById("draggable_list")

    let richestPeople = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "i",
        "j",
        "k",
        "l"
    ]

    let listItems = []

    let dragStartIndex;
    let dragEndIndex;

    let dragStart = (event) => {        
        dragStartIndex = event.target.parentNode.getAttribute("data-index");
    }

    let dragOver = (event) => {
        event.preventDefault();
    }

    let dragDrop = (event) => {
        dragEndIndex = event.target.parentNode.getAttribute("data-index");
        event.target.classList.remove("over");
        let item_1 = listItems[dragStartIndex].querySelector(".draggable");
        let item_2 = listItems[dragEndIndex].querySelector(".draggable");
        listItems[dragEndIndex].appendChild(item_1);
        listItems[dragStartIndex].appendChild(item_2);
    }

    let dragEnter = (event) => {
        if (event.target.draggable === true) {
            event.target.classList.add("over")
        }
    }

    let dragLeave = (event) => {
        event.target.classList.remove("over")
    }

    let handleCheck = () => { 
        listItems.forEach((item, index) => {
            item.querySelector(".draggable").classList.remove("true")
            item.querySelector(".draggable").classList.remove("wrong")
            
            if (item.querySelector(".person-name").innerHTML.trim() === richestPeople[index]) {
                item.querySelector(".draggable").classList.add("true")
            } else {
                item.querySelector(".draggable").classList.add("wrong")
            }
        })
    }

    let handleReload = () => { 
        sortList.innerHTML = null;
        listItems = [];
        createList();
    }

    let addEventListeners = () => {
        let draggables = document.querySelectorAll(".draggable");
        let dragListItems = document.querySelectorAll(".draggable_list li");
        let BtnCheck = document.querySelector("#check")
        let BtnReload = document.querySelector("#reload")

        BtnCheck.addEventListener('click', handleCheck)
        BtnReload.addEventListener('click', handleReload)

        draggables.forEach(() => {
            addEventListener('dragstart', dragStart)
        })

        dragListItems.forEach(() => {
            addEventListener('dragover', dragOver)
            addEventListener('drop', dragDrop)
            addEventListener('dragenter', dragEnter)
            addEventListener('dragleave', dragLeave)
        })
    }

    let createList = () => {
        [...richestPeople]
            .map(item => ({ value: item, index: Math.random() }))
            .sort((a, b) => a.index - b.index)
            .map(item => item.value)
            .forEach((item, index) => {
                const listItem = document.createElement("li")
                listItem.setAttribute("data-index", index)

                listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${item}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `
                listItems.push(listItem);
                sortList.appendChild(listItem);
            })
        addEventListeners();
    }
    createList();
}