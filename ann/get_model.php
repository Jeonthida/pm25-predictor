<?php
include 'db.php';

$result = $conn->query("SELECT * FROM weights ORDER BY id DESC LIMIT 1");

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "weight1" => $row['weight1'],
        "weight2" => $row['weight2'],
        "weight3" => $row['weight3'],
        "weight4" => $row['weight4'],
        "bias" => $row['bias']
    ]);
} else {
    echo json_encode([
        "weight1" => 0,
        "weight2" => 0,
        "weight3" => 0,
        "weight4" => 0,
        "bias" => 0
    ]);
}
?>
