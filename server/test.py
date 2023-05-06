import requests

url = "https://statsapi.mlb.com/api/v1/standings?leagueId=103,104"

response = requests.get(url)

if response.status_code == 200:
    # The request was successful
    data = response.json()
    print(data)
else:
    # There was an error
    print("Error:", response.status_code)
