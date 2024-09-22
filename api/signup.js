const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Signup Successful');
            // Redirect to another page or handle success
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error during signup:', error.message);
    }
});
