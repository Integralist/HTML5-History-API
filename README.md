[Integralist](http://www.integralist.co.uk/) - HTML5 History API
================================

Description
-----------

This is an 'extended/improved' version of the example found in the '[Dive into HTML5](http://diveintohtml5.org/history.html)' online book.

In the example the author demonstrates a photo gallery that links to different pages.

Each page has the same content/layout, the only difference is the photo being displayed.

My issue with the example was that the home page had the full HTML layout/css but all other pages linked to only had the relevant section of the HTML for the gallery.

I appreciate this made his example simpler to understand how the XMLHttpRequest was pulling in the fresh data and populating the current page, but I prefer a 'fuller' more realistic example where the HTML for all subsequent pages are also full pages and not just the HTML for the gallery/photo.

For example, in the original version, if you disabled JavaScript then yes the link to the other page would still be accessible, but the design of it would be plain black text on white background because those pages don't feature the full HTML/CSS. So without JavaScript the page wasn't a good enough user experience (in my opinion).

My example makes sure that if JavaScript is disabled then even the subsequent pages have a full design as per the initially loaded page (and means if a user is linked through from a search engine to a subsequent page that wasn't the home page - and they happen to have JavaScript disabled - then they would still see a fully 'designed' page!)