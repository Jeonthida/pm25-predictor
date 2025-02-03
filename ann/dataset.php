<?php
include 'db.php';
header("Content-Type: application/json");

$action = $_GET['action'] ?? '';

// ✅ ดึงข้อมูลทั้งหมดจากฐานข้อมูล
if ($action === "fetch") {
    $result = $conn->query("SELECT id, date, pm25, temperature, humidity, wind_speed, weight1, weight2, weight3, weight4, bias, prediction FROM dataset ORDER BY date ASC");
    $dataset = [];

    while ($row = $result->fetch_assoc()) {
        $dataset[] = $row;
    }
    echo json_encode($dataset);
    exit;
}

// ✅ เพิ่มข้อมูลใหม่เข้า MySQL
if ($action === "add") {
    $date = $_POST['date'] ?? '';
    $pm25 = $_POST['pm25'] ?? '';
    $temperature = $_POST['temperature'] ?? '';
    $humidity = $_POST['humidity'] ?? '';
    $wind_speed = $_POST['wind_speed'] ?? '';

    if (!$date || !$pm25 || !$temperature || !$humidity || !$wind_speed) {
        echo json_encode(["error" => "ข้อมูลไม่ครบ"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO dataset (date, pm25, temperature, humidity, wind_speed) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sdddd", $date, $pm25, $temperature, $humidity, $wind_speed);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => "บันทึกข้อมูลสำเร็จ"]);
    } else {
        echo json_encode(["error" => "เกิดข้อผิดพลาดในการบันทึกข้อมูล"]);
    }

    $stmt->close();
    exit;
}

// ✅ ลบข้อมูลจาก MySQL
if ($action === "delete") {
    $id = $_POST['id'] ?? '';

    if (!$id) {
        echo json_encode(["error" => "ไม่มี ID ที่ต้องการลบ"]);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM dataset WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => "ลบข้อมูลสำเร็จ"]);
    } else {
        echo json_encode(["error" => "เกิดข้อผิดพลาดในการลบข้อมูล"]);
    }

    $stmt->close();
    exit;
}

// ✅ ปิดการเชื่อมต่อ
$conn->close();
?>
