const API_URL = "https://login-system-6.onrender.com";

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        document.getElementById("result").innerText = data.message;
        alert(data.message);

    } catch (error) {
        console.error("Error connecting to server:", error);
        document.getElementById("result").innerText = "Server not reachable";
    }
}
