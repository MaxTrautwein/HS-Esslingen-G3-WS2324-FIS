import logging
from flask import Flask, request, jsonify, render_template, abort, redirect
from flask_cors import CORS
from datetime import datetime
import pytest

app = Flask(__name__)

@pytest.fixture()
def test_request(app):
    responce = app.get("/Login")
    assert response.status_code == 200 or response.status_code == 304