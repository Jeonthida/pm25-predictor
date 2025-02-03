<?php
include 'db.php';

$result = $conn->query("SELECT * FROM weights ORDER BY id DESC LIMIT 1");
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $modelData = json_encode([
        "weight1" => $row['weight1'],
        "weight2" => $row['weight2'],
        "weight3" => $row['weight3'],
        "weight4" => $row['weight4'],
        "bias" => $row['bias']
    ]);

    file_put_contents("model.json", $modelData); // บันทึกโมเดลลงไฟล์
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "ไม่พบโมเดลในฐานข้อมูล"]);
}
?>
