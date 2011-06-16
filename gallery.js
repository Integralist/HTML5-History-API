function supports_history_api() {
	return !!(window.history && history.pushState);
}

function clickHandler(e) {
	
	// If the 'swapPhoto' returns true
	// Meaning it was able to successfully request the next page's content
	if (swapPhoto(this.href)) {
		
		/*
			pushState(state, title, url)
			
			state: any JSON data structure
			title: any string
			url: any URL
			
			'state' is passed back to the popstate event hander (but we're not tracking state in this example so it's set to null)
			'title' is currently unused by major browsers. If you want to set the page title, you should store it in the state argument and set it manually in your popstate callback
			'url' is the URL you want to appear in the browser’s location bar
		*/
		history.pushState(null, null, this.href);
		
		// Prevent the browser from trying to follow the link
		// As the above line means we can update the URL and browser history 
		// All while dynamically loading the content from the linked page
		e.preventDefault();
		
	}
	
}

function addClicker(linkElement) {

	// Notice the 3rd argument is set to 'true'
	// Because we're using a modern browser we can use 'capturing' instead of 'bubbling'
	linkElement.addEventListener('click', clickHandler, true);
	
}

function setupHistoryClicks() {
	
	// Call function to set-up the 'click' event listeners for specified elements
	addClicker(document.getElementById('photonext'));
	addClicker(document.getElementById('photoprev'));
	
}

function swapPhoto(path) {
	
	// Request the 
	// Array.pop() = removes the last element from an array and returns that element
	var req = new XMLHttpRequest();
  		 req.open("GET", path.split("/").pop(), false);
		 req.send(null);
	
	// Check the request was successful	 
	if (req.status == 200) {
		
		var gallery, tempNode, nodes, found;
		
		found = false;
		gallery = document.getElementById('gallery');
		tempNode = document.createElement("div");
		tempNode.innerHTML = req.responseText;
		nodes = tempNode.getElementsByTagName("aside");
					
		// Loop through the HTML response looking for the relevant element we want
		for (var i=0, len=nodes.length; i<len; i++) {
		
			// If we find the element we're looking for
			if (nodes[i].id === "gallery") {
			
				console.log(nodes[i]);
				// Insert the new 'gallery' element before the current one
				gallery.parentNode.insertBefore(nodes[i], gallery);
				
				// Then remove the current one so the new one shows
				gallery.parentNode.removeChild(gallery);
				
				// Clean-up
				var tempNode = null;
				var nodes = null;
				
				// Re-apply the event listeners (as they would have been lost/replaced by new content)
				setupHistoryClicks();
				
				// Let the script know we found what we're looking for
				found = true;
				
				// Break the loop now we have found the element we want
				break;
				
			}
			
		}
		
		if (!found) {
			alert('hmmm, the page loaded didn\'t have the information we needed?');
		}
		
		// Let the 'caller' know this was a successful request (although the element we're looking for still might fail/alert)
		return true;
	}
  
	// Otherwise let the 'caller' know this was a failed request
	return false;
  
}

function popStateHandler(e) {

	// When we know the URL has changed we can attempt to update the photo
	// This is to fake moving 'backwards' in the history stack (e.g. when user clicks on browser's back button)
	swapPhoto(location.pathname);
	
}

function init() {
	
	// Check for HTML5 History API support
	if (!supports_history_api()) {
		return;
	}
	
	// Set-up event listeners for the pagination links
	setupHistoryClicks();
	
	window.setTimeout(function() {
		
		// Check when the URL has changed
		// Because we're effectively faking moving the browser history state 'forward' we need to also fake moving 'backwards' whenever the user clicks the browser's back button
		window.addEventListener('popstate', popStateHandler, false)
		
	}, 1);
	
}

addEventListener('DOMContentLoaded', init, false);