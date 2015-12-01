var tree = null;

function makeNode(value){
	return {
		data:  value,
		left:  null,
		right: null,
		isRed: true,
	}
}

function isRed(node) {
	return node != null && node.isRed
}

// Swap node with one of his children
function single_rotation(dad, child, anotherChild){
	var son = dad[child];

	dad[child] = son[anotherChild];
	son[anotherChild] = dad;

	dad.isRed = true;
	son.isRed = false;

	return son;
}

function double_rotation(dad, child, anotherChild){
	dad[child] = single_rotation( dad[child], anotherChild, child );
	return single_rotation( dad, child, anotherChild );
}

function insert(data){
	var newNode = makeNode(data);
	if( tree == null ){
		tree = newNode; 
	} else {
		var fake_root = makeNode(null);
		var granddad, dad, curr;
		var child, another_child, prev_child, prev_child;
		granddad = fake_root
		curr = fake_root.right = tree;
		child = tree.data > data ? "left" : "right"

		// Sync with http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_rbtree.aspx 
		// t - granddad
		// g - dad
		// p - curr
		// q - curr[child]
		// dir  - child
		// last - prevChild

		while( true ){
			if( curr[child] == null ){
				curr[child] = newNode
			} else if( isRed(curr.left) && isRed(curr.right) ) {
				curr.isRed = true;
				curr.left.isRed = false; 
				curr.right.isRed = false; 
			}

			// Fix red violation
			if( isRed(curr[child]) && isRed(curr) ){
				var to_rotation = granddad.right == dad ? "right" : "left";
				var prev_anotherChild = prev_child == "left" ? "right" : "left";

				if( child == prev_child ) // granddad, dad & curr is all lift- or right-handed nodes
					granddad[to_rotation] = single_rotation(dad, prev_child, prev_anotherChild)
				 else
					granddad[to_rotation] = double_rotation(dad, prev_child, prev_anotherChild)
			}

			if( curr[child].data == data ) 
				break // avoid duplicates

			prev_child = child
			child = curr[child].data > data ? "left" : "right"

			if( dad != null )
				granddad = dad
			dad = curr
			curr = curr[prev_child]
		}
		tree = fake_root.right
	}

	tree.isRed = false; // immediately obey to Constrain 1
}

function remove(data){
	if( tree != null ) {
		var fake_root = makeNode();
		var dad = null, curr;
		var removed_node = null;

		fake_root.right = tree;
		curr = fake_root;
		var child = "right", another_child = "left", prev_child;

		// g - dad
		// p - curr
		// q - curr[child]
		// s - brother
		// dir  - child
		// last - prev_child
		while( curr[child] != null ){
			if( data == curr[child].data ){
				removed_node = curr[child];
			}

			// Push down red node
			if( isRed(curr) && isRed(curr[child]) ) {
				if( curr[another_child].isRed ) {
					curr[prev_child] = single_rotation( curr[child], child, another_child );
					curr = curr[prev_child]
				} else {
					var another_prevChild = prev_child == "left" ? "right" : "left";
					if( curr[another_prevChild] != null ) {
						var brother = curr[another_prevChild];
						if( isRed(brother[another_prevChild]) && isRed(brother[prev_child]) ) {
							curr.isRed = false;
							brother.isRed = true;
							curr[child] = true;
						} else {
							var descendant = dad.right == curr ? "right" : "left";

							if( isRed( brother[prev_child] ) )
								dad[descendant] = double_rotation(curr, prev_child);
							else
								dad[descendant] = single_rotation(curr, prev_child);

							curr[child].isRed = true;
							dad[descendant].isRed = true;
							dad[descendant].left.isRed = false;
							dad[descendant].right.isRed = false;
						}
					}
				}
			}

			prev_child = child;
			dad = curr;
			curr = curr[child];
			if( data < curr.data ){
				child = "left";
				another_child = "right";
			} else {
				child = "right";
				another_child = "left";
			}
		}

		// curr[child] point to null (exit condition from loop)
		if( removed_node != null ) {
			removed_node.data = dad[prev_child].data; // swap removed and 'leaf', delete first 
			if( prev_child == 'right' ) {
				if( dad[prev_child].left == null )
					dad.right = dad[prev_child].right
				else
					dad.right = dad[prev_child].left
			} else {
				if( dad[prev_child].left == null )
					dad.left = dad[prev_child].right
				else
					dad.left = dad[prev_child].left
			}
		}

		tree = fake_root.right
		if( tree != null )
			tree.isRed = false

	}
}

function zap(){
	tree = null;
}

/////////////////////////////////////////////////
///////////////// Interface /////////////////////
/////////////////////////////////////////////////
function text_tree(){
	document.getElementById("tree_view").innerHTML = "<div class='btn-group'>" + text_node(tree) + "</div>"
}

function text_node(node) {
	if( node == null )
		return "";

	var left_tag = "<button type='button' class='btn btn-default'>";
	var value = node.data;
	if( node == tree )
		value = "<b>" + value + "</b>";
	var right_tag = "</button>";
	return text_node(node.left) + left_tag + value + right_tag + text_node(node.right)
}

function add_rnd_node(){
	var value = Math.floor((Math.random() * 100) + 1);
	insert(value)
	text_tree()
}

function add_this_node(value){
	var value = document.getElementById("value").value
	insert(value)
	text_tree()
}

function del_this_node(){
	var value = document.getElementById("value").value
	remove(value)
	text_tree()
}

function clear_tree(){
	zap()
	text_tree()
}

function value_keydown(e){
	var keyCode = (e || window.event).keyCode;
	switch(keyCode) {
		case 13:  // enter
			add_this_node();
			document.getElementById("value").value = "";
			break;
		case 46:  // delete
			del_this_node();
			document.getElementById("value").value = "";
			break;
	}
}
