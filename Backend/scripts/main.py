import logging
from flask import Flask, request, jsonify, render_template, abort
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

@app.get('/Appointments')
def GetAppointments():
    logger.warning("TODO")
    return "TODO"

