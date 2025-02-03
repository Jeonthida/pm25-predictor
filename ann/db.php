<?php
$servername = "localhost";
$username = "root";  // ค่าเริ่มต้นของ XAMPP
$password = "";  // ไม่มีรหัสผ่าน
$dbname = "pm25_ann";

$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8");

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("เชื่อมต่อฐานข้อมูลล้มเหลว: " . $conn->connect_error);
}
?>
