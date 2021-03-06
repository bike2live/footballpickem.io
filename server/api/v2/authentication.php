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
        // $session = $db->getSession();
        // if ($session["uid"] == '') {
        //     $response['status'] = "invalid";
        //     $response['message'] = "You must be logged in to retrieve the schedule.";
        //     $response['games'] = [];
        // }
//        $games = $db->getSchedule();
        $sql = "Select id, week, opponent, location, stadiumName, homeOrAway, byuScore, oppScore, gameDate, closeDate, showUntilDate
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
    if ($session['uid'] == '') {
        $response["status"] = "Session invalid";
        $response["message"] = "Session invalid";
        echoResponse(412, $response);
        $app->stop();
    }

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
        $response["status"] = "Session invalid";
        $response["message"] = "Session invalid";
        echoResponse(412, $response);
        $app->stop();
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
            echoResponse(412, $response);
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
            echoResponse(412, $response);
        }
    }
});


$app->post('/isUserRegistered', function () use ($app) {
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('idp_id'), $r->customer);
    $response = array();
    $db = new DbHandler();
    $idp_id = $r->customer->idp_id;
    $user = $db->getOneRecord("select uid,name,idp_id,photo,created from customers_auth where idp_id='$idp_id'");
    $response['status'] = "success";
    if ($user != NULL) {
        $response['uid'] = $user['uid'];
        $response['message'] = 'User is registered';
        echoResponse(200, $response);
    } else {
        $response['uid'] = "";
        $response['message'] = 'No such user is registered';
        echoResponse(200, $response);
    }
});

$app->post('/login', function () use ($app) {
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('idp_id'), $r->customer);
    $response = array();
    $db = new DbHandler();
    $idp_id = $r->customer->idp_id;
    $user = $db->getOneRecord("select uid,name,idp_id,photo,created from customers_auth where idp_id='$idp_id'");
    if ($user != NULL) {
        getSignedInUser($response, $user, $db);
    } else {
        $response['status'] = "error";
        $response['message'] = 'No such user is registered';
        echoResponse(412, $response);
    }
});

$app->post('/signUp', function () use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('idp_id', 'name'), $r->customer);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $name = $r->customer->name;
    $idp_id = $r->customer->idp_id;
    $email = $r->customer->email;
    $photo = $r->customer->photo;
    $isUserExists = $db->getOneRecord("select 1 from customers_auth where idp_id='$idp_id'");
    if ($isUserExists) {
        $user = $db->getOneRecord("select uid,name,idp_id,photo,created from customers_auth where idp_id='$idp_id'");
        getSignedInUser($response, $user, $db);
        $app->stop();
    }

    $table_name = "customers_auth";
    $column_names = array('name', 'email', 'idp_id', 'photo');
    $result = $db->insertIntoTable($r->customer, $column_names, $table_name);
    if ($result != NULL) {
        $response["status"] = "success";
        $response["message"] = "User account created successfully";
        $response["uid"] = $result;
        $response["name"] = $name;
        $response["idp_id"] = $idp_id;
        $response["photo"] = $photo;
        $response['roles'] = array();

        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['uid'] = $response["uid"];
        $_SESSION['name'] = $name;
        $_SESSION['idp_id'] = $idp_id;

        addUserScores($result, $db);

        echoResponse(200, $response);
    } else {
        $response["status"] = "error";
        $response["message"] = "Failed to create customer. Please try again";
        echoResponse(412, $response);
    }
});
$app->get('/logout', function () {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});

$app->get('/userList', function () use ($app) {
    $response = array();
    $db = new DbHandler();

    $session = $db->getSession();
    if ($session["uid"] == '') {
        $response['status'] = "invalid";
        $response['message'] = "You must be logged in to retrieve the schedule.";
        $response['users'] = [];
        echoResponse(412, $response);
        $app->stop();
    }
    $users = $db->getUserList();
    $response['status'] = "success";
    $response['message'] = "Got user List";
    $response['users'] = $users;
    echoResponse(200, $response);
});

