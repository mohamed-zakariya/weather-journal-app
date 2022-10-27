/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const apiKey = '3d660c8075b1af54064cd058b5331441';
// 22206
const tempElement = document.getElementById('temp');
const dateElement  = document.getElementById('date');
const contElement = document.getElementById('content');

function performeAction(e){
    const userResponse = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
    
    // get Data from WebJournalApp
    getData(urlApi)
    // post Data to Server (ProjectData)
    .then(function(temp){
        postData('/dataRepresent' , {
            temptaure: String(temp) ,
            date: newDate , 
            userResponse: userResponse
        });
    })
    // get data from projectData
    .then( async () =>{
        try{
            const res = await fetch('/addData');
            const data = await res.json();
            return data;
        }catch(error){}
    })
    // Update UI
    .then( data => {
        updateUi(data);
    })

}

// updateUi
const updateUi = (data) => {

    dateElement.innerHTML = data.date;
    tempElement.innerHTML = data.temptaure;
    contElement.innerHTML = data.userResponse;
}


const getData = async(url) => {
    const res = await fetch(url);
    try{
        const data = await res.json();
        const temptaure = data.main.temp;
        return temptaure;
    }catch(error){
        console.log("error",error);
    }
};

const postData = async(url = '' , data = {}) =>{
    const response = await fetch(url , {
        method: 'post',
        credentials: 'same-origin',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try{
        const data = await response.json();
        return data;
    }catch(error){
        console.log("error",error);
    }
};


document.getElementById('generate').addEventListener('click' , performeAction);
