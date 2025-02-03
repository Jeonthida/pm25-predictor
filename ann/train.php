<?php
include 'db.php';

// ฟังก์ชัน Sigmoid Activation
function sigmoid($x) {
    return 1 / (1 + exp(-$x));
}

// ฟังก์ชัน Sigmoid Derivative
function sigmoid_derivative($x) {
    return $x * (1 - $x);
}

// อ่านข้อมูลจากฐานข้อมูล
$result = $conn->query("SELECT * FROM dataset");
$dataset = [];
while ($row = $result->fetch_assoc()) {
    $dataset[] = $row;
}

// กำหนดค่าเริ่มต้นของ Weight และ Bias
$weight1 = rand(-10, 10) / 10;
$weight2 = rand(-10, 10) / 10;
$weight3 = rand(-10, 10) / 10;
$weight4 = rand(-10, 10) / 10;
$bias = rand(-5, 5) / 10;

// กำหนด Learning Rate และ Threshold
$learning_rate = 0.01;
$epochs = 1000; // จำนวนรอบในการฝึก
$threshold = isset($_POST['threshold']) ? $_POST['threshold'] : 0.5; // ค่า Threshold ที่รับจากผู้ใช้

// Gradient Descent
for ($epoch = 0; $epoch < $epochs; $epoch++) {
    $total_error = 0;

    foreach ($dataset as $data) {
        // ดึงข้อมูลอินพุตจากฐานข้อมูล
        $pm25 = $data['pm25'];
        $temperature = $data['temperature'];
        $humidity = $data['humidity'];
        $wind_speed = $data['wind_speed'];

        // คำนวณการคาดการณ์โดยใช้ Sigmoid
        $input = $pm25 * $weight1 + $temperature * $weight2 + $humidity * $weight3 + $wind_speed * $weight4 + $bias;
        $prediction = sigmoid($input);

        // ปรับค่าการทำนายโดยใช้ Threshold
        $final_prediction = ($prediction >= $threshold) ? 1 : 0;

        // คำนวณ Error
        $target = $data['prediction']; // ค่าที่คาดหวัง (จาก dataset)
        $error = $target - $final_prediction;
        $total_error += pow($error, 2); // คำนวณ Error แบบ Mean Squared Error (MSE)

        // คำนวณ Gradient สำหรับ Weight และ Bias
        $d_error = $error * sigmoid_derivative($prediction);

        // อัปเดต Weight และ Bias โดยใช้ Gradient Descent
        $weight1 += $learning_rate * $d_error * $pm25;
        $weight2 += $learning_rate * $d_error * $temperature;
        $weight3 += $learning_rate * $d_error * $humidity;
        $weight4 += $learning_rate * $d_error * $wind_speed;
        $bias += $learning_rate * $d_error;
    }

    // ปริ้น Error ทุก 100 รอบ
    if ($epoch % 100 == 0) {
        echo "Epoch $epoch: Total Error = $total_error<br>";
    }
}

// บันทึกค่า Weight และ Bias ลงในฐานข้อมูล
$conn->query("INSERT INTO weights (weight1, weight2, weight3, weight4, bias) 
              VALUES ('$weight1', '$weight2', '$weight3', '$weight4', '$bias')");

// ส่งค่ากลับไปให้หน้าเว็บ
echo json_encode([
    "status" => "success",
    "weights" => [$weight1, $weight2, $weight3, $weight4],
    "bias" => $bias,
    "threshold" => $threshold
]);
?>
