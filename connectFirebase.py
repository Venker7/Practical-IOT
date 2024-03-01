import firebase_admin
from firebase_admin import credentials, db

# Initialize Firebase with your credentials
cred = credentials.Certificate('firebase.json')
firebase_admin.initialize_app(cred, {'databaseURL': 'https://iot-project-4135a-default-rtdb.asia-southeast1.firebasedatabase.app/'})

# Reference to your Realtime Database
root_ref = db.reference('/')

def inputform():
    name=input("Enter Your Name:- ");
    address=input("Enter your Address:- ");
    humidity=input("Enter humidity:- ");
    temperature=input("Enter temperature:- ");
    addRegistration(name,address,humidity,temperature)



def addRegistration(name,address,humidity,temperature):
    root_ref.push({
        "name":name,
        "address":address,
        "humidity":humidity,
        "temperature":temperature
    })
    print("Registration added");
    inputform();

inputform();    