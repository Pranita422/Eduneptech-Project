const axios = require("axios");

const test = async () => {
    try {
        const payload = {
            userId: "679461df68bb45ce1e2229ad", // Existing user ID from some previous data? 
            problemId: "6976375b4637f31a91ac6dec",
            language: "JavaScript",
            code: "function solution(arr) { return arr[0] + arr[1]; }"
        };

        console.log("Sending payload:", payload);
        const res = await axios.post("http://localhost:5000/api/submissions", payload);
        console.log("Success Response:", res.data);
    } catch (err) {
        if (err.response) {
            console.log("Error Response Status:", err.response.status);
            console.log("Error Response Data:", err.response.data);
        } else {
            console.log("Error Message:", err.message);
        }
    }
};

test();
