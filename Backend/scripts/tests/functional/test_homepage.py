import logging
from flask import Flask, request, jsonify, render_template, abort
from flask_cors import CORS
from datetime import datetime
import main

def test_GetLogin():


    flask_app = Flask('flask_test')

    with flask_app.test_client() as test_client:
        response = test_client.get('/Login')
        assert response.status_code == 200 or response.status_code == 304