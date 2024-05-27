# In development

This project was started on 23/03/2024 and is currently being worked on. It will be similar to the mobile app at https://github.com/adammarszalek22/pl but I'm hoping to improve the UI and add more features in the server as I go along (https://github.com/adammarszalek22/pl-server).

For now the HTML and CSS files are a simple design as I'm focusing on functionality first.

# TODOS - done

- Setup the main structure of the webserver - done
- Decide where and how to store access token (server or localStorage) - done (storing it with sessionId on the server)
- Create and test login and registration functionality as well as page routing once login is successful - done
- Add data caching for faster page loading - done

# TODOS

- Add documentation to each api call function that communicates with the python pl server (params and what it returns)

- Leaderboards,
- Mini-leagues,
- FootballDData class has to be initialized every few minutes?
- Main page should have the content of ('My scores', 'My guesses', 'Leaderboard' and 'My Leagues') all in one
- research and decide on what needs to be logged to the console in the server
- improve the top-bar

- Currently the UI for login and registration was copied from another source, will implement at the very end to match the UI of the whole website

# Ideas

- Add more interesting things, such as guessing goal scorers, etc. (basically anything that's in a betting app)
- Everyone to be able to see other people's guesses once they submitted their own? (or maybe when the gameweek has finished)
- There is a lot of data on FPL API (or other apis) available so can display plenty of useful information about various games
    - maybe create an algorithm to calculate probability of the team winning a match?
    - create a statistics page