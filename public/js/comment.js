// CLIENT SIDE - CREATE NEW COMMENT

const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-content').value.trim();
  const postId = document.querySelector('#post-id').value;

  if (comment) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ comment, postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentFormHandler);