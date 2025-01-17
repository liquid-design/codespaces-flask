from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", title="Interactive Historical Timeline")

@app.route("/timeline")
def timeline():
    return render_template("timeline.html", title="Timeline")

if __name__ == '__main__':
    app.run(debug=True)