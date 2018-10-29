import atexit, os, datetime
from flask import Flask, request, render_template, jsonify
from flask_pymongo import PyMongo
from apscheduler.schedulers.background import BackgroundScheduler
app = Flask(__name__)

# Override with env variables
app.config["MONGO_URI"] = "mongodb://localhost:27017/freshducks"
mongo = PyMongo(app)

# For whitelisting dicts
dictfilt = lambda x, y: dict([ (i,x[i]) for i in x if i in set(y) ])
whitelist = ("food", "number", "repeat", "weight", "where")

# Cron task to copy any record marked with "repeat" at midnight
def repeat_sced():
    for log in mongo.db.logs.find({"repeat": True}):
        today = datetime.datetime.now()
        date = log['date']
        log = dictfilt(log, whitelist)
        # Replace record date with todays date
        log['date'] = date.replace(year=today.year, month=today.month, day=today.day)
        log['repeat'] = False
        mongo.db.logs.insert_one(log)

sched = BackgroundScheduler(daemon=True)
sched.add_job(repeat_sced, trigger="cron", hour="0", minute="0")
sched.start()

@app.route("/")
def index():
    # React Payload
    return render_template("index.html")

@app.route("/logs", methods=["GET", "POST"])
def log():
    # Index
    if request.method == "GET":
        # Retrieve all data
        logData = list(mongo.db.logs.find({}, projection={'_id': False}))
        return jsonify(logData), 200

    data = request.get_json()
    # New Log Entry
    if request.method == "POST":
        time = data['time'].split(':')
        data = dictfilt(data, whitelist)
        # Force date to current day
        data['date'] = datetime.datetime.now().replace(hour=int(time[0]), minute=int(time[1]))
        result = mongo.db.logs.insert_one(data)
        return jsonify(success=result.acknowledged), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=os.environ.get("PORT", 3000))