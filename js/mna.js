var delim_symbol = "→"
var empty_symbol = "Ø"
var input_field_start = "<input type='text' class='text-center' value='"
var input_field_end = "' onkeydown='mna_typing(event)'>"
var selected_row = null

function mna_typing(e){
	var keyCode = (e || window.event).keyCode;
	var rows = document.getElementById("MNA_scheme").rows
	var last = rows.length - 1;
	switch( keyCode ){ 
		case 13: // enter
			add_new_rule();
			rows[last].cells[0].children[0].focus();
			row_selection(rows[last])
			break
		case 9: // tab
			if( document.activeElement.value == empty_symbol ){ // if we tab from last cell in a row
				var currIndex = selected_row.rowIndex;
				if( currIndex != last )
					row_selection( rows[currIndex+1] )
			}
	}
}

function switch_button(to_def_state){
	var button = document.getElementById("removeBut");
	if( to_def_state ){
		button.className = "btn btn-default";
		button.value = "Очистить";
		button.onclick = clean_rules;
	} else {
		button.className = "btn btn-warning";
		button.value = "Удалить";
		button.onclick = delete_row;
	}
}

function row_selection(current_row){
	if( current_row.className ){
		current_row.className = "";
		switch_button(true);
		selected_row = null;
	} else {
		current_row.className = "warning";
		switch_button(false);
		if( selected_row ){
			selected_row.className = "";
		}
		selected_row = current_row;
	}
}

function add_rule(key_field, subst_field){
	var MNA_scheme = document.getElementById("MNA_scheme")
	var row_for_rule = MNA_scheme.insertRow();
	row_for_rule.onclick = function(){ row_selection(row_for_rule) }
	var key        = row_for_rule.insertCell(0);
	var delimeter  = row_for_rule.insertCell(1);
	var substitute = row_for_rule.insertCell(2);

	key.innerHTML        = input_field_start + key_field + input_field_end; 
	delimeter.innerHTML  = delim_symbol;
	substitute.innerHTML = input_field_start + subst_field + input_field_end;
}
 
function add_new_rule(){
	add_rule( "", empty_symbol )
}

function clean_rules(){
	var schemas = document.getElementById("MNA_scheme");
	for (var row = schemas.rows.length-1; row >= 0; row--) {
		schemas.deleteRow(row);
	}
}

function delete_row(){
	if( selected_row != null ){
		selected_row.remove()		
		switch_button(true) 
		selected_row = null
	} else {
		alert("Непредусмотренное поведение")
	}
}

function mna(){
	var task = document.getElementById("coded_text").value;
	var keys = document.getElementById("MNA_scheme").rows
	var keep_subst = true;
	var rule = null;
	var key = "";
	var subst = "";

	while( keep_subst ){
		keep_subst = false;
		for( i = 0; i < keys.length; i++ ){
			rule = keys.item(i).cells;
			key = rule.item(0).children.item(0).value;
			if( !key ) continue;
			subst = rule.item(2).children.item(0).value;
			if( task.indexOf(key) != -1 ){
				if( subst == "Ø" ) subst = "";
				task = task.replace( key, subst );

				keep_subst = true;
				break;
			}
		}
	}

	var to = document.getElementById("decoded_text");
	to.value = task;
	to.title = "Символов: " + task.length;
}
