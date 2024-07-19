document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', loginUser);
    }
    if (document.getElementById('register-form')) {
        document.getElementById('register-form').addEventListener('submit', registerUser);
    }

    function loginUser(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('${process.env.BACKEND_URL}/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            } else {
                alert('Login failed');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function registerUser(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('${process.env.BACKEND_URL}/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert('Registration successful. Please login.');
            window.location.href = 'login.html';
        })
        .catch(error => console.error('Error:', error));
    }
});
