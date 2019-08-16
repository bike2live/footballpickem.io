<?php

class dbPDOConnect {

    private $conn;

    function __construct() {
    }

    /**
     * Establishing database connection
     * @return database connection handler
     */
    function connect() {
        include_once '../config.php';

        // Connecting to mysql database
        $this->conn = new PDO("mysql:host=localhost;dbname=football", DB_USERNAME, DB_PASSWORD);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // returning connection resource
        return $this->conn;
    }

}

?>
