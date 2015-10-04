var delim_symbol = "→";
var empty_symbol = "Ø";
var input_field_start = "<input type='text' class='text-center' value='";
var input_field_end = "' onkeydown='mna_typing(event)'>";
var selected_row = null;
var max_allowed_steps_count = 1000;

function load_example(index){
	switch( index ){
		case 0:
			clean_rules("MNA_scheme");
			clean_rules("log");
			break;
		case 1:
			add_rule("1", "0|");
			add_rule("|0", "0||");
			add_rule("0", empty_symbol);
			var example = Math.floor((Math.random() * 16) + 1);
			document.getElementById("coded_text").value = example.toString(2);
			break;
	}
}

function set_limit(number){
	max_allowed_steps_count = number*1000; // in kilo-steps
}

function mna_typing(e){
	var keyCode = (e || window.event).keyCode;
	var rows = document.getElementById("MNA_scheme").rows
	switch( keyCode ){ 
		case 13: // enter
			add_new_rule();
			var last = rows.length - 1;
			rows[last].cells[0].children[0].focus();
			row_selection(rows[last])
			break
		case 9: // tab
			if( document.activeElement.value == empty_symbol ){ // if we tab from last cell in a row - go next row
				var currIndex = selected_row.rowIndex;
				if( currIndex != rows.length - 1 )
					row_selection( rows[currIndex+1] )
			}
	}
}

function switch_button(to_def_state){
	var button = document.getElementById("removeBut");
	if( to_def_state ){
		button.className = "btn btn-default";
		button.value = "Очистить";
		button.title = "Очистить таблицу правил"
		button.onclick = function(){ clean_rules("MNA_scheme"); clean_rules("log") };
	} else {
		button.className = "btn btn-warning";
		button.value = "Удалить";
		button.title = "Удалить выбранное правило"
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

function clean_rules(table){
	var schemas = document.getElementById(table);
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

function mna(need_log){
	var task = document.getElementById("coded_text").value;
	var keys = document.getElementById("MNA_scheme").rows
	var log = document.getElementById("log");

	var keep_subst = true;
	var rule = null;
	var key = "";
	var subst = "";
	var desc = "";
	var iteration = 0;

	var keyPos = -1;
	var log_row = null;
	var searhed_key = null;
	var substitution = null;

	clean_rules("log");
	if( need_log ){
		log_row = log.insertRow();
		searhed_keys = log_row.insertCell(0); searhed_keys.innerHTML = "Подстановки";
		substitution = log_row.insertCell(1); substitution.innerHTML = "Выполненные замены"
	}

	while( keep_subst ){
		keep_subst = false;
		iteration = iteration + 1;

		if( need_log ){
			log_row = log.insertRow();
			desc = ""
		}

		for( i = 0; i < keys.length; i++ ){
			// Get a key and it's complementary string
			rule = keys.item(i).cells;
			key = rule.item(0).children.item(0).value;
			if( !key ) continue;
			subst = rule.item(2).children.item(0).value;

			// Do substitution "key to complementary string" if key match
			keyPos = task.indexOf(key); 
			if( keyPos != -1 ){
				if( subst == "Ø" ) subst = "";

				if( need_log ) {
					searhed_keys = log_row.insertCell(0);
					searhed_keys.innerHTML = desc + "<u>" + key + "</u>";

					substitution = log_row.insertCell(1);
					var leftPart = task.substring(0, keyPos);
					var rightPart = task.substring(keyPos+key.length);
					substitution.innerHTML = leftPart + "<mark>" +  key  + "</mark>" + rightPart + " " + delim_symbol + " " + leftPart + "<mark>" + subst + "</mark>" + rightPart + "</p>";
				}

				task = task.replace( key, subst );
				keep_subst = true;
				break;
			} else if( need_log )
				desc = desc + key + ", ";
		}

		if( iteration > max_allowed_steps_count ) {
			alert("Алгоритм не завершил работу за установленное количество итераций (" + max_allowed_steps_count + "). Проверьте его правильность и, если потребуеться, отодвиньте границу." );
			break;
		}
	}

	document.getElementById("decoded_text").innerHTML = task;
	document.getElementById("size_tip").innerHTML = task.length;
	if( need_log ){
		var searhed_keys = log_row.insertCell(0);
		var substitution = log_row.insertCell(1);
		searhed_keys.innerHTML = desc.substr(0, desc.length-2); 
		substitution.innerHTML = "Завершение программы (шагов: " + log.rows.length + ")";
	}
}
