//add an event listener to the save button and send to the backend
$("#savebtn").click(saveForum)

async function saveForum(e) {
    e.preventDefault();
}

const forumname = $('#forumname')
const forumdetails = $('#forumdetails')

if (forumname && forumdetails) {
//Send a POST request to the API endpoint
    const response = await fetch('/api/forums/create',{
        method:'POST',
        body: JSON.stringify({forumname, forumdetails}),

    });
    if (response.ok){
        setTimeout(()=> {
            document.location.replace(`/myforum`)
        }, 200);
    }else {
        alert(response.statusText);
    }
    console.log(response)
}

