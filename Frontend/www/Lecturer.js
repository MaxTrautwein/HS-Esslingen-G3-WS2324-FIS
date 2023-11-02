

window.addEventListener("load",() => BuildCards());



function BuildCards() {
    const Appointments = [
        {
            id: 1,
        name:"SWB3",
        date:"Donnerstag 12.Oct",
        start:"10:00",
        end:"12:15",
            canceld:false
        },{
            id: 2,
            name:"SWB4",
            date:"Donnerstag 12.Oct",
            start:"10:00",
            end:"12:15",
            canceld:false
        },{
            id: 3,
            name:"SWB5",
            date:"Donnerstag 12.Oct",
            start:"10:00",
            end:"12:15",
            canceld:false
        },{
            id: 4,
            name:"SWB6",
            date:"Donnerstag 12.Oct",
            start:"10:00",
            end:"12:15",
            canceld:false
        }

    ];
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
    var $row = $(clone);
    $row.find("[data-template='name']").text(name);
    $row.find("[data-template='date']").text(date);
    $row.find("[data-template='start']").text(start);
    $row.find("[data-template='end']").text(end);
    const toggle = $row.find("[data-template='toggle']")[0];
    toggle.id = id;
    toggle.setAttribute("data-status",status);
    toggle.addEventListener("click",UpdateCancelStatus);

    if (status){
        //Set Red
        $row.classList.add("canceld");
        $row.find("[data-template='cancel']")[0].setAttribute("style","color: #e01b24;");

    }else {
        //Set Green
        $row.find("[data-template='running']")[0].setAttribute("style","color: #2ec27e;");

    }

    return $row;
}

function UpdateCancelStatus(){
    const id = this.id;
    //TODO Tell backend the new Status


    const status = (this.getAttribute("data-status") === 'true');
    const  canceld = !status;
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


/*
*  <div class="card">
        <h5 class="card-header">SWB3-SW-Softwaretechnik</h5>
        <div class="card-body">
            <h5 class="card-title">Do. 18.10 </h5>
            <p class="card-text">8:00 Uhr - 11:15 Uhr</p>
        </div>
    </div>
    <div class="card">
        <h5 class="card-header">SWB3-SW-Softwaretechnik</h5>
        <div class="card-body">
            <h5 class="card-title">Do. 18.10 </h5>
            <p class="card-text">8:00 Uhr - 11:15 Uhr</p>
        </div>
    </div>
    <div class="card">
        <h5 class="card-header">SWB3-SW-Softwaretechnik</h5>
        <div class="card-body">
            <h5 class="card-title">Do. 18.10 </h5>
            <p class="card-text">8:00 Uhr - 11:15 Uhr</p>
        </div>
    </div>
*
* */
