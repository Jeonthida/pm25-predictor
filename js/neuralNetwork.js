class NeuralNetwork {
    constructor() {
        this.weights = [0.5, 0.3, 0.2, 0.1]; // ค่า Weight เริ่มต้น
        this.bias = 0.1;
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    updateWeights(newWeights) {
        const logElement = document.getElementById('weight-log');
        logElement.innerHTML = ""; // เคลียร์ log เก่าก่อน

        this.weights = newWeights;
        logElement.innerHTML += `Updated Weights: [${this.weights.join(", ")}]\n`;
    }

    predict(inputs) {
        let sum = this.bias;
        for (let i = 0; i < this.weights.length; i++) {
            sum += this.weights[i] * inputs[i];
        }
        const output = this.sigmoid(sum) * 500;

        // บันทึกกระบวนการคำนวณ
        const logElement = document.getElementById('weight-log');
        logElement.innerHTML += `Inputs: [${inputs.join(", ")}] -> Output: ${output.toFixed(2)}\n`;

        return output;
    }
}

const neuralNet = new NeuralNetwork();
