from flask import Flask, render_template
import pandas as pd
import wikipediaapi

app = Flask(__name__)

# Set up Wikipedia API with a user agent
wiki_wiki = wikipediaapi.Wikipedia(
    language='en',
    extract_format=wikipediaapi.ExtractFormat.WIKI,
    user_agent="HistoricalTimelineApp/1.0 (info@liquid-design.be)"
)

def get_wikipedia_summary(event):
    page = wiki_wiki.page(event)
    return page.summary if page.exists() else "No summary available."

@app.route("/")
def home():
    return render_template("index.html", title="Interactive Historical Timeline")

@app.route("/timeline")
def timeline():
    data = pd.read_csv('historical_events.csv')
    events = data.to_dict(orient='records')
    for event in events:
        event['summary'] = get_wikipedia_summary(event['event'])
    return render_template("timeline.html", title="Timeline", events=events)

if __name__ == '__main__':
    app.run(debug=True)
