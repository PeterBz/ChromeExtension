let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const deleteAllBtn = document.getElementById("deleteAll-btn")


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage) { 
    myLeads = leadsFromLocalStorage
    renderLeads()
} 

deleteAllBtn.addEventListener("dblclick", function() { 
    
    localStorage.clear()
    myLeads =[]
    renderLeads()
    console.log("double clicked success")
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    
    localStorage.setItem("myLeads" , JSON.stringify(myLeads))
    renderLeads()

    console.log(localStorage.getItem("myLeads"))
})

function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]} 
                </a> 
                <button class="delete-single" data-index="${i}">🗑️</button>
            </li>   
        `
    }
    ulEl.innerHTML = listItems  

    // Event Listener zum delete Icon hinzufügen 
    const deleteSingleLink = document.querySelectorAll(".delete-single")
    deleteSingleLink.forEach( btn => { 
        btn.addEventListener("click", function (e) { 
            const index = e.target.dataset.index
            deleteLead(index)
        })
    })
}

function deleteLead(index) {
    // 1. Aus dem Array entfernen
    myLeads.splice(index, 1)
    // 2. Im LocalStorage aktualisieren
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    // 3. Neu anzeigen
    renderLeads()
}


