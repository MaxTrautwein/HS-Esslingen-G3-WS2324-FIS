const URL = "http://localhost:5000/"
window.addEventListener('load', () => defaultView.init());

const defaultView = {
    init() {
        const body = document.body;

        const main = generateDefault("none");
        body.appendChild(main);
    },   
};

function elementWithClasses(elementType, classNames) {
    const element = document.createElement(elementType);
    classNames.split(' ').forEach(className => {
        element.classList.add(className);
    });
    return element;
}

function filter() {
    var dropdown = document.getElementById('myDropdown');
    var selectedValue = dropdown.value;
    
    generateDefault(selectedValue);
}

function generateDefault(filter) {
    const oldMain = document.querySelector("main"); 
    const newMain = document.createElement("main");

    const dropdown = document.getElementById('myDropdown');
    filter = dropdown.value;
    
    const timeSlot = generateTimeSlot(filter);
    newMain.appendChild(timeSlot);

    if (oldMain !== null) {
        oldMain.replaceWith(newMain);
    }
    else {
        return newMain;
    }
}

var example = {
    "dateSpanData": {
        "endDate": "",
        "repeat": "",
        "startDate": ""
    },
    "description": "",
    "end": "",
    "groups": "",
    "id": 0,
    "lecturer": "",
    "name": "",
    "room": "",
    "start": ""
}

