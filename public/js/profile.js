// edit profile button working & save button to save the entered data
$('#edit-button').click(function () {
  $('.contact-info').css('display', 'none');
  $('#contact-input').removeClass('hide');
});

$('#save-btn').click(saveInput);

async function saveInput(e) {
  e.preventDefault();

  const location = $('#location').val();
  const companyName = $('#company-name').val().trim();
  const position = $('#position').val().trim();
  const phoneNumber = $('#mobile-num').val().trim();
  const email = $('#email').val().trim();
  const address = $('#work-adds').val().trim();

  if (location && companyName && position && phoneNumber && email && address) {
    const response = await fetch('/homeRoutes/profile', {
      method: 'POST',
      body: JSON.stringify({
        location,
        companyName,
        position,
        phoneNumber,
        email,
        address,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace(`/myprofile`);
    } else {
      alert(response.statusText);
    }

    .then {
      $('#locat').push(location),
      $('#company').push(companyName),
      $('#role').push(position),
      $('#tel').push(phoneNumber),
      $('#mail').push(email),
      $('#adds').push(address)
    };

    console.log(response);
  }
}

$('#follow-user').click(addToFollowing);
async function addToFollowing(e) {
  const userId = e.target.dataset.id;
  const response = await fetch('/api/users/follow', {
    method: 'POST',
    body: JSON.stringify({ user_follow: userId }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    setTimeout(() => {
      document.location.replace(`/myprofile`);
    }, 200);
  } else {
    alert(response.statusText);
  }
}
