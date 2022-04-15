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
  const github = $('#github').val().trim();
  const slack = $('#slack').val().trim();
  const linked_in = $('#linkedin').val().trim();


  const response = await fetch('/api/users/save', {
    method: 'PUT',
    body: JSON.stringify({
      Location: location,
      company_name: companyName,
      position: position,
      mobile_number: phoneNumber,
      email: email,
      github: github,
      slack: slack,
      linked_in: linked_in
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

//functions for editing names and bio

$('#edit-name').click(editName)

function editName(){
  $('#name-container').css('display', 'none')
  $('#edit-name-container').css('display', 'flex')
}

$('#edit-bio').click(editBio)

function editBio(){
  $('#bio-container').css('display', 'none')
  $('#edit-bio-container').css('display', 'flex')
}

// saving function

$('#save-name').click(saveName)

async function saveName(e) {
  e.preventDefault();
  const firstName = $('#edit-first_name-input').val().trim()
  const lastName = $('#edit-last_name-input').val().trim()


const response = await fetch('/api/users/save', {
    method: 'PUT',
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace(`/myprofile`);
  } else {
    alert(response.statusText);
  }
}

$('#save-bio').click(saveBio)

async function saveBio(e) {
  e.preventDefault();
  const bio = $('#edit-bio-input').val().trim()

const response = await fetch('/api/users/save', {
    method: 'PUT',
    body: JSON.stringify({
      bio: bio
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace(`/myprofile`);
  } else {
    alert(response.statusText);
  }
}