function generateAdd(item = example) {
    const oldMain = document.querySelector("main"); 
    const newMain = document.createElement("main");

    const addContainer = elementWithClasses("div", "addContainer")
    const date = document.createElement("h1");

    var formDiv = document.createElement('div');
    formDiv.className = 'form';
    formDiv.id = 'Form';

    // Create a form with id 'addForm'
    var form = document.createElement('form');
    form.id = 'addForm';

    const textC = elementWithClasses("div", "textC");
    if (item.id == 0){
        textC.innerText = "Neues Appointment:";
    }
    else {
        textC.innerText = `Edit Appointment:`;
    }

    const deleteIcon = elementWithClasses("div", "deleteIcon");
    deleteIcon.innerHTML = "<button id='delete' class='deleteButton' onclick='this.style.display='none''><i class='material-icons deleteIcon'>delete</i></button>";
    

    const textID = elementWithClasses ("div", "textID");
    textID.innerText = item.id;
    textID.id = "textID";

    addContainer.appendChild(textC);
    addContainer.appendChild(textID);
    

    // Define the form elements
    var nameRow = document.createElement('div');
    nameRow.className = 'row';

    var nameLabelDiv = document.createElement('div');
    nameLabelDiv.className = 'col-25';
    var nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'appName';
    nameLabel.textContent = 'Name';
    nameLabelDiv.appendChild(nameLabel);

    var nameInputDiv = document.createElement('div');
    nameInputDiv.className = 'col-75';
    var nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'appName1';
    nameInput.name = 'Name';
    nameInput.value = item.name;
    nameInputDiv.appendChild(nameInput);

    nameRow.appendChild(nameLabelDiv);
    nameRow.appendChild(nameInputDiv);
    form.appendChild(nameRow);

    // Create the 'Lehrkraft' dropdown
    var lehrkraftRow = document.createElement('div');
    lehrkraftRow.className = 'row';

    var lehrkraftLabelDiv = document.createElement('div');
    lehrkraftLabelDiv.className = 'col-25';
    var lehrkraftLabel = document.createElement('label');
    lehrkraftLabel.htmlFor = 'myDropdownL';
    lehrkraftLabel.textContent = 'Lehrkraft';
    lehrkraftLabelDiv.appendChild(lehrkraftLabel);

    var lehrkraftInputDiv = document.createElement('div');
    lehrkraftInputDiv.className = 'col-75';
    var lehrkraftInput = document.createElement('select');
    lehrkraftInput.id = 'myDropdownL';
    generateDropdownL(lehrkraftInput, item.lecturer);
    lehrkraftInputDiv.appendChild(lehrkraftInput);

    lehrkraftRow.appendChild(lehrkraftLabelDiv);
    lehrkraftRow.appendChild(lehrkraftInputDiv);
    form.appendChild(lehrkraftRow);

    // Create the 'Raumsuche' dropdown
    var raumsucheRow = document.createElement('div');
    raumsucheRow.className = 'row';

    var raumsucheLabelDiv = document.createElement('div');
    raumsucheLabelDiv.className = 'col-25';
    var raumsucheLabel = document.createElement('label');
    raumsucheLabel.htmlFor = 'myDropdownR';
    raumsucheLabel.textContent = 'Raumsuche';
    raumsucheLabelDiv.appendChild(raumsucheLabel);

    var raumsucheInputDiv = document.createElement('div');
    raumsucheInputDiv.className = 'col-75';
    var raumsucheInput = document.createElement('select');
    raumsucheInput.id = 'myDropdownR';
    generateDropdownR(raumsucheInput);
    raumsucheInput.value = item.room;
    raumsucheInputDiv.appendChild(raumsucheInput);

    raumsucheRow.appendChild(raumsucheLabelDiv);
    raumsucheRow.appendChild(raumsucheInputDiv);
    form.appendChild(raumsucheRow);

    // Create the 'Zielgruppe' dropdown
    var zielgruppeRow = document.createElement('div');
    zielgruppeRow.className = 'row';

    var zielgruppeLabelDiv = document.createElement('div');
    zielgruppeLabelDiv.className = 'col-25';
    var zielgruppeLabel = document.createElement('label');
    zielgruppeLabel.htmlFor = 'myDropdownZ';
    zielgruppeLabel.textContent = 'Zielgruppe';
    zielgruppeLabelDiv.appendChild(zielgruppeLabel);

    var zielgruppeInputDiv = document.createElement('div');
    zielgruppeInputDiv.className = 'col-75';
    var zielgruppeInput = document.createElement('select');
    zielgruppeInput.id = 'myDropdownZ';
    generateDropdownZ(zielgruppeInput),
    zielgruppeInput.value = item.groups;
    zielgruppeInputDiv.appendChild(zielgruppeInput);

    zielgruppeRow.appendChild(zielgruppeLabelDiv);
    zielgruppeRow.appendChild(zielgruppeInputDiv);
    form.appendChild(zielgruppeRow);

    // Create the 'Anfang' and 'Ende' inputs
    var anfangEndeRow = document.createElement('div');
    anfangEndeRow.className = 'row';

    var anfangLabelDiv = document.createElement('div');
    anfangLabelDiv.className = 'col-25';
    var anfangLabel = document.createElement('label');
    anfangLabel.htmlFor = 'anfang';
    anfangLabel.textContent = 'Anfang';
    anfangLabelDiv.appendChild(anfangLabel);

    var anfangInputDiv = document.createElement('div');
    anfangInputDiv.className = 'col-75';
    var anfangInput = document.createElement('input');
    anfangInput.type = 'text';
    anfangInput.id = 'anfang';
    anfangInput.name = 'Anfang';
    anfangInput.value = item.start;
    anfangInputDiv.appendChild(anfangInput);

    var endeLabelDiv = document.createElement('div');
    endeLabelDiv.className = 'col-25';
    var endeLabel = document.createElement('label');
    endeLabel.htmlFor = 'Ende';
    endeLabel.textContent = 'Ende';
    endeLabelDiv.appendChild(endeLabel);

    var endeInputDiv = document.createElement('div');
    endeInputDiv.className = 'col-75';
    var endeInput = document.createElement('input');
    endeInput.type = 'text';
    endeInput.id = 'Ende';
    endeInput.name = 'Ende';
    endeInput.value = item.end;
    endeInputDiv.appendChild(endeInput);

    anfangEndeRow.appendChild(anfangLabelDiv);
    anfangEndeRow.appendChild(anfangInputDiv);
    anfangEndeRow.appendChild(endeLabelDiv);
    anfangEndeRow.appendChild(endeInputDiv);
    form.appendChild(anfangEndeRow);

    // Create the 'Tag' and 'Letzter Termin' inputs
    var tagTerminRow = document.createElement('div');
    tagTerminRow.className = 'row';

    var tagLabelDiv = document.createElement('div');
    tagLabelDiv.className = 'col-25';
    var tagLabel = document.createElement('label');
    tagLabel.htmlFor = 'tag';
    tagLabel.textContent = 'Tag';
    tagLabelDiv.appendChild(tagLabel);

    var tagInputDiv = document.createElement('div');
    tagInputDiv.className = 'col-75';
    var tagInput = document.createElement('input');
    tagInput.type = 'text';
    tagInput.id = 'tag';
    tagInput.name = 'tag';
    tagInput.value = item.dateSpanData.startDate;
    tagInputDiv.appendChild(tagInput);

    var letzterTerminLabelDiv = document.createElement('div');
    letzterTerminLabelDiv.className = 'col-25';
    var letzterTerminLabel = document.createElement('label');
    letzterTerminLabel.htmlFor = 'letzterTermin';
    letzterTerminLabel.textContent = 'Letzter Termin';
    letzterTerminLabelDiv.appendChild(letzterTerminLabel);

    var letzterTerminInputDiv = document.createElement('div');
    letzterTerminInputDiv.className = 'col-75';
    var letzterTerminInput = document.createElement('input');
    letzterTerminInput.type = 'text';
    letzterTerminInput.id = 'letzterTermin';
    letzterTerminInput.name = 'letzterTermin';
    letzterTerminInput.value = item.dateSpanData.endDate;
    letzterTerminInputDiv.appendChild(letzterTerminInput);

    tagTerminRow.appendChild(tagLabelDiv);
    tagTerminRow.appendChild(tagInputDiv);
    tagTerminRow.appendChild(letzterTerminLabelDiv);
    tagTerminRow.appendChild(letzterTerminInputDiv);
    form.appendChild(tagTerminRow);

    // Create the 'Wiederholung' dropdown
    var wiederholungRow = document.createElement('div');
    wiederholungRow.className = 'row';

    var wiederholungLabelDiv = document.createElement('div');
    wiederholungLabelDiv.className = 'col-25';
    var wiederholungLabel = document.createElement('label');
    wiederholungLabel.htmlFor = 'myDropdownW';
    wiederholungLabel.textContent = 'Wiederholung';
    wiederholungLabelDiv.appendChild(wiederholungLabel);

    var wiederholungInputDiv = document.createElement('div');
    wiederholungInputDiv.className = 'col-75';
    var wiederholungInput = document.createElement('select');
    wiederholungInput.id = 'myDropdownW';
    var wiederholungOptionWeekly = document.createElement('option');
    wiederholungOptionWeekly.value = '7';
    wiederholungOptionWeekly.textContent = 'wöchentlich';
    wiederholungInput.appendChild(wiederholungOptionWeekly);
    var wiederholungOptionOnce = document.createElement('option');
    wiederholungOptionOnce.value = '1';
    wiederholungOptionOnce.textContent = 'jeden Tag';
    wiederholungInput.value = item.dateSpanData.repeat;
    wiederholungInput.appendChild(wiederholungOptionOnce);
    wiederholungInputDiv.appendChild(wiederholungInput);

    wiederholungRow.appendChild(wiederholungLabelDiv);
    wiederholungRow.appendChild(wiederholungInputDiv);
    form.appendChild(wiederholungRow);

    // Create the 'Beschreibung' textarea
    var beschreibungRow = document.createElement('div');
    beschreibungRow.className = 'row';

    var beschreibungLabelDiv = document.createElement('div');
    beschreibungLabelDiv.className = 'col-25';
    var beschreibungLabel = document.createElement('label');
    beschreibungLabel.htmlFor = 'beschreibung';
    beschreibungLabel.textContent = 'Beschreibung';
    beschreibungLabelDiv.appendChild(beschreibungLabel);

    var beschreibungInputDiv = document.createElement('div');
    beschreibungInputDiv.className = 'col-75';
    var beschreibungInput = document.createElement('textarea');
    beschreibungInput.id = 'beschreibung';
    beschreibungInput.value = item.description;
    beschreibungInputDiv.appendChild(beschreibungInput);

    beschreibungRow.appendChild(beschreibungLabelDiv);
    beschreibungRow.appendChild(beschreibungInputDiv);
    form.appendChild(beschreibungRow);

    // Append the form to the form div
    formDiv.appendChild(form);

    addContainer.appendChild(formDiv);

    var script = document.createElement('script');
    script.text = `
    document.addEventListener('DOMContentLoaded', function() {
        generateDropdownL();
        generateDropdownR();
    });
    `;

    // Append the script to the document
    //document.body.appendChild(script);
   
    const saveIcon = elementWithClasses("div", "saveIcon");
    saveIcon.innerHTML = "<button id='save' class='saveButton'><i class='material-icons saveIcon'>cloud_upload</i></button>";
    date.appendChild(saveIcon);

    const reset = elementWithClasses ("button", "reset");
    reset.innerText = "Reset";
    date.appendChild(reset);

    const backIcon = elementWithClasses("div", "backIcon");
    backIcon.innerHTML = "<button id='back' class='backButton'><i class='material-icons backIcon'>arrow_back</i></button>";
    date.appendChild(backIcon);


    backIcon.addEventListener("click", () => {
        generateDefault();
    });

    saveIcon.addEventListener("click", () => {
        uploadAdd();
    });

    if(item.id != 0){
        date.appendChild(deleteIcon);
        deleteIcon.addEventListener("click", () => {
            deleteAppointment(item.id);
        })
        reset.addEventListener("click", () => {

            lehrkraftInput.selectedIndex = item.lecturer;
            raumsucheInput.selectedIndex = item.room;
            zielgruppeInput.selectedIndex = item.groups[0];
            wiederholungInput.selectedIndex = item.dateSpanData.repeat;

        });
    }



    addContainer.appendChild(date);

    newMain.appendChild(addContainer);


    if (oldMain !== null) {
        oldMain.replaceWith(newMain);
    }
}


