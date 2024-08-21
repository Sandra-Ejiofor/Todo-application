let form = document.getElementById("form")
let itemContainer = document.getElementById("Itemscontainer")
let todoInput=document.getElementById("Todo-input")
let todoArray=[]
let editingsignal=-1

form.addEventListener("submit",function(event){
event.preventDefault()
let todoInputValue=todoInput.value
if(editingsignal>=0){
    todoArray=todoArray.map(function(todoobject,index){
        if(editingsignal===index){
            return{
                todoitemEntered:todoInputValue,
                completed : todoobject.completed
            }
        }else{return{
            todoitemEntered:todoobject.todoitemEntered,
            completed : todoobject.completed
        }}

    })

}else {
    const todoliteral={
        todoitemEntered:todoInputValue,
        completed : false
    }
    todoArray.push(todoliteral)
}


localStorage.setItem("todos",JSON.stringify(todoArray))
form.reset()
Fetchitemsontodo()
displaytext()
})


function Fetchitemsontodo(){
    if(localStorage.getItem("todos")){
        todoArray=JSON.parse(localStorage.getItem("todos"))
    }
    displaytext()
}
Fetchitemsontodo()


function displaytext(){
    itemContainer.innerHTML=``
    todoArray.forEach(function(todoitem,index){
    let todoitemprinted=todoitem.todoitemEntered
    let todoitemdiv=document.createElement("div")
    todoitemdiv.classList.add("Itemlist")
    todoitemdiv.setAttribute("id",`${index}`)

    let leftsidediv=document.createElement("div")
    leftsidediv.classList.add("leftside")
    let uncheckedicon=document.createElement("i")
    uncheckedicon.classList.add("fa-regular","fa-circle")
    uncheckedicon.setAttribute("data-action","check")

    let checkedicon=document.createElement("i")
    checkedicon.classList.add("fa-solid","fa-circle-check")
    checkedicon.setAttribute("data-action","check")

    let paragraph=document.createElement("p")
    paragraph.textContent=todoitemprinted
    paragraph.setAttribute("data-action","check")

    let rightsidediv=document.createElement("div")
    rightsidediv.classList.add("rightside")
    let editicon=document.createElement("i")
    editicon.classList.add("fa-solid","fa-pen")
    editicon.setAttribute("data-action","edit")

    let deleteicon=document.createElement("i")
    deleteicon.classList.add("fa-solid","fa-trash")
    deleteicon.setAttribute("data-action","delete")

    if(!todoitem.completed){
        leftsidediv.append(uncheckedicon,paragraph)
        rightsidediv.append(editicon,deleteicon)
        todoitemdiv.append(leftsidediv,rightsidediv)
        itemContainer.append(todoitemdiv)


    }else{
        leftsidediv.append(checkedicon,paragraph)
        rightsidediv.append(editicon,deleteicon)
        todoitemdiv.append(leftsidediv,rightsidediv)
        itemContainer.append(todoitemdiv)
        paragraph.style.textDecoration="line-through"

    }

    })
}

itemContainer.addEventListener("click",targettodoitem)
function targettodoitem(event){
    let targetofuser=event.target
    let grandparentelement=targetofuser.parentElement.parentElement
    if(!grandparentelement.classList.contains("Itemlist"))return
    let todoid=Number(grandparentelement.id)
    let clickedaction=targetofuser.dataset.action
    if(clickedaction==="check"){
        checkatodoitem(todoid)

    }else if(clickedaction==="edit"){
        editatodoitem(todoid)
    }else if(clickedaction==="delete"){
        deleteatodoitem(todoid)
    }

    
}
function checkatodoitem(ID){
    todoArray=todoArray.map(function(todoobject,index){
if(index===ID){
    return{
        todoitemEntered:todoobject.todoitemEntered,
        completed : !todoobject.completed
    }
}else{
    return{
        todoitemEntered:todoobject.todoitemEntered,
        completed : todoobject.completed
    }
}
    })
    displaytext()
}

function editatodoitem(ID){
    todoInput.value=todoArray[ID].todoitemEntered
    editingsignal=ID
}
function deleteatodoitem(ID){
    todoArray=todoArray.filter(function(todoobject,index){
        return index !==ID
    })
    displaytext()
}