from flask import Flask, request, jsonify
from CRUD import *

crud_dict = {
    "POST": POST,
    "GET": GET
}

app = Flask(__name__)

@app.route("/", methods = ["GET"])
def index():
    with open("Notepad.html") as notepad:
        html = notepad.read()
    return html, 200

@app.route("/api/", methods = ["POST", "GET", "PATCH", "DELETE"])
def api():
    result = ["", 404]
    try:
        args = request.get_json()
    except:
        args = {}
    if request.method == "POST":
        result = POST(args.get('db_id'), args.get('db_title'), args.get('db_description'), args.get('db_time'))
    if request.method == "GET":
        try:
            result = GET(args.get('db_id'))
        except KeyError:
            pass
    if request.method == "PATCH":
        result = PATCH(args.get('db_id'), args.get('db_title'), args.get('db_description'))
    if request.method == "DELETE":
        result = DELETE(args.get('db_id'))
    return jsonify(message = result[0], status = result[1], mimetype = "application/json")

if(__name__ == "__main__"):
    app.run(debug=True)