function deleteAppointment(id){
    getJson(URL + `DeleteAppointment?id=${id}`);
    console.log("deleted: ", id);
}

function generateDropdown(){
    const dropdown = document.getElementById("myDropdown");
    dropdown.innerHTML = "<option value='0'>Alle</option>";
    sleep(50);
    const jsonPromise = getJson(URL + "Targetgroups");
    jsonPromise.then(data => {
        data.forEach((item, index) => {
            dropdown.innerHTML += `<option value='${index+1}'>${item}</option>`;
        });
    });

}

function uploadAdd(){
    const appName = document.getElementById("appName1");
    const name = appName.value;    

    const myDropdownL = document.getElementById("myDropdownL");
    const lecturer = Number(myDropdownL.value);

    const myDropdownR = document.getElementById("myDropdownR");
    const room = Number(myDropdownR.value);

    const myDropdownZ = document.getElementById("myDropdownZ");
    const groups = [Number(myDropdownZ.value)];

    const anfang = document.getElementById("anfang");
    const start = anfang.value;

    const Ende = document.getElementById("Ende");
    const end = Ende.value;

    const tag = document.getElementById("tag");
    const startDate = tag.value;

    const letzterTermin = document.getElementById("letzterTermin");
    const endDate = letzterTermin.value;

    const myDropdownW = document.getElementById("myDropdownW");
    const repeat = Number(myDropdownW.value);

    const beschreibung = document.getElementById("beschreibung");
    const description = beschreibung.value;
    
    var id = Number($("#textID").text())

    var dateSpanData = {
        "endDate": endDate,
        "repeat": repeat,
        "startDate": startDate
    };

    var jsonData =  {dateSpanData, description, end, groups, id, lecturer, name, room, start}


    if(id == 0){
        console.log("erschaffe", jsonData);
        PostJson(jsonData, URL + "CreateAppointment");
    }
    else {
        console.log("veraendere", jsonData);
        PostJson(jsonData, URL + "UpdateAppointment");
    }

}


