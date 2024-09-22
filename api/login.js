const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login Successful');
            // Redirect to another page or handle success
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error during login:', error.message);
    }
});
