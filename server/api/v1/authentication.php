<?php


$app->get('/session', function () {
    syslog(LOG_INFO, "Getting session info");
    $db = new DbHandler();
    $session = $db->getSession();
    $response["uid"] = $session['uid'];
    $response["username"] = $session['username'];
    $response["name"] = $session['name'];
    $response["roles"] =  $session['roles'];

    echoResponse(200, $session);
});

$app->get('/schedule', function () use ($app) {

    try {
        $response = array();
        $db = new DbHandler();
//        $games = $db->getSchedule();
        $sql = "Select id, week, opponent, location, stadiumName, homeoraway, byuScore, oppScore, gameDate, closeDate, showUntilDate
                  from schedule
                ORDER BY gameDate";
        $games = $db->getFullList($sql);

        $response['status'] = "success";
        $response['message'] = "Got the schedule";
        $response['games'] = $games;
        echoResponse(200, $response);

    } catch (Exception $e) {
        syslog(LOG_ERR, "Error reading from schedule table: " . $e->getMessage());
    }
    closelog();

});

$app->get('/userScore/:gameId', function ($gameId) use ($app) {
    $response = array();
    $db = new DbHandler();
    $session = $db->getSession();
    $userScore = $db->getUserScore($session['uid'], $gameId);
    if ($userScore != NULL) {
        $response["status"] = "success";
        $response["message"] = "Retrieved User Score";
        $response["userScore"] = $userScore;
        echoResponse(200, $response);
    } else {
        $response["status"] = "info";
        $response["message"] = "No score for this user for this game.";
        echoResponse(200, $response);
    }
});

$app->post('/addscore', function () use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('uid', 'gameId', 'byuScore', 'oppScore'), $r->userScore);
    $db = new DbHandler();
    $session = $db->getSession();
    if ($session['uid'] != $r->userScore->uid) {
        $response["status"] = "error";
        $response["message"] = "Failed to add score. Please try again";
        echoResponse(201, $response);
    }

    $uid = $r->userScore->uid;
    $gameId = $r->userScore->gameId;
    $isUserScoreExists = $db->userScoreExists($uid, $gameId);
    if (!$isUserScoreExists) {
        $userScore = $db->insertUserScore($r->userScore);
        if ($userScore != NULL) {
            $response["status"] = "success";
            $response["message"] = "User Score Added";
            $response["userScore"] = $userScore;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to add score. Please try again";
            echoResponse(201, $response);
        }
    } else {
        $userScore = $db->updateUserScore($r->userScore);
        $response["status"] = "success";
        $response["message"] = "User Score Updated";
        $response["userScore"] = $userScore;
        echoResponse(200, $response);
    }
});

$app->post('/addgame', function () use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('week', 'opponent', 'location', 'stadium', 'homeOrAway', 'gameDate', 'closeDate', 'showUntilDate'), $r->game);
    $db = new DbHandler();
    $week = $r->game->week;
    $isGameExists = $db->gameExists($week);
    if (!$isGameExists) {
        $game = $db->insertGame($r->game);
        if ($game != NULL) {
            $response["status"] = "success";
            $response["message"] = "Game Added";
            $response["game"] = $game;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create game. Please try again";
            echoResponse(201, $response);
        }
    }
});


$app->post('/login', function () use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('username', 'password'), $r->customer);
    $response = array();
    $db = new DbHandler();
    $password = $r->customer->password;
    $username = $r->customer->username;
    $user = $db->getOneRecord("select uid,name,password,username,created from customers_auth where username='$username'");
    if ($user != NULL) {
        if (passwordHash::check_password($user['password'], $password)) {
            $response['status'] = "success";
            $response['message'] = 'Logged in successfully.';
            $response['name'] = $user['name'];
            $response['uid'] = $user['uid'];
            $response['username'] = $user['username'];
            $response['createdAt'] = $user['created'];
            // get Roles
            $uid = $user['uid'];
            $roles = $db->getFullList("Select role from user_roles where uid='$uid'");
            $response['roles'] = array();
            for ($x=0; $x < count($roles); $x++) {
                $response['roles'][$x] = $roles[$x]->role;
            }

            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $user['uid'];
            $_SESSION['username'] = $username;
            $_SESSION['name'] = $user['name'];
            $_SESSION['roles'] = $response['roles'];

            addUserScores($uid, $db);

        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
    } else {
        $response['status'] = "error";
        $response['message'] = 'No such user is registered';
    }
    echoResponse(200, $response);
});
$app->post('/signUp', function () use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('username', 'name', 'password'), $r->customer);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $name = $r->customer->name;
    $username = $r->customer->username;
    $password = $r->customer->password;
    $isUserExists = $db->getOneRecord("select 1 from customers_auth where username='$username'");
    if (!$isUserExists) {
        $r->customer->password = passwordHash::hash($password);
        $tabble_name = "customers_auth";
        $column_names = array('name', 'username', 'password');
        $result = $db->insertIntoTable($r->customer, $column_names, $tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "User account created successfully";
            $response["uid"] = $result;
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $response["uid"];
            $_SESSION['name'] = $name;
            $_SESSION['username'] = $username;

            addUserScores($result, $db);

            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create customer. Please try again";
            echoResponse(201, $response);
        }
    } else {
        $response["status"] = "error";
        $response["message"] = "An user with the provided username exists!";
        echoResponse(201, $response);
    }
});
$app->get('/logout', function () {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});

function addUserScores($uid, $db) {
    // get all of the games
//    $games = $db->getSchedule();
    $sql = "Select id, week, opponent, location, stadiumName, homeoraway, byuScore, oppScore, gameDate, closeDate, showUntilDate
                  from schedule
                ORDER BY gameDate";
    $games = $db->getFullList($sql);

    // for each game, create an entry into the user_scores table
    try {
        foreach ($games as $game) {
            $gameId = $game->id;
            $isUserScoreExists = $db->userScoreExists($uid, $gameId);
            if (!$isUserScoreExists) {
                $userScore = new stdClass();
                $userScore->uid = $uid;
                $userScore->gameId = $gameId;
                $userScore->byuScore = 0;
                $userScore->oppScore = 0;
                $userScore = $db->insertUserScore($userScore);
            }
        }
    } catch (PDOException $e) {
        echo '{"error":{"text":"' . $e->getMessage() . '"}}';
    } catch (Exception $e) {
        echo '{"error":{"text":"' . $e->getMessage() . '"}}';
    }

}
?>