function PostJson(jsonData,url){
    let data = JSON.stringify(jsonData);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    });
}

function getJson(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}


function generateDetails(item) {
    const oldMain = document.querySelector("main"); 
    const newMain = document.createElement("main");
    
    const detailsContainer = elementWithClasses("div", "details");
    const textContainer = elementWithClasses("div", "textContainer");
    const name = document.createElement("h1");

    name.innerText = item.name;

    const text = elementWithClasses("div", "text");

    text.innerHTML = `<br> Beginnt um ${item.start} und endet um ${item.end} <br>
                      Raum: ${item.room} <br>
                      Zielgruppe: ${item.name} <br> 
                      Lehrende Person: ${item.lecturer} <br> 
                      Beschreibung: <br> 
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.details}`
    
    textContainer.appendChild(name);
    textContainer.appendChild(text);

    const button = document.createElement("button");
    button.id = "routeButton";
    button.type = "button";
    button.innerHTML = "<i class='material-icons mapIcon'>map</i> Go to Route";
    button.addEventListener("click", () => {
        generateRoute(item.room);
    });
    
    detailsContainer.appendChild(textContainer);
    detailsContainer.appendChild(button)
    
    newMain.appendChild(detailsContainer);

    if (oldMain !== null) {
        oldMain.replaceWith(newMain);
    }
}

