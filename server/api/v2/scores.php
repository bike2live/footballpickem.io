<?php


$app->get('/weeklyUserGuesses/:gameId', function ($gameId) use ($app) {

    try {
        $response = array();
        $db = new DbHandler();
        $sql =
            "SELECT c.uid, c.name, s.byuScore, s.oppScore, s.weekTotalScore
               FROM football.customers_auth c, football.scores s
              WHERE c.uid = s.uid
                and s.gameId='$gameId'
            order by s.weekTotalScore DESC, c.name";
        $results = $db->getFullList($sql);
        $response['status'] = "success";
        $response['message'] = "Got the weekly results";
        $response['weeklyUserGuesses'] = $results;
        echoResponse(200, $response);

    } catch (Exception $e) {
        syslog(LOG_ERR, "Error reading from weekly results: " . $e->getMessage());
    }
    closelog();

});


$app->get('/leaderBoard', function () use ($app) {

    try {
        $response = array();
        $db = new DbHandler();
        $results = $db->getLeaderResults();
        $response['status'] = "success";
        $response['message'] = "Got the leader board results";
        $response['results'] = $results;
        echoResponse(200, $response);

    } catch (Exception $e) {
        syslog(LOG_ERR, "Error reading retrieving the leaderboard: " . $e->getMessage());
    }
    closelog();

});

$app->get('/gameResults/:gameId', function ($gameId) use ($app) {

    try {
        $response = array();
        $db = new DbHandler();
//         $session = $db->getSession();
//         if ($session['uid'] == '') {
//             $response["status"] = "Session invalid";
//             $response["message"] = "Session invalid";
//             echoResponse(412, $response);
//             $app->stop();
//         }
        $sql =
            "SELECT c.name, s.byuScore, s.oppScore, s.weekTotalScore, s.delta, s.weekLowDiffBonus, s.weekExactDiffBonus,
                    s.weekExactScoreBonus, s.weekHomerPenalty, s.weekCheatingPenalty, s.updated
               FROM football.scores s join football.customers_auth c on s.uid = c.uid
              WHERE s.gameId='$gameId'
            order by s.weekTotalScore DESC, c.name";
        $results = $db->getFullList($sql);
        $response['status'] = "success";
        $response['message'] = "Got the game results";
        $response['gameResults'] = $results;
        echoResponse(200, $response);

    } catch (Exception $e) {
        syslog(LOG_ERR, "Error reading from game results: " . $e->getMessage());
    }
    closelog();
});
$app->get('/game/:gameId', function ($gameId) use ($app) {
    $response = array();
    $db = new DbHandler();
//     $session = $db->getSession();
//     if ($session['uid'] == '') {
//         $response["status"] = "Session invalid";
//         $response["message"] = "Session invalid";
//         echoResponse(412, $response);
//         $app->stop();
//     }

    $game = $db->getGame($gameId);
    if ($game != NULL) {
        $response["status"] = "success";
        $response["message"] = "Retrieved game";
        $response["game"] = $game;
        echoResponse(200, $response);
    } else {
        $response["status"] = "info";
        $response["message"] = "No game for this gameId.";
        echoResponse(200, $response);
    }
});

$app->get('/leaderBoard/chart', function () use ($app) {

    try {
        $response = array();
        $db = new DbHandler();
        $results = $db->getLeaderChart();
        $response['status'] = "success";
        $response['message'] = "Got the leader board chart data";
        $response['results'] = $results;
        echoResponse(200, $response);

    } catch (Exception $e) {
        syslog(LOG_ERR, "Error reading retrieving the leaderboard chart data: " . $e->getMessage());
    }
    closelog();

});


$app->post('/editGame/:gameId', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('id', 'week', 'location', 'opponent', 'stadiumName', 'homeOrAway', 'gameDate', 'closeDate', 'showUntilDate'), $r->game);
    $db = new DbHandler();
    $gameId = $r->game->id;
    $week = $r->game->week;
    $game = $db->gameExists($week);
    if ($game) {
        $game->location = $r->game->location;
        $game->opponent = $r->game->opponent;
        $game->stadiumName = $r->game->stadiumName;
        $game->homeOrAway = $r->game->homeOrAway;
        $game->gameDate = $r->game->gameDate;
        $game->closeDate = $r->game->closeDate;
        $game->showUntilDate = $r->game->showUntilDate;

        $game = $db->updateGame($r->game);
        if ($game != NULL) {
            $response["status"] = "success";
            $response["message"] = "Game updated";
            $response["game"] = $game;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to update game. Please try again";
            echoResponse(412, $response);
        }
    }
});

$app->post('/editGameScore/:gameId', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('id', 'week', 'byuScore', 'oppScore'), $r->game);
    $db = new DbHandler();
    $gameId = $r->game->id;
    $week = $r->game->week;
    $game = $db->gameExists($week);
    if ($game) {
        $game->byuScoe = $r->game->byuScore;
        $game->opponentScore = $r->game->oppScore;

        $game = $db->updateGameScore($r->game);
        if ($game != NULL) {

            $messages = calculateGameResults($game);

            $response["status"] = "success";
            $response["message"] = "Game Scores updated\n" . $messages;
            $response["game"] = $game;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to update game scores. Please try again";
            echoResponse(412, $response);
        }
    }
});


