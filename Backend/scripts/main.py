import logging
from flask import Flask, request, jsonify, render_template, abort, redirect
from flask_cors import CORS
from datetime import datetime
import db
import Appointment
import json

logger = logging.getLogger('FIS')
logger.setLevel(logging.DEBUG)

ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

ch.setFormatter(formatter)
logger.addHandler(ch)

app = Flask(__name__)
CORS(app)

Database = db.Database()

@app.route('/')
def GetAppointments():
    return render_template('index.html')

@app.route('/Login', methods=['POST', 'GET'])
def GetLogin():
    if request.method == 'POST':
        Username = request.form['username']
        Password = request.form['password']
        return redirect()#hier nach merch die auf webserver redirecten
        
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


@app.get("/Appointments")
def GetAppointmentsList():
    id = request.args.get('id')
    if (id is None):
        logger.info(request)
        abort(400)
    data = []
    
    Apps =  Database.GetAllAppointmetsFor(id)

    for ap in Apps:
        data.append(ap.toJson())
    
    return data


@app.route('/UpdateCanceled', methods=['POST'])
def UpdateCanceled():
    content = request.json
    Database.UpdateCanceled(content["canceled"],content["id"],datetime.strptime(content["date"], "%d.%m.%Y"))
    return {}



@app.get("/AppointmentsToday")
def GetAppointmentsToday():
    data = []
    Apps =  Database.GetAllAppointmetsToday()
    
    for ap in Apps:
        data.append(ap.toJson())
    return data


@app.get("/Targetgroups")
def GetTargetgroups():
    return Database.GetAllGroups()

@app.get("/CanceledApp")
def GetCanceledApps():
    id = request.args.get('dur')
    return "TODO"