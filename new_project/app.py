from flask import Flask, render_template, jsonify
import firebase_admin
from firebase_admin import credentials, db

app = Flask(__name__)

# Replace the following with your Firebase project credentials
cred = credentials.Certificate("path/to/your/firebase/credentials.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://your-project-id.firebaseio.com/'
})

# Route to store data in Firebase
@app.route('/store_data', methods=['GET'])
def store_data():
    try:
        # Reference to your database
        ref = db.reference('/user_data')  # Change 'user_data' to the desired path in your database

        # Sample user data with temperature and humidity
        user_data = {
            'user1': {
                'Temperature': 25.5,
                'Humidity': 60
            },
            'user2': {
                'Temperature': 22.0,
                'Humidity': 55
            }
        }

        # Set the user data in the database
        ref.set(user_data)

        return 'Data stored successfully!'
    except Exception as e:
        return str(e), 500

# Route to fetch data from Firebase
@app.route('/fetch_data', methods=['GET'])
def fetch_data():
    try:
        # Reference to your database
        ref = db.reference('/user_data')  # Change 'user_data' to the path where your data is stored

        # Fetch data
        data = ref.get()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to serve the HTML page
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
