var delim_symbol = "→";
var empty_symbol = "Ø";
var input_field_start = "<input type='text' class='text-center' value='";
var input_field_end = "' onkeydown='mna_typing(event)'>";
var selected_row = null;
var max_allowed_steps_count = 1000;

function isRu(){
	return document.getElementsByTagName("html")[0].getAttribute("lang") == "ru"
}

function defaultInput(){
	var value = document.getElementById("coded_text").value;
	var def = isRu() ? "Текст, над которым алгоритм будет работать" : "Text for processing algorithm"
	if( value == def || value == "")
		return true
	else
		return false
}

function load_example(index){
	clean_rules("MNA_scheme");
	clean_rules("log");
	switch( index ){
		case 1:
			add_rule("1", "0|");
			add_rule("|0", "0||");
			add_rule("0", empty_symbol);
			if( defaultInput() ) {
				var example = Math.floor((Math.random() * 16) + 1);
				document.getElementById("coded_text").value = example.toString(2);
			}
			break;
		case 2:
			add_rule(".a", "m.");
			add_rule(".b", "n.");
			add_rule(".c", "o.");
			add_rule(".d", "p.");
			add_rule(".e", "q.");
			add_rule(".f", "r.");
			add_rule(".g", "s.");
			add_rule(".h", "t.");
			add_rule(".i", "u.");
			add_rule(".j", "v.");
			add_rule(".k", "w.");
			add_rule(".l", "x.");
			add_rule(".m", "y.");
			add_rule(".n", "z.");
			add_rule(".o", "a.");
			add_rule(".p", "b.");
			add_rule(".q", "c.");
			add_rule(".r", "d.");
			add_rule(".s", "e.");
			add_rule(".t", "f.");
			add_rule(".u", "g.");
			add_rule(".v", "h.");
			add_rule(".w", "i.");
			add_rule(".x", "j.");
			add_rule(".y", "k.");
			add_rule(".z", "l.");
			add_rule(". ", " .");
			if( defaultInput() ) {
				var example = ".hello wolrd"
				document.getElementById("coded_text").value = example;
			}
			break;
		case 3:
			add_rule("m.", ".a" );
			add_rule("n.", ".b" );
			add_rule("o.", ".c" );
			add_rule("p.", ".d" );
			add_rule("q.", ".e" );
			add_rule("r.", ".f" );
			add_rule("s.", ".g" );
			add_rule("t.", ".h" );
			add_rule("u.", ".i" );
			add_rule("v.", ".j" );
			add_rule("w.", ".k" );
			add_rule("x.", ".l" );
			add_rule("y.", ".m" );
			add_rule("z.", ".n" );
			add_rule("a.", ".o" );
			add_rule("b.", ".p" );
			add_rule("c.", ".q" );
			add_rule("d.", ".r" );
			add_rule("e.", ".s" );
			add_rule("f.", ".t" );
			add_rule("g.", ".u" );
			add_rule("h.", ".v" );
			add_rule("i.", ".w" );
			add_rule("j.", ".x" );
			add_rule("k.", ".y" );
			add_rule("l.", ".z" );
			add_rule(" .", ". ");
			if( defaultInput() ) {
				var example = "azq fa dgxq ftqy mxx."
				document.getElementById("coded_text").value = example;
			}
			break; 
		case 4:
			add_rule("u⠂", "0m");
			add_rule("m⠄", "0l");
			add_rule("l⠁", "0u"); 
			add_rule("u⠄", "1l");
			add_rule("m⠁", "1u"); 
			add_rule("l⠂", "1m");
			add_rule("u",  "");
			add_rule("m",  "");
			add_rule("l",  "");
			add_rule("⠂⠁", "1u");
			add_rule("⠂⠄", "0l");
			var number = Math.floor((Math.random() * 32) + 32).toString(2);
			var symbols = ['⠄', '⠂', '⠁']
			var pos = 1
			var example = symbols[pos]
			for (var i = 0, l = number.length; i < l; i++) {
				var v = number[i];
				if( Number(v) ) {
					pos += 1;
					if( pos == 3 )
						pos = 0
				} else {
					pos -= 1;
					if( pos == -1 )
						pos = 2
				}
				example += symbols[pos]
			}
			document.getElementById("coded_text").value = example;
			break;
	}
}

function copyToInput(){
	var from = document.getElementById("decoded_text");
	var to = document.getElementById("coded_text");
	to.value = from.innerHTML;
	from.innerHTML = "";
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
		button.value = isRu() ? "Очистить" : "Clean" ;
		button.title = isRu() ? "Очистить таблицу правил" : "Clean rules' table"
		button.onclick = function(){ 
			clean_rules("MNA_scheme");
			clean_rules("log");
			document.getElementById("examples").selectedIndex = 0; 
			document.getElementById("coded_text").value = "";
			document.getElementById("decoded_text").innerHTML = "";
			document.getElementById("size_tip").innerHTML = 0;
		}
	} else {
		button.className = "btn btn-warning";
		button.value = isRu() ? "Удалить" : "Delete";
		button.title = isRu() ? "Удалить выбранное правило" : "Delete selected rule"
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
		searhed_keys = log_row.insertCell(0); 
		searhed_keys.innerHTML = isRu() ? "Подстановки" : "Substitution";
		substitution = log_row.insertCell(1);
		substitution.innerHTML = isRu() ? "Выполненные замены" : "Proceed";
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
		substitution.innerHTML = isRu() ? "Завершение программы (шагов: " : "Done (take steps: ";
		substitution.innerHTML += log.rows.length + ")";
	}
}
