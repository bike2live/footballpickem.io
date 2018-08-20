<?php

class DbHandler
{

    private $conn;

    function __construct()
    {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }


    /**
     * Fetching single record
     */
    public function getOneRecord($query)
    {
        $r = $this->conn->query($query . ' LIMIT 1') or die($this->conn->error . __LINE__);
        return $result = $r->fetch_assoc();
    }

    public function getFullList($query)
    {
        try {
            $pdo = $this->getPDOConnection();
            $stmt = $pdo->query($query);
            $results = $stmt->fetchAll(PDO::FETCH_OBJ);
            $pdo = null;
            return $results;
        } catch (PDOException $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '"}}';
        }
    }

    public function userScoreExists($uid, $gameId) {
        $sql = "Select 1 from scores where uid=:uid and gameId=:gameId";
        try {
            $pdo = $this->getPDOConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam("uid", $uid);
            $stmt->bindParam("gameId", $gameId);
            $stmt->execute();
            $userScore = $stmt->fetchObject();
            $pdo = null;
            return $userScore;
        } catch (PDOException $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '"}}';
        } catch (Exception $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '"}}';
        }
    }

    public function gameExists($week) {
        $sql = "Select 1 from schedule where week=:week";
        try {
            $pdo = $this->getPDOConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam("week", $week);
            $stmt->execute();
            $game = $stmt->fetchObject();
            $pdo = null;
            return $game;
        } catch (PDOException $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '"}}';
        } catch (Exception $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '"}}';
        }
    }

    public function getGame($gameId) {
        $sql = "Select 1 from schedule where id=:gameId";
        try {
            $pdo = $this->getPDOConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam("gameId", $gameId);
            $stmt->execute();
            $game = $stmt->fetchObject();
            $pdo = null;
            return $game;
        } catch (PDOException $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '"}}';
        } catch (Exception $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '"}}';
        }
    }

    public function updateGameScore($game) {
        $sql = "UPDATE schedule set byuScore=:byuScore, oppScore=:oppScore WHERE id=:gameId";
        try {
            $pdo = $this->getPDOConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam("byuScore", $game->byuScore);
            $stmt->bindParam("oppScore", $game->oppScore);
            $stmt->bindParam("gameId", $game->id);
            $stmt->execute();
            $pdo = null;
            return $game;
        } catch (PDOException $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '""}}';
        }
    }



    public function getUserScore($uid, $gameId) {
        $sql = "Select * from scores where uid=:uid and gameId=:gameId";
        try {
            $pdo = $this->getPDOConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam("uid", $uid);
            $stmt->bindParam("gameId", $gameId);
            $stmt->execute();
            $userScore = $stmt->fetchObject();
            $pdo = null;
            return $userScore;
        } catch (PDOException $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '"}}';
        }
    }

    public function insertUserScore($userScore) {
        $sql = "INSERT INTO scores (uid, gameId, byuScore, oppScore) values (:uid, :gameId, :byuScore, :oppScore)";
        try {
            $pdo = $this->getPDOConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam("uid", $userScore->uid);
            $stmt->bindParam("gameId", $userScore->gameId);
            $stmt->bindParam("byuScore", $userScore->byuScore);
            $stmt->bindParam("oppScore", $userScore->oppScore);
            $stmt->execute();
            $userScore->id = $pdo->lastInsertId();
            $pdo = null;
            return $userScore;
        } catch (PDOException $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '"}}';
        }
    }

    public function updateUserScore($userScore) {
        $sql = "UPDATE scores set byuScore=:byuScore, oppScore=:oppScore WHERE id=:id";
        try {
            $pdo = $this->getPDOConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam("byuScore", $userScore->byuScore);
            $stmt->bindParam("oppScore", $userScore->oppScore);
            $stmt->bindParam("id", $userScore->id);
            $stmt->execute();
            $pdo = null;
            return $userScore;
        } catch (PDOException $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '""}}';
        }
    }

    public function updateComputedScore($userScore) {
        $sql = "UPDATE scores set delta=:delta, weekLowDiffBonus=:bonus1, weekExactDiffBonus=:bonus2, weekExactScoreBonus=:bonus3, weekHomerPenalty=:penalty, weekTotalScore=:totalScore WHERE id=:id";
        try {
            $pdo = $this->getPDOConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam("delta", $userScore->delta);
            $stmt->bindParam("bonus1", $userScore->weekLowDiffBonus);
            $stmt->bindParam("bonus2", $userScore->weekExactDiffBonus);
            $stmt->bindParam("bonus3", $userScore->weekExactScoreBonus);
            $stmt->bindParam("penalty", $userScore->weekHomerPenalty);
            $stmt->bindParam("totalScore", $userScore->weekTotalScore);
            $stmt->bindParam("id", $userScore->id);
            $stmt->execute();
            $pdo = null;
            return $userScore;
        } catch (PDOException $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '""}}';
        }
    }

