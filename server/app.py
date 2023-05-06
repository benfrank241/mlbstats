from flask import Flask, jsonify
from flask_cors import CORS
import requests
import feedparser
from bs4 import BeautifulSoup
import json

app = Flask(__name__)
CORS(app)

@app.route('/player/<player_id>')
def get_player_info(player_id):
    url = "https://statsapi.mlb.com/api/v1/people/" + player_id

    response = requests.get(url)

    if response.status_code == 200:
        # The request was successful
        data = response.json()
        return jsonify(data)
    else:
        # There was an error
        return "Error: " + str(response.status_code)
    


@app.route('/player/<player_id>/stats')
def get_player_stats(player_id):
    url = "https://statsapi.mlb.com/api/v1/people/" + player_id + "?hydrate=stats(group=[hitting,pitching,fielding],type=[yearByYear])"

    response = requests.get(url)

    if response.status_code == 200:
        # The request was successful
        data = response.json()
        return jsonify(data)
    else:
        # There was an error
        return "Error: " + str(response.status_code)
    

@app.route('/standings/test', methods=['GET'])
def standings():
    url = f"https://statsapi.mlb.com/api/v1/standings?leagueId=103,104"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
     
        return jsonify(data)
    else:
        return "Error: could not retrieve standings", 500
    

@app.route('/standings/testing', methods=['GET'])
def standing():
    url = f"https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&division=AL%20East"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
      
        return jsonify(data)
    else:
        return "Error: could not retrieve standings", 500
    

@app.route('/news')
def get_news():
    response = requests.get('https://www.mlb.com/feeds/news/rss.xml?_gl=1*9ysbo7*_gcl_aw*R0NMLjE2ODA3NDY1MDIuQ2owS0NRand1TFNoQmhDX0FSSXNBRm9kNGZKNzZSdzcwbFI4bE9yTWdUWEo2S0xFU0xQSjVqLXJ3NzNicGdpN1M4VWVKdkh4ZXVjRGsxNGFBbnRlRUFMd193Y0I.*_gcl_dc*R0NMLjE2ODA3NDY1MDIuQ2owS0NRand1TFNoQmhDX0FSSXNBRm9kNGZKNzZSdzcwbFI4bE9yTWdUWEo2S0xFU0xQSjVqLXJ3NzNicGdpN1M4VWVKdkh4ZXVjRGsxNGFBbnRlRUFMd193Y0I.')
    soup = BeautifulSoup(response.content, 'xml')

    articles = []


    for item in soup.find_all('item'):
        title = item.find('title').text
        link = item.find('link').text
        author = item.find('dc:creator').text
        pub_date = item.find('pubDate').text
        img_tag = item.find('image')
        img_url = img_tag['href'] if img_tag else None

        articles.append({
            'title': title,
            'url': link,
            'author': author,
            'date': pub_date[0:11],
            'img': img_url
        })
    return jsonify({'articles': articles})


@app.route('/roster/<team_id>', methods=['GET'])
def roster(team_id):
    url = f"https://statsapi.mlb.com/api/v1/teams/" + team_id + "/roster/Active?hydrate=person(stats(type=season))"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
      
        return jsonify(data)
    else:
        return "Error: could not retrieve standings", 500

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    url = f"https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=hits,homeRuns,stolenBases,runsBattedIn,strikeouts,earnedRunAverage,battingAverage,saves&hydrate=person,team&limit=10&season=2023&sortColumn=hits&sortOrder=desc"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
      
        return jsonify(data)
    else:
        return "Error: could not retrieve standings", 500


    

    


if __name__ == '__main__':
    app.run(debug=True)



