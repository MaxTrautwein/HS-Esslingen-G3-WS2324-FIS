import pytest
import main
import Appointment
from datetime import date, timedelta, time
import db

# Use the following command to start the database
# docker compose up postgres

@pytest.fixture()
def app():
    app = main.create_app(True)
    app.config.update({
        "TESTING": True,
    })

    # other setup can go here

    yield app

    # clean up / reset resources here


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner("-s")

# Not working at this Point
# Not really sure why
#def test_request_example(client):
#    response = client.get("/TEST")
#
#    assert response.status_code == 200
#    assert 'TEST' == response.data


# Tests if the Constructor of Appointment_Abstract works as Expected
def test_Appointment_Abstract():
    test_id = 1
    test_name = "My Super Cool Appointment"
    test_description = "my Description for my Appointment"
    test_startTime = time(10, 0)
    test_endTime = time(13, 0)
    test_lecturer = 1
    test_room = 2
    test_dateSpan = 1

    abstract_appointment = Appointment.Appointment_Abstract(test_id, test_name, test_description, test_startTime
                                                            , test_endTime, test_lecturer, test_room, test_dateSpan)

    assert abstract_appointment.id == test_id
    assert abstract_appointment.name == test_name
    assert abstract_appointment.description == test_description
    assert abstract_appointment.startTime == test_startTime
    assert abstract_appointment.endTime == test_endTime
    assert abstract_appointment.lecturer == test_lecturer
    assert abstract_appointment.room == test_room
    assert abstract_appointment.dateSpan == test_dateSpan

def test_Appointment_Abstract_to_json():
    test_id = 1
    test_name = "My Super Cool Appointment"
    test_description = "my Description for my Appointment"
    test_startTime = time(10, 0)
    test_endTime = time(13, 0)
    test_lecturer = 1
    test_room = 2
    test_dateSpan = 1

    abstract_appointment = Appointment.Appointment_Abstract(test_id, test_name, test_description, test_startTime
                                                            , test_endTime, test_lecturer, test_room, test_dateSpan)

    abstract_appointment_json = abstract_appointment.toJson()

    assert abstract_appointment_json["id"] == test_id
    assert abstract_appointment_json["name"] == test_name
    assert abstract_appointment_json["description"] == test_description
    assert abstract_appointment_json["start"] == test_startTime.strftime("%H:%M")
    assert abstract_appointment_json["end"] == test_endTime.strftime("%H:%M")
    assert abstract_appointment_json["lecturer"] == test_lecturer
    assert abstract_appointment_json["room"] == test_room
    assert abstract_appointment_json["dateSpan"] == test_dateSpan


def test_Appointment(mocker):
    test_id = 1
    test_name = "My Super Cool Appointment"
    test_description = "my Description for my Appointment"
    test_startTime = time(10, 0)
    test_endTime = time(13, 0)
    test_lecturer = 1
    test_room = 2
    test_dateSpan = 1
    test_canceled = False
    test_roomName = "Test Room Name"

    abstract_appointment = Appointment.Appointment_Abstract(test_id, test_name, test_description, test_startTime
                                                            , test_endTime, test_lecturer, test_room, test_dateSpan)

    test_today = date.today()
    test_db = db.Database(mock=True)

    # Now we need to patch the Calls to the Database with the pytest-mocking
    mocker.patch('db.Database.IsAppointmentCanceld').return_value = test_canceled
    mocker.patch('db.Database.GetRoomName').return_value = test_roomName


    appointment = Appointment.Appointment(abstract_appointment,test_today, test_db)

    assert appointment.id == test_id
    assert appointment.name == test_name
    assert appointment.description == test_description
    assert appointment.startTime == test_startTime
    assert appointment.endTime == test_endTime
    assert appointment.lecturer == test_lecturer
    assert appointment.room == test_room
    assert appointment.roomName == test_roomName
    assert appointment.canceled == test_canceled
    assert appointment.date == test_today
