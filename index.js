import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGWsXyqim_n41O-7UNwW3XVbmdngTwRV8",
  authDomain: "iot-project-4135a.firebaseapp.com",
  databaseURL: "https://iot-project-4135a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-project-4135a",
  storageBucket: "iot-project-4135a.appspot.com",
  messagingSenderId: "887843436386",
  appId: "1:887843436386:web:9a021f3372b2b155fc9e3b",
  measurementId: "G-Q5QX27KC2G"
};

const app = firebase.initializeApp(firebaseConfig);


const database=firebase.database(app)


database.ref('/').once('value',function (snapshot){
    let data=snapshot.val();
    console.log(data);
})


const outputElement=document.querySelector('.output')

const card=document.createElement('div');
card.classList.add('card');




// ... (Your existing code)



// ... (Your existing code)

const temperatureCard = document.createElement('div');
temperatureCard.classList.add('card1');
temperatureCard.innerHTML = '<h2>Temperature Data</h2>';
outputElement.appendChild(temperatureCard);

const humidityCard = document.createElement('div');
humidityCard.classList.add('card2');
humidityCard.innerHTML = '<h2>Humidity Data</h2>';
outputElement.appendChild(humidityCard);

database.ref('/').once('value', function(snapshot) {
  let data = snapshot.val();
  console.log(data);

  // Clear previous data
  temperatureCard.innerHTML = '<h2><u><b>Temperature Data</h2>';
  humidityCard.innerHTML = '<h2><u><b>Humidity Data</h2>';

  let i=1;

  // Iterate through the fetched data
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      // Create a list item for each data entry
      let listItem = document.createElement('div');
      listItem.textContent = `${i++}.    Name: ${data[key].name}, Address: ${data[key].address}`;

      if (data[key].temperature) {
        // Display temperature data in the temperature card
        let temperatureItem = document.createElement('p');
        temperatureItem.textContent = `Temperature: ${data[key].temperature}`;
        temperatureCard.appendChild(listItem.cloneNode(true)); // Clone name and address
        temperatureCard.appendChild(temperatureItem);
      }

      if (data[key].humidity) {
        // Display humidity data in the humidity card
        let humidityItem = document.createElement('p');
        humidityItem.textContent = `Humidity: ${data[key].humidity}`;
        humidityCard.appendChild(listItem.cloneNode(true)); // Clone name and address
        humidityCard.appendChild(humidityItem);
      }
    }
  }
});

