const API_KEY = "16d85bf702974259b17e4dff4faeade4";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;

const STANDINGS_API = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const MATCHES_API   = `${BASE_URL}competitions/${LEAGUE_ID}/matches`;
const SCORERS_API   = `${BASE_URL}competitions/PL/scorers?limit=160`;
const TEAM_API      = `${BASE_URL}teams/`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log(`Error: ${res.status}`);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

/* ====================== Standings ======================== */

function getAllStandings() {

    // tampilkan loading
    document.getElementById("loading").style.display = "block";

    if ("caches" in window) {
        caches.match(STANDINGS_API).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log(`Competition Data: ${data}`);
                    showStanding(data);

                    // sembunyikan loading
                    document.getElementById("loading").style.display = "none";
                })
            }
        })
    }

    fetchAPI(STANDINGS_API)
        .then(data => {
            showStanding(data);

            // sembunyikan loading
            document.getElementById("loading").style.display = "none";
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    let standings = "";
    let standingElement =  document.getElementById("standings");

    let no = 1;
    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr team-id="${standing.team.id}">
                    <td>`;

                        if (no <= 4) {
                            standings += `<div class="rank-no blue">`;
                        } else if(no == 5) {
                            standings += `<div class="rank-no orange">`;
                        } else if(no > (data.standings[0].table.length - 3)) {
                            standings += `<div class="rank-no red">`;
                        } else {
                            standings += `<div class="rank-no grey">`;
                        }

                        standings += `${no}
                        </div>
                    </td>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="24px" height="24px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.playedGames}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalDifference}</td>
                    <td>${standing.points}</td>
                </tr>
        `;

        no++;
    });

     standingElement.innerHTML = standings;
}

/* ================= Matches ===================== */

function getMatchByDay(day) {

    // tampilkan loading
    document.getElementById("loading").style.display = "block";

    if ("caches" in window) {
        caches.match(MATCHES_API + "?matchday=" + day).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log(`Competition Data: ${data}`);
                    showMatch(data);

                    // sembunyikan loading
                    document.getElementById("loading").style.display = "none";
                })
            }
        })
    }

    fetchAPI(MATCHES_API + "?matchday=" + day)
        .then(data => {
            showMatch(data);

            // sembunyikan loading
            document.getElementById("loading").style.display = "none";
        })
        .catch(error => {
            console.log(error)
        })
}

function showMatch(data) {
    let matches = "";
    let matchElement =  document.getElementById("homeMatches");

    data.matches.forEach(function (match) {

        if (match.score.fullTime.homeTeam == null) {
            var scoreHomeTeam = "&#8212;";
        } else {
            var scoreHomeTeam = match.score.fullTime.homeTeam
        }

        if (match.score.fullTime.awayTeam == null) {
            var scoreAwayTeam = "&#8212;";
        } else {
            var scoreAwayTeam = match.score.fullTime.awayTeam
        }

        matches += `
                <div class="col s12 m6 l6">
                    <div class="card">
                        <div class="card-content">
                            <table border="0">
                                <tr>
                                    <td colspan="3" class="date">${match.utcDate}</td>
                                </tr>
                                <tr>
                                    <td class="col s4 m4 l4">
                                        <img class="logo" src="https://crests.football-data.org/${match.homeTeam.id}.svg" alt="${match.homeTeam.name}">
                                        <br>
                                        <span class="team-name">${match.homeTeam.name}</span>
                                    </td>
                                    <td class="col s4 m4 l4">
                                        <table border="0">
                                            <tr>
                                                <td class="score">${scoreHomeTeam}</td>
                                                <td>&#8212;</td>
                                                <td class="score">${scoreAwayTeam}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="3">
                                                    <span class="status">${match.status}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td class="col s4 m4 l4">
                                        <img class="logo" src="https://crests.football-data.org/${match.awayTeam.id}.svg" alt="${match.awayTeam.name}">
                                        <br>
                                        <span class="team-name">${match.awayTeam.name}</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
        `;
    });

     matchElement.innerHTML = matches;
}

/* ======================= Top Scorers ======================= */

function getAllScorers() {

    // tampilkan loading
    document.getElementById("loading").style.display = "block";

    if ("caches" in window) {
        caches.match(SCORERS_API).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log(`Competition Data: ${data}`);
                    showScorer(data);

                    // sembunyikan loading
                    document.getElementById("loading").style.display = "none";
                })
            }
        })
    }

    fetchAPI(SCORERS_API)
        .then(data => {
            showScorer(data);

            // sembunyikan loading
            document.getElementById("loading").style.display = "none";
        })
        .catch(error => {
            console.log(error)
        })
}

function showScorer(data) {
    let scorers = "";
    let scorerElement =  document.getElementById("scorers");

    let no = 1;
    let rank = 1;
    let rankBefore = 0;
    let goalBefore = 0;

    data.scorers.forEach(function (scorer) {

        if (scorer.numberOfGoals != goalBefore) {
            rank = no;
        } else {
            rank = rankBefore;
        }

        scorers += `
                <tr style="margin-bottom: 5px;">
                    <td><div class="rank-no grey">${rank}</div></td>
                    <td>${scorer.player.name}</td>
                    <td>
                        <img src="https://crests.football-data.org/`+ scorer.team.id +`.svg" width="24px" height="24px" alt="Logo">
                    </td>
                    <td>${scorer.team.name}</td>
                    <td>${scorer.numberOfGoals}</td>
                </tr>
        `;

        rankBefore = rank;
        goalBefore = scorer.numberOfGoals;
        no++;
    });

    scorerElement.innerHTML = scorers;
}

/* ======================= Team ======================= */

function getTeamById() {
    return new Promise(function(resolve, reject) {
        var hash = window.location.hash.substr(1).split("=");
        var id = hash[1];

        // tampilkan loading
        document.getElementById("loading").style.display = "block";

        if ("caches" in window) {
            caches.match(TEAM_API + id).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log(`Competition Data: ${data}`);
                        showTeam(data, id);

                        // sembunyikan loading
                        document.getElementById("loading").style.display = "none";

                        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(TEAM_API + id)
            .then(data => {
                showTeam(data, id);

                // sembunyikan loading
                document.getElementById("loading").style.display = "none";

                // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    });
}

function showTeam(data, id) {

    let teamElement =  document.getElementById("team");
    let team = `<div class="logo" style="">
                                        <img src="https://crests.football-data.org/${id}.svg" alt="Logo">
                                        <br>
                                        <span class="team-name">${data.name}</span>
                                    </div>
                                    <div class="container-fluid">
                                        <div class="row">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Position</th>
                                                    </tr>
                                                </thead>
                                                <tbody>`;


    data.squad.forEach(function (squad) {

        if (squad.position == null) {
            var position = "-";
        } else {
            var position = squad.position;
        }

        team += `
                <tr >
                    <td>${squad.name}</td>
                    <td>${position}</td>
                </tr>
        `;
    });

    team += `
            </tbody>
            </table>
        </div>
    </div>`;

    teamElement.innerHTML = team;
}

/* ================== Favorite Team ================== */

function getFavoritesTeamMatches() {
    dbGetAll().then(function(teams) {

        // tampilkan loading
        document.getElementById("loading").style.display = "block";

        // Menyusun komponen card artikel secara dinamis
        let teamsHTML = "";
        teams.forEach(function(team) {

            if ("caches" in window) {
                caches.match(TEAM_API + team.id + "/matches").then(function (response) {
                    if (response) {
                        response.json().then(function (data) {
                            console.log(`Competition Data: ${data}`);
                            showMatch(data);

                        })
                    }
                })
            }

            fetchAPI(TEAM_API + team.id + "/matches")
                .then(data => {
                    showMatch(data);
                })
                .catch(error => {
                    console.log(error)
                })
        });

        // sembunyikan loading
        document.getElementById("loading").style.display = "none";
    });
}