$('.comment-form').click(commentFormHandler);

async function commentFormHandler (e) {
    e.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    const forumId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            forumId: forum_id,
            comment_text: content,
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