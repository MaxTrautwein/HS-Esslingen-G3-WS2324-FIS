import logging
from flask import Flask, request, jsonify, render_template, abort, redirect, g
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


def create_app(testing=False):
    _app = Flask(__name__)
    CORS(_app)
    if testing:
        app.add_url_rule("/TEST", view_func=TestingTests)
    return _app



app = create_app()


@app.before_request
def InitDB():
    g.Database = db.Database()


@app.after_request
def DeinitDB(data):
    g.Database.DeInit()
    return data

@app.route('/')
def GetAppointments():
    return render_template('index.html')


@app.route('/Login', methods=['POST', 'GET'])
def GetLogin():
    if request.method == 'POST':
        Username = request.form['username']
        Password = request.form['password']
        return redirect()  # hier nach merch die auf webserver redirecten

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

    Apps = g.Database.GetAllAppointmetsFor(id)

    for ap in Apps:
        data.append(ap.toJson())

    return data


@app.route('/UpdateCanceled', methods=['POST'])
def UpdateCanceled():
    content = request.json
    g.Database.UpdateCanceled(content["canceled"], content["id"], datetime.strptime(content["date"], "%d.%m.%Y"))
    return {}


@app.get("/AppointmentsToday")
def GetAppointmentsToday():
    data = []
    Apps = g.Database.GetAllAppointmetsToday()

    for ap in Apps:
        data.append(ap.toJson())
    return data


@app.get("/Targetgroups")
def GetTargetgroups():
    return g.Database.GetAllGroups()


@app.get("/CanceledApp")
def GetCanceledApps():
    duration = request.args.get('dur')
    if (duration is None):
        logger.info(request)
        abort(400)

    data = []
    Apps = g.Database.GetAllCanceldAppointmetsForNDays(int(duration))

    for ap in Apps:
        data.append(ap.toJson())
    return data


@app.get("/GetRooms")
def GetRooms():
    return g.Database.GetAllRooms()


@app.route('/UpdateAppointment', methods=['POST'])
def UpdateAppointment():
    content = request.json
    # I'm a bit lazy here, if this was a bigger project i should implement a proper Update
    g.Database.DeleateFullAppointment(content['id'])
    AppID = g.Database.CreateAppointment(content)
    return {"Updated": AppID}


@app.route('/CreateAppointment', methods=['POST'])
def CreateAppointment():
    content = request.json
    AppID = g.Database.CreateAppointment(content)
    return {"Created": AppID}


@app.get("/GetLecturers")
def GetLecturers():
    return g.Database.GetAllLecturers()


@app.get("/AdminGetAppointment")
def GetAdminAppointmentData():
    id = request.args.get('id')
    if (id is None):
        logger.info(request)
        abort(400)
    App = g.Database.GetAppointmentByID(id)
    App.resolveTargetGroups(g.Database)
    AppJson = App.toJson()
    AppJson["dateSpanData"] = g.Database.GetDateSpanByID(AppJson["dateSpan"])
    return AppJson


@app.get("/DeleteAppointment")
def DeleteAppointment():
    id = request.args.get('id')
    if (id is None):
        logger.info(request)
        abort(400)
    g.Database.DeleateFullAppointment(id)
    return {}


@app.get("/GetAdminAppointmentIDs")
def GetAdminAppointmentIDs():
    return g.Database.GetAllAppointmentsForAdminDefault()

@app.get("/TEST")
def TestingTests():
    return "TEST"
