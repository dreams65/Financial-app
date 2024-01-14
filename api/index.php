<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'DbConnect.php';

class ApiHandler {
    private $conn;

    public function __construct() {
        $objDb = new DbConnect;
        $this->conn = $objDb->connect();
    }

    public function handleRequest() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $requestType = $_POST['cash'] ?? null;

            switch ($requestType) {
                case 'get':
                    $this->handleGetRequest();
                    break;

                case 'add':
                    $this->handleAddRequest();
                    break;

                default:
                    echo json_encode(['error' => 'Invalid request type']);
            }
        }

        if (isset($_GET['history'])) {
            $this->getHistory();
        }

        if (isset($_GET['budget'])) {
            $this->getBudget();
        }
    }

    private function handleGetRequest() {
        $title = $_POST['title'] ?? '';
        $value = $_POST['value'] ?? '';
        $date = date("Y-m-d H:i:s");

        $sqlSelect = "SELECT `id`, `budget` FROM `finance` WHERE 1";
        $stmtSelect = $this->conn->prepare($sqlSelect);
        $stmtSelect->execute();
        $result = $stmtSelect->fetch(PDO::FETCH_ASSOC);

        if ($result && $result['budget'] > 0 && abs($value) <= $result['budget']) {

            $sqlInsert = "INSERT INTO `costs`(`id`, `title`, `value`, `date_created`) VALUES (null, :title, :value, :date)";
            $stmtInsert = $this->conn->prepare($sqlInsert);
            $stmtInsert->bindParam(':title', $title);
            $stmtInsert->bindParam(':value', $value);
            $stmtInsert->bindParam(':date', $date);

            if ($stmtInsert->execute()) {

                $newBudget = $result['budget'] + $value;
                $sqlUpdate = "UPDATE `finance` SET `budget` = :newBudget WHERE `id` = :id";
                $stmtUpdate = $this->conn->prepare($sqlUpdate);
                $stmtUpdate->bindValue(':newBudget', $newBudget);
                $stmtUpdate->bindValue(':id', $result['id']);

                if ($stmtUpdate->execute()) {
                    $response = ['title' => 'Record created', 'message' => $value . 'zl' . ' for ' . $title];
                } else {
                    $response = ['message' => 'Oops... An error occurred while updating the other table'];
                }
            } else {
                $response = ['message' => 'Oops... An error occurred while inserting into the costs table'];
            }
        } else {
            $response = ['title' =>'Error', 'message' => 'Not enough budget to create a record'];
        }

        echo(json_encode($response));
    }

    private function handleAddRequest() {
        $title = $_POST['title'] ?? '';
        $value = $_POST['value'] ?? '';
        $date = date("Y-m-d H:i:s");

        $sqlInsert = "INSERT INTO `costs`(`id`, `title`, `value`, `date_created`) VALUES (null, :title, :value, :date)";
        $stmtInsert = $this->conn->prepare($sqlInsert);
        $stmtInsert->bindParam(':title', $title);
        $stmtInsert->bindParam(':value', $value);
        $stmtInsert->bindParam(':date', $date);

        if ($stmtInsert->execute()) {

            $sqlSelect = "SELECT `id`, `budget` FROM `finance` WHERE 1";
            $stmtSelect = $this->conn->prepare($sqlSelect);
            $stmtSelect->execute();
            $result = $stmtSelect->fetch(PDO::FETCH_ASSOC);

            if ($result) {

                $newBudget = $result['budget'] + $value;
                $sqlUpdate = "UPDATE `finance` SET `budget` = :newBudget WHERE `id` = :id";
                $stmtUpdate = $this->conn->prepare($sqlUpdate);
                $stmtUpdate->bindParam(':newBudget', $newBudget);
                $stmtUpdate->bindParam(':id', $result['id']);

                if ($stmtUpdate->execute()) {
                    $response = ['title' => 'Money added', 'message' => $value . 'zl' . ' ' . $title];
                } else {
                    $response = ['message' => 'Oops... An error occurred while updating the other table'];
                }
            } else {
                $response = ['message' => 'Value from the other table not found'];
            }
        } else {
            $response = ['message' => 'Oops... An error occurred while inserting into the costs table'];
        }

        echo(json_encode($response));
    }

    private function getHistory() {
        $sql = "SELECT * FROM `costs` ORDER BY `id` DESC";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $history = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo(json_encode($history));
    }

    private function getBudget() {
        $sql = "SELECT * FROM `finance` WHERE 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $budget = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo(json_encode($budget));
    }
}

$apiHandler = new ApiHandler();
$apiHandler->handleRequest();

?>
