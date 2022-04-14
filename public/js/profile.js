// edit profile button working & save button to save the entered data
$('#edit-button').click(function () {
  $('.contact-info').css('display', 'none');
  $('#contact-input').removeClass('hide');
});

$('#cancel-edit').click(function () {
  $('.contact-info').css('display', 'initial');
  $('#contact-input').addClass('hide');
});

$('#save-btn').click(saveInput);

async function saveInput(e) {
  e.preventDefault();
  console.log('test')
  const location = $('#location').val();
  const companyName = $('#company-name').val().trim();
  const position = $('#position').val().trim();
  const phoneNumber = $('#mobile-num').val().trim();
  const email = $('#email').val().trim();
  const address = $('#work-adds').val().trim();

  const response = await fetch('/api/users/save', {
    method: 'PUT',
    body: JSON.stringify({
      Location: location,
      company_name: companyName,
      position: position,
      mobile_number: phoneNumber,
      email: email,
      work_address: address,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace(`/myprofile`);
  } else {
    alert(response.statusText);
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
