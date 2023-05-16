module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  restore_content: (str) => {
    // Restore spaces
    const restoreSpaces = str.replace(/§/g, ' ');
    // Restore line breaks
    const restoreLines = restoreSpaces.replace(/€/g, '<br />');
    return restoreLines;
  }
};