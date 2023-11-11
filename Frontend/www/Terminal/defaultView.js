const URL = "http://localhost:5000/"

window.addEventListener('load', () => defaultView.init());

const defaultView = {
    init() {
        const body = document.body;

        const main = generateDefault("all");
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
    
    for(let i=0; i<6; i++){
        const timeSlot = generateTimeSlot(i, filter);
        newMain.appendChild(timeSlot);
    }

    if (oldMain !== null) {
        oldMain.replaceWith(newMain);
    }
    else {
        return newMain;
    }
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

function generateCancelled() {
    const jsonPromise = getJson(URL + "CanceledApp?dur=7");
    jsonPromise.then(data => {
        data.forEach((item, index) => {
            // Your logic for each item here
            console.log(item); // Example: printing each item to the console
        });
    });
}


function generateCanceslled() {
    const oldMain = document.querySelector("main"); 
    const newMain = document.createElement("main");

    const cancelledContainer = elementWithClasses("div", "cancelledContainer")
    const date = document.createElement("h1");
    const currentDate = new Date();
    date.innerText = `${currentDate.getDate()}.${currentDate.getMonth()+1}.${currentDate.getFullYear()} ausfallende Termine:`;
    cancelledContainer.appendChild(date);


    cancelled.forEach((item, index) => {
        if(item.canceld){
            const appointment = elementWithClasses("div", "cancelledAppointment");
            cancelledContainer.appendChild(appointment)

            const nameContainer = elementWithClasses("div", "name");
            const name = document.createElement("h2");
            name.innerText = item.name;
            nameContainer.appendChild(name);
            appointment.appendChild(nameContainer);


            appointment.addEventListener("click", () => {
                generateDetails(item);
            });
        }
            
    });
    

    newMain.appendChild(cancelledContainer);

    if (oldMain !== null) {
        oldMain.replaceWith(newMain);
    }
}


function generateRoute(room) {
    const oldMain = document.querySelector("main"); 
    const newMain = document.createElement("main");
    

    const routeContainer = elementWithClasses("div", "routeContainer");
    const imageContainer1 = elementWithClasses("div", "imageContainer");
    const textContainer = elementWithClasses("div", "routeMiddleContainer");
    const imageContainer2 = elementWithClasses("div", "imageContainer");

    const image1 = document.createElement("img");
    image1.src = "images/route1.png";
    imageContainer1.appendChild(image1);

    const title = elementWithClasses("div", "title");
    const titleRoute = document.createElement("h2");
    titleRoute.innerText = "Route";
    title.appendChild(titleRoute);

    const roomName = document.createElement("h1");
    roomName.innerText = room;
    title.appendChild(roomName);
    textContainer.appendChild(title);

    const direction = document.createElement("h3");
    direction.innerHTML = "Aufzug nach Stock 1 <br> -------------------------------------->";
    textContainer.appendChild(direction);

    const routeSetting = elementWithClasses("div", "routeSetting");
    const setting1 = elementWithClasses("div", "setting1");
    const setting2 = elementWithClasses("div", "setting2");

    setting1.innerHTML = "<i class='material-icons settingIcon'>directions_walk</i>";
    setting2.innerHTML = "<i class='material-icons settingIcon'>accessible_forward</i>";

    routeSetting.appendChild(setting1);
    routeSetting.appendChild(setting2);
    textContainer.appendChild(routeSetting);

    const image2 = document.createElement("img");
    image2.src = "images/route2.png";
    imageContainer2.appendChild(image2);

    routeContainer.appendChild(imageContainer1);
    routeContainer.appendChild(textContainer);
    routeContainer.appendChild(imageContainer2);

    newMain.appendChild(routeContainer);

    if (oldMain !== null) {
        oldMain.replaceWith(newMain);
    }
    else {
        return newMain;
    }
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

function generateTimeSlot(number, filter) {
    const timeSlot = elementWithClasses("div", "timeSlot");

    const timeContainer = elementWithClasses("div", "timeContainer");
    const h1 = document.createElement("h1");
    text = timeSlots[number];

    h1.innerText = text;

    timeContainer.appendChild(h1);
    timeSlot.appendChild(timeContainer);

    const jsonPromise = getJson(URL + "AppointmentsToday");
    jsonPromise.then(appointments => {
        appointments.forEach((item, index) => {
            if((timeSlots[number] == item.start && filter == item.name) || (timeSlots[number] == item.start && filter == "all") ){
                const appointment = elementWithClasses("div", "appointment");
                if(item.canceld){
                    appointment.classList.add("cancelled");
                }

                const nameContainer = elementWithClasses("div", "name");
                const roomContainer = elementWithClasses("div", "room");
                const name = document.createElement("h2");
                const room = document.createElement("h3");
                name.innerText = item.name;
                room.innerText = item.room;
                nameContainer.appendChild(name);
                roomContainer.appendChild(room);
                appointment.appendChild(nameContainer);
                appointment.appendChild(roomContainer);

                appointment.addEventListener("click", () => {
                    generateDetails(item);
                });

                timeSlot.appendChild(appointment)
            }
        });
    });
    return timeSlot;
}


function generateDropdown(){
    const dropdown = document.getElementById("myDropdown");
    dropdown.innerHTML = "<option value='all'>Alle</option>";
    const jsonPromise = getJson(URL + "Targetgroups");
    jsonPromise.then(data => {
        data.forEach((item, index) => {
            dropdown.innerHTML += `<option value='${item}'>${item}</option>`;
        });
    });

}

const Appointments = [
    {
        id: 1,
        name:"SWB1",
        date:"Donnerstag 12.Oct",
        start:"8:00",
        end:"12:15",
        details:"Some Sample text, idk",
        room:"F1.401",
        lecturer:"Der Große Obama",
        canceld:false
    },{
        id: 2,
        name:"SWB4",
        date:"Donnerstag 12.Oct",
        start:"9:45",
        end:"12:15",
        details:"Some Other Sample text, idk",
        room:"F1.201",
        lecturer:"Bach",
        canceld:true
    },{
        id: 3,
        name:"SWB5",
        date:"Donnerstag 12.Oct",
        start:"14:00",
        end:"12:15",
        details:"Some Sample text, idk",
        room:"F1.431",
        lecturer:"Deine Mum, lol",
        canceld:false
    },{
        id: 4,
        name:"SWB2",
        date:"Donnerstag 12.Oct",
        start:"17:15",
        end:"12:15",
        details:"Some Sample text, idk",
        room:"F1.121",
        lecturer:"Hallo",
        canceld:false
    },{
        id: 5,
        name:"SWB2",
        date:"Donnerstag 12.Oct",
        start:"17:15",
        end:"12:15",
        details:"Some Sample text, idk",
        room:"F1.151",
        lecturer:"o7",
        canceld:true
    },{
        id: 6,
        name:"SWB3",
        date:"Donnerstag 12.Oct",
        start:"14:00",
        end:"00:00",
        details:"Dominik, isst den Hund :(  (Nicht streicheln, er lügt, glaubt ihm nicht)",
        room:"F10.965",
        lecturer:"Maja",
        canceld:true
    }

];

const timeSlots = ["8:00", "9:45", "11:30", "14:00", "15:45", "17:15"]
