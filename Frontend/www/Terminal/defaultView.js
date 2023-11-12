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
    const oldMain = document.querySelector("main"); 
    const newMain = document.createElement("main");

    const cancelledContainer = elementWithClasses("div", "cancelledContainer")
    const date = document.createElement("h1");
    const currentDate = new Date();
    date.innerText = `Heute ist der ${currentDate.getDate()}.${currentDate.getMonth()+1}.${currentDate.getFullYear()} \n ausfallende Termine:`;
    cancelledContainer.appendChild(date);

    const jsonPromise = getJson(URL + "CanceledApp?dur=12");
    jsonPromise.then(data => {
        data.forEach((item, index) => {
            if(item.canceld){
                const appointment = elementWithClasses("div", "cancelledAppointment");
                cancelledContainer.appendChild(appointment)
    
                const nameContainer = elementWithClasses("div", "name");
                const name = document.createElement("h2");
                name.innerText = item.name;
                const date = document.createElement("h3");
                date.innerText = item.date;
                nameContainer.appendChild(name);
                nameContainer.appendChild(date);
                appointment.appendChild(nameContainer);
    
    
                appointment.addEventListener("click", () => {
                    generateDetails(item);
                });
            }
        });
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

    const jsonPromise = getJson(URL + "GetLecturers");
    jsonPromise.then(appointments => {
        lecturerFirstName = appointments[item.lecturer].firstName;
        lecturerLastName = appointments[item.lecturer].lastName;
    });

    const jsonPromise2 = getJson(URL + "Targetgroups");
    jsonPromise2.then(appointments => {
        group = appointments[item.groups[0]]
    });

    text.innerHTML = `<br> Beginnt um ${item.start} und endet um ${item.end} <br>
                      Raum: ${item.room} <br>
                      Zielgruppe: ${group} <br> 
                      Lehrende Person: ${lecturerFirstName} ${lecturerLastName}<br> 
                      Beschreibung: <br> 
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.description}`
    
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

function sleep(ms) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + ms);
  }

function generateTimeSlot(number, filter) {
    const timeSlot = elementWithClasses("div", "timeSlot");

    const timeContainer = elementWithClasses("div", "timeContainer");
    const h1 = document.createElement("h1");
    text = timeSlots[number];

    h1.innerText = text;

    timeContainer.appendChild(h1);
    timeSlot.appendChild(timeContainer);

    sleep(30);
    const jsonPromise = getJson(URL + "AppointmentsToday");
    jsonPromise.then(appointments => {
        appointments.forEach((item, index) => {
            if((timeSlots[number] == item.start && item.groups.includes(Number(filter))) || (timeSlots[number] == item.start && filter == "all") ){
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
            dropdown.innerHTML += `<option value='${index}'>${item}</option>`;
        });
    });

}

const timeSlots = ["8:00", "9:45", "11:30", "14:00", "15:45", "17:15"]