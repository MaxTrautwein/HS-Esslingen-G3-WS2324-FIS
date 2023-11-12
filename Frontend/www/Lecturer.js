
var userID = 1;
const URL = "http://localhost:5000/"
window.addEventListener("load",() => init());

function  init(){
    $("#UserID").text(userID);
    $("#UserIDInput").val(userID)
    httpGetAsync(URL + "Appointments?id=" + userID,BuildCards)
}

function UpdateUserID(){
    userID = Number( $("#UserIDInput").val())
    $("#CardContainer").empty();
    init()
}


function httpGetAsync(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function GetJson(url,callback){
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => callback(response));

}

function PostJson(jsonData,url){
    let data = JSON.stringify(jsonData);
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    });

}

function  BuildCards(Appointments) {
    const CardsContainer = $("#CardContainer");

    for(let i = 0; i < Appointments.length; i++){
        let Apointment = Appointments[i];
        const card = GetCard(Apointment.name,Apointment.date,Apointment.start,Apointment.end,Apointment.id,Apointment.canceld)
        CardsContainer.append(card)
    }





}

function GetCard(name,date,start,end,id,status){
    var t = document.querySelector('#CardTemplate');
    var clone = document.importNode(t.content, true); // where true means deep copy
    var card = $(clone);
    card.find("[data-template='name']").text(name);
    card.find("[data-template='date']").text(date);
    card.find("[data-template='start']").text(start);
    card.find("[data-template='end']").text(end);
    const toggle = card.find("[data-template='toggle']")[0];
    toggle.setAttribute("data-id",id)
    toggle.setAttribute("data-date",date)
    toggle.setAttribute("data-status",status);
    toggle.addEventListener("click",UpdateCancelStatus);

    if (status){
        //Set Red
        card.find("[data-template='card']")[0].setAttribute("class","canceld card");
        card.find("[data-template='cancel']")[0].setAttribute("style","color: #e01b24;");

    }else {
        //Set Green
        card.find("[data-template='running']")[0].setAttribute("style","color: #2ec27e;");
    }

    return card;
}

function UpdateCancelStatus(){
    const id = this.getAttribute("data-id");
    const date = this.getAttribute("data-date");
    //TODO Tell backend the new Status


    const status = (this.getAttribute("data-status") === 'true');
    const  canceld = !status;

    PostJson({"canceled":canceld,"id":id,"date":date},URL + "UpdateCanceled");


    this.setAttribute("data-status",canceld);
    const card = this.parentElement.parentElement;

    if (card.classList.contains("canceld") && !canceld){
        card.classList.remove("canceld");

    }else if (!card.classList.contains("canceld") && canceld){
        card.classList.add("canceld");
    }

    if (canceld){
        //Set Red
        $(this).find("[data-template='running']")[0].setAttribute("style","");

        $(this).find("[data-template='cancel']")[0].setAttribute("style","color: #e01b24;");

    }else {
        //Set Green
        $(this).find("[data-template='running']")[0].setAttribute("style","color: #2ec27e;");

        $(this).find("[data-template='cancel']")[0].setAttribute("style","");


    }


}

