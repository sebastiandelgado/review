
var body = document.createElement('body');
body.innerHTML = '<div><p><span>hello</span></p><p><span>goodbye</span></p></div>';
console.log(body);

var findAndReplace = function(domElement, oldTagName, newTagName) {

	if (domElement.tagName === oldTagName) {

		var newElement = document.createElement(newTagName);

		// Add all the children to the new element
		_.each(domElement.children, function(child) {
			newElement.appendChild(child);
		});

		// Append the new element to the parent node
		var parent = domElement.parentNode;
		var i = _.indexOf(parent.children, domElement);
		parent.removeChild(domElement);
		parent.insertBefore(newElement, parent.children[i]);

		// recurse on our new element
		_.each(newElement.children, function(child) {
			findAndReplace(child, oldTagName, newTagName);
		});

	} else {
		// Just calls itself recursively on the children
		_.each(domElement.children, function(child) {
			findAndReplace(child, oldTagName, newTagName);
		});
	}
}

findAndReplace(body, 'P', 'DIV');

console.log(body);