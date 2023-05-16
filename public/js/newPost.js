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
  // CLIENT SIDE - CREATE NEW POST

  const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const rawContent = document.querySelector('#post-content').value;

    if (title && rawContent) {

      // Convert content to remove spaces and line breaks
      const post = convertContent(rawContent);

      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, post }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };


  //==========================================================================
  // CLICK HANDLERS
  document.querySelector('.new-post-button').onclick = newPostFormHandler;
});