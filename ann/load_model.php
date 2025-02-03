<?php
if (file_exists("model.json")) {
    echo file_get_contents("model.json"); // โหลดข้อมูลโมเดลจากไฟล์ JSON
} else {
    echo json_encode(["status" => "error", "message" => "ไม่พบไฟล์โมเดล"]);
}
?>
