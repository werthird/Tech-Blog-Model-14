//==========================================================================
// DOCUMENT LOAD
document.addEventListener('DOMContentLoaded', function() {

  // =======================================================================
  // CONVERT TEXT FUNCTION
  function convertContent(str) {
    const convertSpaces = str.replace(/[ \t]/g, '§');
    const convertLinesBreaks = convertSpaces.replace(/\n/g, '€');
    return convertLinesBreaks;
  };


  //==========================================================================
  // UPDATE POST
  const updateButtonHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const rawContent = document.querySelector('#post-content').value;
    const postId = document.querySelector('#post-id').value;

    if (title && rawContent) {

      const post = convertContent(rawContent);
      
      const response = await fetch(`/api/post/update`, {
        method: 'PUT',
        body: JSON.stringify({ title, post, postId }),
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
  // CLICK HANDLER
  document.querySelector('.update-post-button').onclick = updateButtonHandler;

});