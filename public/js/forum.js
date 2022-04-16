//add an event listener to the save button and send to the backend
$('#savebtn').click(saveForum);

async function saveForum(e) {
  e.preventDefault();

  const title = $('#forumname').val();
  const content = $('#forumdetails').val();
  console.log(title, content);
  if (title && content) {
    //Send a POST request to the API endpoint
    console.log(title, content);
    const response = await fetch('/api/forums/create', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      setTimeout(() => {
        document.location.replace(`/forums`);
      }, 200);
    } else {
      alert(response.statusText);
    }
  }
}


// for single forum page

$('#follow-forum').click(followForum)

async function followForum(e) {
  const forumId = e.target.dataset.id;
  const response = await fetch('/api/forums/follow', {
    method: 'POST',
    body: JSON.stringify({ forum_follow: forumId }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    setTimeout(() => {
      $('#follow-forum').css('display', 'none')
    }, 200);
  } else {
    alert(response.statusText);
  }
}

// delete a forum

$('#delete-forum').click(deleteForum);

async function deleteForum (e) {
  e.preventDefault();
  const id = e.target.getAttribute('data-id');
    const response = await fetch(`/api/forums/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace(`/forums`);
    } else {
      alert('Failed to delete post');
    }
}