    public function getGameScores($gameId)
    {
        $sql = "Select * from scores WHERE gameId=:gameId";
        try {
            $pdo = $this->getPDOConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam("gameId", $gameId);
            $scores = $stmt->execute();
            $pdo = null;
            return $scores;
        } catch (PDOException $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '""}}';
        }
    }

    public function insertGame($game) {
        $sql = "INSERT INTO schedule
                (week, opponent, location, stadiumName, homeoraway, gameDate, closeDate, showUntilDate)
                values (:week, :opponent, :location, :stadium, :homeOrAway, :gameDate, :closeDate, :showUntilDate)";
        try {
            $pdo = $this->getPDOConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam("week", $game->week);
            $stmt->bindParam("opponent", $game->opponent);
            $stmt->bindParam("location", $game->location);
            $stmt->bindParam("stadium", $game->stadium);
            $stmt->bindParam("homeOrAway", $game->homeOrAway);

            $stmt->bindParam("gameDate", $game->gameDate);
            $stmt->bindParam("closeDate", $game->closeDate);
            $stmt->bindParam("showUntilDate", $game->showUntilDate);
            $stmt->execute();
            $game->id = $pdo->lastInsertId();
            $pdo = null;
            return $game;
        } catch (PDOException $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '"}}';
        }
    }

    public function getSchedule() {
//        $sql = "Select id, week, opponent, location, stadiumName, homeoraway, byuScore, oppScore, gameDate, closeDate, showUntilDate
//                  from schedule
//                ORDER BY gameDate";
        $sql = "Select id, opponent, location, stadiumName, homeoraway, byuScore, oppScore,
                       gameDate, closeDate, showUntilDate, sysdate() as now
                  from schedule
                ORDER BY gameDate";

        try {
            return $this->getFullList($sql);
        } catch (PDOException $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '""}}';
        }
    }

    public function getLeaderResults() {
        $sql = "select s.uid, ca.name, sum(s.weekTotalScore) as totalScore
                  from football.scores s, football.customers_auth ca
                 where s.uid = ca.uid
                group by s.uid
                order by totalScore DESC, ca.name";

        try {
            return $this->getFullList($sql);
        } catch (PDOException $e) {
            echo '{"error":{"text":"' . $e->getMessage() . '""}}';
        }
    }

    /**
     * Creating new record
     */
    public function insertIntoTable($obj, $column_names, $table_name)
    {

        $c = (array)$obj;
        $keys = array_keys($c);
        $columns = '';
        $values = '';
        foreach ($column_names as $desired_key) { // Check the obj received. If blank insert blank into the array.
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $c[$desired_key];
            }
            $columns = $columns . $desired_key . ',';
            $values = $values . "'" . $$desired_key . "',";
        }
        $query = "INSERT INTO " . $table_name . "(" . trim($columns, ',') . ") VALUES(" . trim($values, ',') . ")";
        $r = $this->conn->query($query) or die($this->conn->error . __LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
        } else {
            return NULL;
        }
    }

    public function getSession()
    {
        if (!isset($_SESSION)) {
            session_start();
        }
        $sess = array();
        if (isset($_SESSION['uid'])) {
            $sess["uid"] = $_SESSION['uid'];
            $sess["name"] = $_SESSION['name'];
            $sess["username"] = $_SESSION['username'];
            $sess["roles"] = $_SESSION['roles'];
        } else {
            $sess["uid"] = '';
            $sess["name"] = 'Guest';
            $sess["username"] = '';
            $sess["roles"] = array();
        }
        return $sess;
    }

    public function destroySession()
    {
        if (!isset($_SESSION)) {
            session_start();
        }
        if (isSet($_SESSION['uid'])) {
            unset($_SESSION['uid']);
            unset($_SESSION['name']);
            unset($_SESSION['username']);
            unset($_SESSION['roles']);
            $info = 'info';
            if (isSet($_COOKIE[$info])) {
                setcookie($info, '', time() - $cookie_time);
            }
            $msg = "Logged Out Successfully...";
        } else {
            $msg = "Not logged in...";
        }
        return $msg;
    }

    function getPDOConnection() {
        $dbhost = "localhost";
        $dbuser = "animal";
//        $dbpass = "p@ssword1";
        $dbpass = "v7jdLGQn4QLpAP8L";
        $dbname = "football";
        $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }

}

?>
