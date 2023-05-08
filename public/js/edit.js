//==========================================================================
// UPDATE POST
const updateButtonHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const postId = document.querySelector('#post-id').value;

  if (title && content) {
    const response = await fetch(`/api/post/update`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert('Failed to update post');
    }
  }
};


//==========================================================================
// DELETE POST
const delButtonHandler = async (event) => {
  const postId = document.querySelector('#post-id').value;

  if (postId) {
    const response = await fetch(`/api/post/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};


//==========================================================================
// EVENT HANDLERS
document
  .querySelector('.update-post-button')
  .addEventListener('click', updateButtonHandler);

document
  .querySelector('.delete-post-button')
  .addEventListener('click', delButtonHandler);