//==========================================================================
// DOCUMENT LOAD
document.addEventListener('DOMContentLoaded', function() {


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
  // CLICK HANDLERS
  document.querySelector('.delete-post-button').onclick = delButtonHandler;

});