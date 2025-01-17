from flask import Flask, render_template
import pandas as pd

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", title="Interactive Historical Timeline")

@app.route("/timeline")
def timeline():
    data = pd.read_csv('historical_events.csv')
    events = data.to_dict(orient='records')
    return render_template("timeline.html", title="Timeline", events=events)

if __name__ == '__main__':
    app.run(debug=True)
