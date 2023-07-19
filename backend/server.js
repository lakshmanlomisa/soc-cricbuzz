const express = require("express");
const cors = require("cors");
require('dotenv').config({ path: __dirname + '/lab4.env' })

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


PGHOST = process.env.host
PGUSER = process.env.username
PGDATABASE = process.env.dbname
PGPASSWORD = process.env.password
PGPORT = process.env.port


const Pool = require("pg").Pool;
const pool = new Pool({
    user: PGUSER,
    password: PGPASSWORD,
    host: PGHOST,
    port: PGPORT,
    database: PGDATABASE
});


// this is to list the matches in an order of year 
app.get("/matches/:offset/:limit", async (req, res) => {
    try {
        const { offset, limit } = req.params;
        const allTodos = await pool.query(`SELECT match.match_id, team1.team_name as team1, team2.team_name as team2, team3.team_name as winner, match.win_type,match.win_margin ,venue.venue_name, venue.city_name
        FROM match, venue, team as team1, team as team2, team as team3
        WHERE match.venue_id=venue.venue_id AND team1.team_id=match.team1 AND team2.team_id=match.team2 AND team3.team_id=match.match_winner
        ORDER BY match.season_year DESC, match_id ASC
        OFFSET $1 LIMIT $2`
            , [offset, limit]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//scorecard
app.get("/match/:match_id/team/:innings", async (req, res) => {
    try {
        const { match_id, innings } = req.params;
        const allTodos = await pool.query(`SELECT team.team_name
        FROM ball_by_ball, player_match, team
        WHERE player_match.player_id=ball_by_ball.striker AND  player_match.match_id=ball_by_ball.match_id AND player_match.team_id=team.team_id AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        LIMIT 1`
            , [match_id, innings]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/batting/:innings", async (req, res) => {
    try {
        const { match_id, innings } = req.params;
        const allTodos = await pool.query(`SELECT player.player_id, player.player_name as batter, SUM(ball_by_ball.runs_scored) as runs, SUM(CASE WHEN ball_by_ball.runs_scored=4 THEN 1 ELSE 0 END) as fours, SUM(CASE WHEN ball_by_ball.runs_scored=6 THEN 1 ELSE 0 END) as sixes, COUNT(ball_by_ball.ball_id) as balls_faced
        FROM player, ball_by_ball
        WHERE player.player_id=ball_by_ball.striker AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY player.player_id`
            , [match_id, innings]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/bowling/:innings", async (req, res) => {
    try {
        const { match_id, innings } = req.params;
        const allTodos = await pool.query(`SELECT player.player_id, player.player_name as bowler,
        COUNT(ball_by_ball.ball_id)/6 as overs_bowled,COUNT(ball_by_ball.ball_id) as balls_bowled,
         SUM(ball_by_ball.runs_scored) AS runs_given,
        SUM(CASE  WHEN ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' THEN 1 ELSE 0 END) AS wickets
        FROM player, ball_by_ball
        WHERE player.player_id=ball_by_ball.bowler AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY player.player_id`
            , [match_id, innings]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/details", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT match.match_id,match.win_margin, match.win_type, team1.team_name as team1,
        team2.team_name as team2,
        match.season_year,
        team3.team_name as toss_winner,
        team4.team_name as match_winner
        FROM match, team as team1, team as team2, team as team3, team as team4
        WHERE team1.team_id=match.team1 AND team2.team_id=match.team2 AND team3.team_id=match.toss_winner AND team4.team_id=match.match_winner AND match.match_id=$1`
            , [match_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/umpires", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT umpire.umpire_name
        FROM umpire, umpire_match
        WHERE umpire.umpire_id=umpire_match.umpire_id AND umpire_match.match_id=$1`
            , [match_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/team1", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT player.player_name
        FROM player, player_match, match
        WHERE player.player_id=player_match.player_id AND player_match.match_id=match.match_id AND player_match.team_id=match.team1 AND player_match.match_id=$1;`
            , [match_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/team2", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT player.player_name
        FROM player, player_match, match
        WHERE player.player_id=player_match.player_id AND player_match.match_id=match.match_id AND player_match.team_id=match.team2 AND player_match.match_id=$1;`
            , [match_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//scorecomparision
//detals

app.get("/match/:match_id/scorecomparison/team1", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT sum(ball_by_ball.runs_scored+ball_by_ball.extra_runs) AS runs,sum(case when (ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' ) then 1 else 0 end) as wickets, ball_by_ball.over_id
        FROM ball_by_ball, player_match, match
        WHERE match.match_id=ball_by_ball.match_id AND player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.striker AND player_match.team_id=match.team1 AND ball_by_ball.match_id=$1
         GROUP BY ball_by_ball.over_id ORDER BY ball_by_ball.over_id `
            , [match_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/scorecomparison/team2", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT sum(ball_by_ball.runs_scored+ball_by_ball.extra_runs) AS runs,sum(case when (ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' ) then 1 else 0 end) as wickets, ball_by_ball.over_id
        FROM ball_by_ball, player_match, match
        WHERE match.match_id=ball_by_ball.match_id AND player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.striker AND player_match.team_id=match.team2 AND ball_by_ball.match_id=$1
         GROUP BY ball_by_ball.over_id ORDER BY ball_by_ball.over_id `
            , [match_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/scorecomparision/wickets/team1", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT  ball_by_ball.over_id
        FROM ball_by_ball, player_match, match
        WHERE match.match_id=ball_by_ball.match_id AND player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.bowler AND ( ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' ) AND player_match.team_id=match.team1 AND ball_by_ball.match_id=$1
        ORDER BY ball_by_ball.over_id, ball_by_ball.ball_id`
            , [match_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/scorecomparision/wickets/team2", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT  ball_by_ball.over_id
        FROM ball_by_ball, player_match, match
        WHERE match.match_id=ball_by_ball.match_id AND player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.bowler AND ( ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' ) AND player_match.team_id=match.team2 AND ball_by_ball.match_id=$1
        ORDER BY ball_by_ball.over_id, ball_by_ball.ball_id`
            , [match_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//matchsummary
app.get("/match/:match_id/seasonyear", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`SELECT season_year 
        FROM match
        WHERE match_id=$1`
            , [match_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get("/match/:match_id/venue", async (req, res) => {
    try {
        const { match_id } = req.params;
        const allTodos = await pool.query(`select venue_name,city_name from match,venue 
       where match.venue_id = venue.venue_id and match.match_id = $1`
            , [match_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/match/:match_id/bat/:innings", async (req, res) => {
    try {
        const { match_id, innings } = req.params;
        const allTodos = await pool.query(`SELECT player.player_name, player.player_id, SUM(ball_by_ball.runs_scored) as runs, COUNT(ball_by_ball.runs_scored) AS balls
        FROM player, ball_by_ball
        WHERE ball_by_ball.striker=player.player_id AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY player_id
        ORDER BY SUM(ball_by_ball.runs_scored) DESC, COUNT(ball_by_ball.runs_scored), player.player_name
        LIMIT 3`
            , [match_id, innings]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get("/match/:match_id/bowl/:innings", async (req, res) => {
    try {
        const { match_id, innings } = req.params;
        const allTodos = await pool.query(`SELECT * 
        FROM ( SELECT player.player_name, player.player_id, SUM(CASE  WHEN ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' THEN 1 ELSE 0 END) as wickets
        FROM player, ball_by_ball
        WHERE ball_by_ball.bowler=player.player_id AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2 
        GROUP BY player_id
        ORDER BY SUM(CASE  WHEN ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' THEN 1 ELSE 0 END) DESC, SUM(ball_by_ball.runs_scored), player.player_name ) AS i
        WHERE i.wickets<>0
        LIMIT 3`
            , [match_id, innings]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get("/match/:match_id/runs/:innings", async (req, res) => {
    try {
        const { match_id, innings } = req.params;
        const allTodos = await pool.query(`SELECT team.team_name, SUM(ball_by_ball.runs_scored+ball_by_ball.extra_runs)
        FROM team, ball_by_ball, player_match
        WHERE player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.striker AND team.team_id=player_match.team_id AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY team.team_name`
            , [match_id, innings]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/wickets/:innings", async (req, res) => {
    try {
        const { match_id, innings } = req.params;
        const allTodos = await pool.query(`SELECT team.team_name, SUM(CASE  WHEN ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' THEN 1 ELSE 0 END)
        FROM team, ball_by_ball, player_match
        WHERE player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.bowler AND team.team_id=player_match.team_id AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY team.team_name`
            , [match_id, innings]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/match/:match_id/distribution/:innings", async (req, res) => {
    try {
        const { match_id, innings } = req.params;
        const allTodos = await pool.query(`SELECT team.team_name, SUM(CASE WHEN ball_by_ball.runs_scored=1 THEN 1 ELSE 0 END) as ones,
         2*SUM(CASE WHEN ball_by_ball.runs_scored=2 THEN 1 ELSE 0 END) as twos,
          3*SUM(CASE WHEN ball_by_ball.runs_scored=3 THEN 1 ELSE 0 END) as threes, 
          4*SUM(CASE WHEN ball_by_ball.runs_scored=4 THEN 1 ELSE 0 END) as fours, 
          6*SUM(CASE WHEN ball_by_ball.runs_scored=6 THEN 1 ELSE 0 END) as sixes, 
          SUM(ball_by_ball.extra_runs) AS extras, COUNT(ball_by_ball.ball_id) as total_balls
        FROM team, ball_by_ball, player_match
        WHERE player_match.match_id=ball_by_ball.match_id AND player_match.player_id=ball_by_ball.striker AND team.team_id=player_match.team_id AND ball_by_ball.match_id=$1 AND ball_by_ball.innings_no=$2
        GROUP BY team.team_name`
            , [match_id, innings]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// player statistics 
app.get("/player/:player_id/info", async (req, res) => {
    try {
        const { player_id } = req.params;
        const allTodos = await pool.query(`SELECT player.player_name, player.country_name, player.batting_hand, player.bowling_skill
        FROM player
        WHERE player.player_id=$1`
            , [player_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get("/player/:player_id/battingstats", async (req, res) => {
    try {
        const { player_id } = req.params;
        const allTodos = await pool.query(`SELECT COALESCE(m1.match_id,m2.match_id) AS match_id, COALESCE(m1.season_year,m2.season_year) AS season_year, COALESCE(m1.runs,0)+COALESCE(m2.runs,0) AS runs, COALESCE(m1.outornot,0)+COALESCE(m2.outornot,0) AS outornot
        FROM ( SELECT ball_by_ball.match_id, match.season_year, SUM(ball_by_ball.runs_scored) as runs, SUM(CASE WHEN ball_by_ball.out_type='NULL' THEN 0 ELSE 1 END ) as outornot
        FROM ball_by_ball, match
        WHERE ball_by_ball.match_id=match.match_id AND ball_by_ball.striker=$1
        GROUP BY ball_by_ball.match_id, match.season_year ) as m1 FULL OUTER JOIN ( SELECT ball_by_ball.match_id, match.season_year, 0 as runs, 0 as outornot
        FROM ball_by_ball, match
        WHERE ball_by_ball.match_id=match.match_id AND ball_by_ball.non_striker=$1
        GROUP BY ball_by_ball.match_id, match.season_year ) as m2
        ON m1.match_id=m2.match_id
        ORDER BY COALESCE(m1.match_id,m2.match_id), COALESCE(m1.season_year,m2.season_year)`
            , [player_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get("/player/:player_id/battingcarrer", async (req, res) => {
    try {
        const { player_id } = req.params;
        const allTodos = await pool.query(`SELECT * FROM
        ( SELECT SUM(runs) as runs, SUM(four_runs) AS four, SUM(six_runs) AS six, SUM(CASE WHEN runs>=50 THEN 1 ELSE 0 END) as fifty, MAX(runs) AS hs, ROUND(SUM(runs)*100.0/SUM(balls_faced),3) AS strike_rate,
        CASE WHEN SUM(outs)=0 THEN NULL ELSE ROUND(SUM(runs)*1.0/SUM(outs),3) END AS average
        FROM ( SELECT ball_by_ball.match_id, SUM(ball_by_ball.runs_scored) as runs, SUM(CASE WHEN ball_by_ball.out_type='NULL' THEN 0 ELSE 1 END ) as outs, SUM(CASE WHEN ball_by_ball.runs_scored=4 THEN 4 ELSE 0 END) as four_runs, SUM(CASE WHEN ball_by_ball.runs_scored=6 THEN 6 ELSE 0 END) as six_runs, COUNT(ball_by_ball.ball_id) as balls_faced
        FROM ball_by_ball
        WHERE ball_by_ball.striker=$1
        GROUP BY ball_by_ball.match_id ) as match_runs ) AS match_1, ( SELECT COUNT( DISTINCT ball_by_ball.match_id) as matches
        FROM ball_by_ball
        WHERE ball_by_ball.non_striker=$1 OR ball_by_ball.striker=$1 ) as match_2`
            , [player_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/player/:player_id/bowlingstats", async (req, res) => {
    try {
        const { player_id } = req.params;
        const allTodos = await pool.query(`SELECT ball_by_ball.match_id, match.season_year, SUM(ball_by_ball.runs_scored) as runs_given, SUM(CASE  WHEN ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' THEN 1 ELSE 0 END) AS wickets
        FROM ball_by_ball, match
        WHERE ball_by_ball.match_id=match.match_id AND ball_by_ball.bowler=$1
        GROUP BY ball_by_ball.match_id, match.season_year
        ORDER BY ball_by_ball.match_id, match.season_year`
            , [player_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/player/:player_id/bowlingcarrer", async (req, res) => {
    try {
        const { player_id } = req.params;
        const allTodos = await pool.query(`SELECT COUNT(match_id) as matches, SUM(runs_given) as runs,
         SUM(balls) AS balls, SUM(overs) as overs, SUM(wickets) as wickets, 
         ROUND(SUM(runs_given)*1.0/SUM(overs),3) as economy,
          SUM(CASE WHEN wickets>=5 THEN 1 ELSE 0 END) as five_wickets
        FROM( SELECT ball_by_ball.match_id, SUM(ball_by_ball.runs_scored) as runs_given,
         SUM(CASE  WHEN ball_by_ball.out_type='caught' OR ball_by_ball.out_type='caught and bowled' OR ball_by_ball.out_type='bowled' OR ball_by_ball.out_type='stumped'  OR ball_by_ball.out_type='keeper catch' OR ball_by_ball.out_type='lbw' OR ball_by_ball.out_type='hit wicket' THEN 1 ELSE 0 END) AS wickets, COUNT(DISTINCT ball_by_ball.over_id) AS overs, COUNT(ball_by_ball.ball_id) AS balls
        FROM ball_by_ball
        WHERE ball_by_ball.bowler=$1
        GROUP BY ball_by_ball.match_id) as match_wickets`
            , [player_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/pointstable/:year", async (req, res) => {
    try {
        const { year } = req.params;
        const allTodos = await pool.query(`SELECT team.team_name, m3.matches, m3.win, m3.matches-m3.win as lost, ROUND((i3.run1*1.0/i3.ball1)-(i3.run2*1.0/i3.ball2),3) as nrr,  m3.win*2 as points
        FROM ( SELECT COALESCE(m1.team1,m2.team2) as team_id, COALESCE(m1.matches,0)+COALESCE(m2.matches,0) as matches, COALESCE(m1.wins,0)+COALESCE(m2.wins,0) as win
        FROM ( SELECT team1, COUNT(match_winner) AS matches, SUM(CASE WHEN team1=match_winner THEN 1 ELSE 0 END) AS wins 
        FROM match 
        WHERE match.season_year=$1
        GROUP BY team1) AS m1 FULL OUTER JOIN ( SELECT team2, COUNT(match_winner) AS matches, SUM(CASE WHEN team2=match_winner THEN 1 ELSE 0 END) AS wins 
        FROM match 
        WHERE match.season_year=$1
        GROUP BY team2 ) AS m2
        ON m1.team1=m2.team2 ) AS m3, ( SELECT i1.team_id, SUM(i1.overs) as ball1, SUM(i1.runs) as run1, SUM(i2.runs) as run2, SUM(i2.overs) as ball2
        FROM ( SELECT ball_by_ball.match_id, player_match.team_id, SUM(ball_by_ball.runs_scored+ball_by_ball.extra_runs) AS runs , COUNT(DISTINCT ball_by_ball.over_id) as overs
        FROM ball_by_ball, player_match, match
        WHERE ball_by_ball.match_id=player_match.match_id AND ball_by_ball.striker=player_match.player_id AND ball_by_ball.match_id=match.match_id AND match.season_year=$1
        GROUP BY ball_by_ball.match_id, player_match.team_id ) AS i1, ( SELECT ball_by_ball.match_id, player_match.team_id, SUM(ball_by_ball.runs_scored+ball_by_ball.extra_runs) AS runs , COUNT(DISTINCT ball_by_ball.over_id) as overs
        FROM ball_by_ball, player_match, match
        WHERE ball_by_ball.match_id=player_match.match_id AND ball_by_ball.striker=player_match.player_id AND ball_by_ball.match_id=match.match_id AND match.season_year=$1
        GROUP BY ball_by_ball.match_id, player_match.team_id ) AS i2
        WHERE i1.match_id=i2.match_id AND i1.team_id<>i2.team_id
        GROUP BY i1.team_id ) AS i3, team
        WHERE m3.team_id=i3.team_id AND m3.team_id=team.team_id
        ORDER BY m3.win DESC, (i3.run1*1.0/i3.ball1)-(i3.run2*1.0/i3.ball2) DESC`
            , [year]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/venues", async (req, res) => {
    try {
        const allTodos = await pool.query(`SELECT * FROM venue`);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/venue/:venue_id/info", async (req, res) => {
    try {
        const { venue_id } = req.params;
        const allTodos = await pool.query(`SELECT * FROM venue 
        WHERE venue.venue_id=$1`
            , [venue_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/venue/:venue_id/maxmin", async (req, res) => {
    try {
        const { venue_id } = req.params;
        const allTodos = await pool.query(`SELECT ((COUNT(runs)-1)/2)+1 as matches, MAX(runs), MIN(runs)
        FROM ( SELECT SUM(ball_by_ball.runs_scored+ball_by_ball.extra_runs) as runs
        FROM ball_by_ball, match
        WHERE ball_by_ball.match_id=match.match_id AND match.venue_id=$1
        GROUP BY ball_by_ball.match_id, ball_by_ball.innings_no) as venue_runs`
            , [venue_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/venue/:venue_id/maxchased", async (req, res) => {
    try {
        const { venue_id } = req.params;
        const allTodos = await pool.query(`SELECT MAX(runs)
        FROM ( SELECT SUM(ball_by_ball.runs_scored+ball_by_ball.extra_runs) as runs
        FROM ball_by_ball, match
        WHERE ball_by_ball.match_id=match.match_id AND ball_by_ball.innings_no=1 AND match.win_type='wickets' AND match.venue_id=$1
        GROUP BY ball_by_ball.match_id, ball_by_ball.innings_no ) as venue_runs`
            , [venue_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/venue/:venue_id/wins", async (req, res) => {
    try {
        const { venue_id } = req.params;
        const allTodos = await pool.query(`SELECT SUM( CASE WHEN win_type='runs' THEN 1 ELSE 0 END ) as bat_first, SUM( CASE WHEN win_type='wickets' THEN 1 ELSE 0 END ) as bat_second
        FROM match
        WHERE match.venue_id=$1`
            , [venue_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/venue/:venue_id/firstinavg", async (req, res) => {
    try {
        const { venue_id } = req.params;
        const allTodos = await pool.query(`SELECT m1.season_year, SUM(runs)*1.0/COUNT(runs) as avgs
        FROM ( SELECT match.season_year, SUM(ball_by_ball.runs_scored+ball_by_ball.extra_runs) as runs
        FROM ball_by_ball, match
        WHERE ball_by_ball.match_id=match.match_id AND ball_by_ball.innings_no=1 AND match.venue_id=$1
        GROUP BY ball_by_ball.match_id, match.season_year ) as m1
        GROUP BY m1.season_year
        ORDER BY m1.season_year`
            , [venue_id]);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/venues/add", async (req, res) => {
    try {
        const data = req.body;
        const allTodos = await pool.query(
            `INSERT INTO venue ( venue_name, country_name, city_name, capacity) VALUES( $1, $2, $3, $4)`
            , [data.venue_name, data.country_name, data.city_name, data.capacity]);
        res.json(allTodos.rows);
        // console.log(res);
    } catch (err) {
        console.error(err.message);
    }
});


var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("cricinfo app listening at http://%s:%s", host, port)
})

module.exports = app;