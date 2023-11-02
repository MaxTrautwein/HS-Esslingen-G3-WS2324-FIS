import logging
from flask import Flask, request, jsonify, render_template, abort, redirect
from flask_cors import CORS
from datetime import datetime


logger = logging.getLogger('FIS')
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

ch.setFormatter(formatter)
logger.addHandler(ch)

app = Flask(__name__)
CORS(app)

@app.route('/')
def GetAppointments():
    return render_template('index.html')

@app.route('/Login', methods=['POST', 'GET'])
def GetLogin():
    if request.method == 'POST':
        Username = request.form['username']
        Password = request.form['password']
        return render_template('canceled.html')
        
    else:
        return render_template('login.html')


@app.route('/canceled')
def GetCanceled():
    return render_template('canceled.html')

@app.route('/Lecturer')
def GetLecturer():
    return render_template('lecturer.html')

@app.route('/Admin')
def GetAdmin():
    return render_template('admin.html')

