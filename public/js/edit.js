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
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.update-post-button')
  .addEventListener('click', updateButtonHandler);

document
  .querySelector('.delete-post-button')
  .addEventListener('click', delButtonHandler);