// Delete a user and their scores
$app->post('/deleteUser', function () use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('uid'), $r);
    $db = new DbHandler();

    $session = $db->getSession();
    if ($session["uid"] == '') {
        $response['status'] = "invalid";
        $response['message'] = "You must be logged in to retrieve the schedule.";
        $response['users'] = [];
        echoResponse(412, $response);
        $app->stop();
    }

    $uid = $r->uid;
    $isUserExists = $db->getOneRecord("select 1 from customers_auth where uid='$uid'");
    if ($isUserExists) {
        $db->deleteUserScores($uid);
        $db->deleteUser($uid);
        $response['status'] = "success";
        $response['message'] = "Deleted User";
        echoResponse(200, $response);
        $app->stop();
    } else {
        $response['status'] = "error";
        $response['message'] = "User doesn't exist";
        echoResponse(500, $response);
    }
});

// get a list of the application settings
$app->get('/settings', function () use ($app) {
    $response = array();
    $db = new DbHandler();

    $session = $db->getSession();
    if ($session["uid"] == '') {
        $response['status'] = "invalid";
        $response['message'] = "You must be logged in to retrieve the schedule.";
        $response['users'] = [];
        echoResponse(412, $response);
        $app->stop();
    }
    $settings = $db->getAppSettings();
    $response['status'] = "success";
    $response['message'] = "Got app List";
    $response['settings'] = $settings;
    echoResponse(200, $response);
});

// Delete a user and their scores
$app->post('/updateSetting', function () use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('key', 'value'), $r);
    $db = new DbHandler();

    $session = $db->getSession();
    if ($session["uid"] == '') {
        $response['status'] = "invalid";
        $response['message'] = "You must be logged in to update application settings.";
        $response['users'] = [];
        echoResponse(412, $response);
        $app->stop();
    }

    $db->addOrUpdateAppSetting($r->key, $r->value);
    $response['status'] = "success";
    $response['message'] = "Inserted/Updated app setting";
    echoResponse(200, $response);
});



function getSignedInUser($response, $user, $db) {
    $response['status'] = "success";
    $response['message'] = 'Logged in successfully.';
    $response['name'] = $user['name'];
    $response['uid'] = $user['uid'];
    $response['idp_id'] = $user['idp_id'];
    $response['photo'] = $user['photo'];
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
    $_SESSION['idp_id'] = $user['idp_id'];
    $_SESSION['name'] = $user['name'];
    $_SESSION['roles'] = $response['roles'];

    addUserScores($uid, $db);

    echoResponse(200, $response);
}

function addUserScores($uid, $db) {
    // get all of the games
//    $games = $db->getSchedule();
    $sql = "Select id, week, opponent, location, stadiumName, homeoraway, byuScore, oppScore, gameDate, closeDate, showUntilDate
                  from schedule
                ORDER BY gameDate";
    try {
        $games = $db->getFullList($sql);
    } catch (PDOException $e) {
        echo '{"PDOException":{"text":"' . $e->getMessage() . '"}}';
    } catch (Exception $e) {
        echo '{"Exception":{"text":"' . $e->getMessage() . '"}}';
    }

    // for each game, create an entry into the user_scores table
    try {
        if ($games != null && count($games) > 0) {
            foreach ($games as $game) {
                $gameId = $game->id;
                $isUserScoreExists = $db->userScoreExists($uid, $gameId);
                if (!$isUserScoreExists) {
                    $userScore = new stdClass();
                    $userScore->uid = $uid;
                    $userScore->gameId = $gameId;
                    $userScore->byuScore = 0;
                    $userScore->oppScore = 0;
                    $db->isSettingExists($userScore);
                }
            }
        }
    } catch (PDOException $e) {
        echo '{"error":{"text":"' . $e->getMessage() . '"}}';
    } catch (Exception $e) {
        echo '{"error":{"text":"' . $e->getMessage() . '"}}';
    }

}
?>
