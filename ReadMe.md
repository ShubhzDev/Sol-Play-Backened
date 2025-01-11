http://localhost:8080/api/createGame
input :-
{
    "discord_id":"816953881740181504",
    "game_type":"UNO"
}

output:-
{
    "players": [
        "677f510ff14a374a1f8e2df3"
    ],
    "gameType": "UNO",
    "gameStatus": "ACTIVE",
    "_id": "678224767a11eaf738eee00a",
    "__v": 0
}

http://localhost:8080/api/joinGame
input :-
{
    "discord_id":"816953881740181501",
    "game_id":"678224767a11eaf738eee00a"
}

output:-
{
    "_id": "678224767a11eaf738eee00a",
    "players": [
        "677f510ff14a374a1f8e2df3",
        "677f5138f14a374a1f8e2df6"
    ],
    "gameType": "UNO",
    "gameStatus": "ACTIVE",
    "__v": 1
}