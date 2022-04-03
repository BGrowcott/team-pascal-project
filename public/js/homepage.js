//log in
$('#login-button').click(logIn);

async function logIn(e) {
  e.preventDefault();

  const email = $('#login-email').val().trim();
  const password = $('#login-password').val();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/accounts/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      setTimeout(() => {
          document.location.replace(`/myprofile`)
        }, 200);
    } else {
      alert(response.statusText);
    }
    console.log(response)
  }
}