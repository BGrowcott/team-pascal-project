$('#comment-btn').click(commentFormHandler);


async function commentFormHandler (e) {
    e.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
console.log(e.target);
    const forumId = e.target.dataset.id;

    if (comment_text) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            forum_id: forumId,
            content: comment_text,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
            document.location.reload();
          } else {
            alert(response.statusText);
          }
    }
}

$('#delete-btn').click(deleteComment);

async function deleteComment (e) {
  e.preventDefault();

  const deleteElement = $('.comment-container');
  deleteElement.remove();
}