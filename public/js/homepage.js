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

$('#signup-button').click(signUp);

async function signUp(e) {
  e.preventDefault();

  const email = $('#signup-email').val().trim();
  const password = $('#signup-password').val().trim();

  if (email && password) {
    const response = await fetch('./api/accounts', {
      method: 'POST', 
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/myprofile')
    } else {
      alert(response.statusText);
    }
  }
};