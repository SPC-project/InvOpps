var tree = null;
var tree_depth = 0;

function makeNode(value){
	return {
		pos: {row: -1, level: -1,},
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
	if( data == "" ) return;

	var newNode = makeNode(data);
	if( tree == null ){
		tree = newNode; 
		tree.isRed = false;
	} else {
		var fake_root = makeNode(null);
		var granddad, dad, curr;
		var child, another_child, prev_child, prev_child;
		child = tree.data > data ? "left" : "right";

		if( tree.data == data )
			return;
		if( tree[child] == null ){
			tree[child] = newNode;
			tree.isRed = false;
			return;
		}

		if( isRed(tree) && isRed(tree[child]) ){
			tree = single_rotation(tree, child, child == "left" ? 'right' : 'left' );
		} 

		granddad = fake_root
		fake_root.right = tree;
		fake_root.isRed = false;
		curr = fake_root;
		child = 'right';

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

				if( curr[child] == null )
					break;
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

	//tree.isRed = false; // immediately obey to Constrain 1
}

function remove(data){
	if( data == null ) return;

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
				if( isRed(curr[another_child]) ) {
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
function depth_update(node, lvl){
	if(node == null){
		if(tree_depth < lvl)
			tree_depth = lvl;
		return
	}

	depth_update(node.left, lvl+1);
	depth_update(node.right, lvl+1);
}

function pack_node(arr, node, row_pos, lvl, offset){
	if( node == null ){
		if( lvl > tree_depth )
			tree_depth = lvl;
		return
	}

	node.pos.row = row_pos;
	node.pos.level = lvl;

	var new_offset = offset/2
	pack_node( arr, node.left, row_pos - new_offset, lvl+1, new_offset );
	arr.push( node );
	pack_node( arr, node.right, row_pos + new_offset, lvl+1, new_offset );
}

function pack_tree(){
	tree_depth = 0;
	if( tree == null ){
		return [];
	}
	depth_update(tree, 0);
	var arr = [];
	pack_node(arr, tree, 0, 0, Math.pow(2, tree_depth) );
	
	return arr;
}

function add_rnd_node(){
	var value = Math.floor((Math.random() * 100) + 1);
	insert(value)
	draw_tree()
}

function add_this_node(value){
	var value = document.getElementById("value").value;
	if( !isNaN(Number(value)) )
		value = Number(value)
	insert(value)
	draw_tree()
}

function del_this_node(){
	var value = document.getElementById("value").value
	remove(value)
	draw_tree()
}

function clear_tree(){
	zap()
	draw_tree()
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

function get_from_svg(svg, what) {
	var param = svg.style(what);
	param = param.substring(0, param.length-2); // e.g. 2px
	return Number(param);
}

function draw_tree(){
	// element 'svg' initialized in .html
	svg.selectAll("*").remove();
	var radius = 18; 
	var svg_height = get_from_svg(svg, "height");
	var svg_width = get_from_svg(svg, "width") - 4*radius;
	var x_center = svg_width/2;
	var between_nodes = x_center / Math.pow(2, tree_depth);
	var data = pack_tree();
	var groups = svg.selectAll("g")
		 .data( data )
		 .enter()
		 .append("g");

	if( svg_height < 52*tree_depth + 30 )
		svg.style("height", 30 + 52*tree_depth )

	groups.attr("transform", function(d, i) {
		var x = 2*radius + x_center + between_nodes*d.pos.row;
		var y = 44 * d.pos.level + 30;
		return "translate(" + [Math.floor(x), Math.floor(y)] + ")";
	})
	  
	var circles = groups.append("circle")
		 .attr({
			cx: function(d,i){
			  return 0;
			},
			cy: function(d,i){
			  return 0;
			},
			r: radius,
			fill: "white",
			stroke: "#2F3550",
			"stroke-width": 2.4192
		 })
		 
	var label = groups.append("text")
		 .text(function(d){
			 return d.data;
		 })
		 .attr({
			 "alignment-baseline": "middle",
			 "text-anchor": "middle",
			 "font-style": function(d){
				 if( isNaN(Number(d.data)) )
					 return "italic"
				 else
					 return "normal"
			 },
			 "fill": function(d){
				 if( d.isRed)
					 return "red"
				 else
					 return "black"
			 }
		 });
	 svg.selectAll("*").on("click", function(d,i){ 
		 document.getElementById("value").value = d.data;
	 });
}

window.onresize = draw_tree;
