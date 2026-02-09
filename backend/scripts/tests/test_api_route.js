const axios = require("axios");

async function testRoute() {
    try {
        console.log("1. Logging in as Ram...");
        const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
            email: "ram123@gmail.com",
            password: "password123" // Assuming this is the password or I need to reset it
        });

        const token = loginRes.data.token;
        console.log("Login successful. Token obtained.");

        console.log("2. Testing GET /api/progress/elite...");
        const eliteRes = await axios.get("http://localhost:5000/api/progress/elite", {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Success! Data received:");
        console.log(JSON.stringify(eliteRes.data.readiness, null, 2));

    } catch (err) {
        console.error("Test Failed!");
        if (err.response) {
            console.error(`Status: ${err.response.status}`);
            console.error(`Data: ${JSON.stringify(err.response.data)}`);
        } else {
            console.error(err.message);
        }
    }
}

testRoute();
