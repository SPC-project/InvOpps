var delim_symbol = "→"
var empty_symbol = "Ø"
var input_field_start = "<input type='text' class='text-center' value='"
var input_field_end = "' onkeypress='mna_press(event)'>"

function mna_press(e){
	e = e || window.event;
	if( e.keyCode == 10 ){ // ctrl+enter
		add_new_rule();
		var rows = document.getElementById("MNA_scheme").rows;
		var last = rows.length - 1;
		rows[last].cells[0].children[0].focus();
	}
}

function add_rule(key_field, subst_field){
	var MNA_sheme = document.getElementById("MNA_scheme")
	var row_for_rule = MNA_sheme.insertRow();
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
