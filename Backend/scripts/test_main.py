import pytest
import main
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


def test_request_example(client):
    response = client.get("/TEST")

    assert response.status_code == 200
    assert 'TEST' == response.data
    #

# Sanity Check Testing should work
def test_TestingTests():
    data = main.TestingTests()
    assert 'TEST' == data