function calculateGameResults($game) {

    $messages = "<br/>Calculating Game Results for Game: " . $game->id . "<br/>";
    if ($game) {
        $db = new DbHandler();
        try {
            $sql = "SELECT s.id, s.uid, s.gameId, s.byuScore, s.oppScore, s.delta, s.weekLowDiffBonus,
                           s.weekExactDiffBonus, s.weekExactScoreBonus, s.weekCheatingPenalty, s.updated
               FROM football.scores s
              WHERE s.gameId='$game->id'
            order by s.id";
            $userScores = $db->getFullList($sql);
            calculateDeltas($game, $userScores);
            calculateWeeklyWinner($game, $userScores);
            calculateWeeklyExactDiffBonus($game, $userScores);
            calculateWeeklyExactScoreBonus($game, $userScores);
            calculateWeeklyHomerPenalty($game, $userScores);
            calculateWeeklyCheaterPenalty($game, $userScores);
            calculateWeeklyTotalScore($userScores);

            foreach ($userScores as $userScore) {
                $userScore = $db->updateComputedScore($userScore);
            }


        } catch (Exception $e) {
            syslog(LOG_ERR, "Error updating weekly results: " . $e->getMessage());
            $messages .= "exception: " . $e->getMessage() ;
        }
    }

    return $messages;
}

// calculate the raw difference between users' guesses and the actual score
// ABS(BYU guess - BYU actual) + ABS(Opp guess - Opp actual) as a negative number
function calculateDeltas ($game, $userScores) {
    $maxDelta = 0;
    foreach ($userScores as $userScore) {
        if ($userScore->byuScore != 0 && $userScore->oppScore != 0) {
            $userScore->delta = -(abs($userScore->byuScore - $game->byuScore) + abs($userScore->oppScore - $game->oppScore));
            $maxDelta = min($userScore->delta, $maxDelta);
        }
    }
    unset($userScore);

    // now add the maxDelta to everyone's score
    foreach ($userScores as $userScore) {
        if ($userScore->byuScore != 0 && $userScore->oppScore != 0) {
            $userScore->delta -= $maxDelta;
        }
    }
    unset($userScore);

    // everyone that didn't enter a score for the week, give them a -5
    foreach ($userScores as $userScore) {
        if ($userScore->byuScore == 0 && $userScore->oppScore == 0) {
            $userScore->delta = -5;
        }
    }
    unset($userScore);
}

//
function calculateWeeklyWinner($game, $userScores) {
    // Sort by Delta, then look for those with who picked the correct winner, if any.
    usort($userScores, function($a, $b){
        if ($a->delta < $b->delta) return 1;
        if ($a->delta > $b->delta) return -1;
        return 0;
    });

    // who won the game? was it a tye ? 1=> BYU, -1=>Opponent, 0=>tye
    $winner = getWinner($game->byuScore, $game->oppScore);

    $winningDelta = 10000;  // that should be enough to be more than any delta.
    // find the first one who picked the winning team, and then see if anyone else matched that delta
    foreach ($userScores as $userScore) {
        $userWinner = getWinner($userScore->byuScore, $userScore->oppScore);
        if ($userWinner == $winner && $winningDelta == 10000) {
            $winningDelta = $userScore->delta;
            $userScore->weekLowDiffBonus = 10;
        } elseif ($userWinner == $winner && $userScore->delta == $winningDelta) {
            $userScore->weekLowDiffBonus = 10;
        } else {
            $userScore->weekLowDiffBonus = 0;
        }

    }

}

function calculateWeeklyExactDiffBonus($game, $userScores) {
    // who won the game? was it a tye ?
    $winner = getWinner($game->byuScore, $game->oppScore);
    $gameDelta = abs($game->byuScore - $game->oppScore);

    foreach ($userScores as $userScore) {
        $userWinner = getWinner($userScore->byuScore, $userScore->oppScore);
        if ($userWinner == $winner && abs($userScore->byuScore - $userScore->oppScore) == $gameDelta) {
            $userScore->weekExactDiffBonus = 5;
        } else {
            $userScore->weekExactDiffBonus = 0;
        }
    }

}

function calculateWeeklyExactScoreBonus($game, $userScores) {
    foreach ($userScores as $userScore) {
        if ($userScore->byuScore == $game->byuScore && $userScore->oppScore == $game->oppScore) {
            $userScore->weekExactScoreBonus = 25;
        } else {
            $userScore->weekExactScoreBonus = 0;
        }
    }

}

/**
 * See if someone guessed the opponent and BYU won.
 *
 * @param $game
 * @param $userScores
 */
function calculateWeeklyHomerPenalty($game, $userScores) {
    // who won the game? 1==BYU, 0==tye, -1==opponent
    $winner = getWinner($game->byuScore, $game->oppScore);

    foreach ($userScores as $userScore) {
        $userScore->weekHomerPenalty = 0;
        $userWinner = getWinner($userScore->byuScore, $userScore->oppScore);
        if ($winner == 1 && $userWinner == -1) {
            $userScore->weekHomerPenalty = -10;
        }

    }

}

function calculateWeeklyCheaterPenalty($game, $userScores) {

    if ($game) {
        $db = new DbHandler();
        $cheaters = $db->getCheaterList($game->id);

        foreach ($cheaters as $cheater) {
            foreach ($userScores as $userScore) {
                if ($cheater['uid'] == $userScore->uid) {
                    $userScore->weekCheatingPenalty = -100;
                }
            }
            unset($userScore);
        }
    }

}

function calculateWeeklyTotalScore($userScores) {
    foreach ($userScores as $userScore) {
        $userScore->weekTotalScore = $userScore->delta +
            $userScore->weekLowDiffBonus +
            $userScore->weekExactDiffBonus +
            $userScore->weekExactScoreBonus +
            $userScore->weekHomerPenalty +
            $userScore->weekCheatingPenalty
        ;
    }

}

function getWinner($byuScore, $oppScore) {
    return $byuScore == $oppScore ? 0 : ($byuScore > $oppScore ? 1 : -1);
}


?>
