document.getElementById('file-submit').addEventListener('click', addPhoto);
async function addPhoto(e) {
  e.preventDefault();
  
  var files = document.getElementById('file-upload').files;
  var file = files[0];
  if (!files.length) {
    return alert('Please choose a file to upload first.');
  }
  if (files.length > 1) {
    return alert('Please choose just one file.');
  }
  let extn = file.name.split('.').pop();
  if (extn !== 'jpg' && extn !== 'png' && extn !== 'gif') {
    return alert('Please choose an image file');
  }
  
  var reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onloadend = async function() {

    const request = {
      profile_pic: reader.result,
      extn: extn
    }

    const response = await fetch('/api/users/profilepic', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      setTimeout(() => {
        location.replace('/myprofile');
      }, 200);
    } else {
      alert(response.statusText);
    }

  }
}
