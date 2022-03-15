function copyFormatted (html) {
  // Create an iframe (isolated container) for the HTML
  var container = document.createElement('div')
  container.innerHTML = html
  
  // Hide element
  container.style.position = 'fixed'
  container.style.pointerEvents = 'none'

  // Detect all style sheets of the page
  var activeSheets = Array.prototype.slice.call(document.styleSheets)
    .filter(function (sheet) {
      return !sheet.disabled
  })

  // Mount the iframe to the DOM to make `contentWindow` available
  document.body.appendChild(container)

  // Copy to clipboard
  window.getSelection().removeAllRanges()
  
  var range = document.createRange()
  range.selectNode(container)
  window.getSelection().addRange(range)

  document.execCommand('copy')
  for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = true
  document.execCommand('copy')
  for (var i = 0; i < activeSheets.length; i++) activeSheets[i].disabled = false
  
  // Remove the iframe
  document.body.removeChild(container)
}

