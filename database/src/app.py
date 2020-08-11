
from flask import Flask, request
from flask_cors import CORS

import json
import db

# define dp
app = Flask(__name__)
db_filename = "tax.db"

DB = db.DatabaseDriver()
CORS(app)


# config
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///%s" % db_filename
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.config["SQLALCHEMY_ECHO"] = True

# # initialize app
# db.init_app(app)
# with app.app_context():
#     db.create_all()


def success_response(data, code=200):
    return json.dumps({"success": True, "data": data}), code


def failure_response(message, code=404):
    return json.dumps({"success": False, "error": message}), code


def check_key(key, body):
    for a in key:
        print(a)
        inn = body.get(a, -1)
        # print(inn)
        if inn is -1:
            print("key not found is" + str(a))
            return False, "key not found is" + str(a)
    return True, "no error"


@app.route("/taxrate/<int:zip>/")
def get_rate(zip):
    # args = request.args
    # key = ("zip")
    # check_args = check_key(key, args)
    # if not check_args:
    #     return failure_response("incomplete information")

    result = DB.get_tax_info(zip)
    if result is not None:
        return success_response(result)
    return failure_response("zip code is invalid")


@app.route("/report/", methods=["POST"])
def post_report():
    body = json.loads(request.data)
    key = ("title", "message", "email")
    checkkey, error = check_key(key, body)

    if not checkkey:
        return failure_response(error)
    title = body["title"]
    message = body["message"]
    email = body["email"]
    report_id = DB.add_report(title, message, email)
    return success_response(DB.get_report_by_id(report_id))


@app.route("/admin/api/process_report/10511114850/<int:report_id>/", methods=["POST"])
def process_report(report_id):
    body = json.loads(request.data)
    key = ("processed",)  # solution is optional
    checkkey, error = check_key(key, body)
    if not checkkey:
        return failure_response(error)
    processed = body["processed"]
    solution = body.get('solution', None)
    if solution is None:
        solution = ""
    record = DB.get_report_by_id(report_id)
    if record is None:
        return failure_response("report id not found")
    print(record)
    DB.update_report(report_id, processed, solution)
    return success_response(DB.get_report_by_id(report_id))


@app.route("/admin/api/get_report/10511114850/viewnum/<int:report_amount>/")
def get_reports(report_amount):
    result = DB.get_latest_report(report_amount)
    if result is not None:
        return success_response(result)
    # don't know when will this happend
    return failure_response("sorry something happen can't process")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