function generateDropdownL(dropdown, indexid){
    //const dropdown = document.getElementById("myDropdownL");
    dropdown.innerHTML = "<option value='0'> Niemand </option>";
    sleep(50);
    const jsonPromise = getJson(URL + "GetLecturers");
    jsonPromise.then(data => {
        data.forEach((item, index) => {
            var option = document.createElement("option");
            option.value = index+1;
            option.text = `${item.firstName} ${item.lastName}`;
            dropdown.add(option);
        });
    });
    window.addEventListener('load', function() {
        dropdown.selectedIndex = 3;
    });
}

function generateDropdownZ(dropdown){
    //const dropdown = document.getElementById("myDropdownZ");
    dropdown.innerHTML = "<option value='0'> Keine </option>";
    sleep(50);
    const jsonPromise = getJson(URL + "Targetgroups");
    jsonPromise.then(data => {
        data.forEach((item, index) => {
            dropdown.innerHTML += `<option value='${index+1}'>${item}</option>`;
        });
    });

}

function generateDropdownR(dropdown){
    //const dropdown = document.getElementById("myDropdownR");
    dropdown.innerHTML = "<option value='0'> Keiner </option>";
    sleep(50);
    const jsonPromise = getJson(URL + "GetRooms");
    jsonPromise.then(data => {
        data.forEach((item, index) => {
            dropdown.innerHTML += `<option value='${index+1}'>${item}</option>`;
        });
    });

}


function sleep(ms) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + ms);
  }

function generateTimeSlot(filter) {
    const timeSlot = elementWithClasses("div", "timeSlot");

    const timeContainer = elementWithClasses("div", "timeContainer");

    timeSlot.appendChild(timeContainer);

    const jsonPromise = getJson(URL + "GetAdminAppointmentIDs");
    jsonPromise.then(appointmentIDs => {
        appointmentIDs.forEach((ID, index) => {
            sleep(50);
            const jsonPromise2 = getJson(URL + `AdminGetAppointment?id=${ID}`);
            jsonPromise2.then(item => {

                if (item.groups.includes(Number(filter)) || filter == "0") {

                    const appointment = elementWithClasses("div", "appointment");

                    const upperContainer = elementWithClasses("div", "upper");
                    const nameContainer = elementWithClasses("div", "name");
                    const dateContainer = elementWithClasses("div", "date");
                    const timeContainer = elementWithClasses("div", "time");

                    const name = document.createElement("h2");
                    const date = document.createElement("h4");
                    const time = document.createElement("h4");

                    name.innerText = item.name;
                    date.innerText = `${item.dateSpanData.startDate} - ${item.dateSpanData.endDate}`;
                    time.innerText = `${item.start} - ${item.end}`;

                    nameContainer.appendChild(name);
                    upperContainer.appendChild(nameContainer)
                    timeContainer.appendChild(time);
                    dateContainer.appendChild(date);
                    appointment.appendChild(upperContainer);
                    appointment.appendChild(dateContainer); 
                    appointment.appendChild(timeContainer);

                    const editIcon = elementWithClasses("div", "editIcon");
                    editIcon.innerHTML = "<button id='edit' class='popo'><i class='material-icons editIcon'>edit</i></button>";
                    upperContainer.appendChild(editIcon);

                    editIcon.addEventListener("click", () => {
                        const timeSlot = elementWithClasses("div", "timeSlot");
                        timeSlot.style.display = 'none';
                        generateAdd(item);
                    });

                    timeSlot.appendChild(appointment); // Moved this line inside the if block
                }
            });
        });
    });
    return timeSlot;
}


const timeSlots = ["8:00", "9:45", "11:30", "14:00", "15:45", "17:15"]
