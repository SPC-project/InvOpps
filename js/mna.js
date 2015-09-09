var key_field    = "<input type='text' onchange='validate(this)'></input>"
var delim_symbol = "→"
var empty_field  = "<input type='text' onchange='validate(this)' value='Ø'></input>"

function add_new_rule(){
	var MNA_sheme = document.getElementById("MNA_scheme")
	var last_from_bottom = MNA_sheme.rows.length - 1;
	var row_for_rule = MNA_sheme.insertRow(last_from_bottom);
	var key        = row_for_rule.insertCell(0);
	var delimeter  = row_for_rule.insertCell(1);
	var substitute = row_for_rule.insertCell(2);

	key.innerHTML			= key_field;
	delimeter.innerHTML  = delim_symbol;
	substitute.innerHTML = empty_field;
}
 
function validate(form){
	var text = form.value;
	form.value = text.split("|").join("¦");
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
		for( i = 0; i < keys.length-1; i++ ){ //Последняя строка - кнопки, а правила замены
			var rule = keys.item(i).cells;
			var key = rule.item(0).children.item(0).value;
			var subst = rule.item(2).children.item(0).value;
			if( task.search(key) != -1 ){
				if( subst == "Ø" ) subst = "";
				task = task.replace( key, subst );

				keep_subst = true;
				break;
			}
		}
	}

	document.getElementById("decoded_text").value = task;
}
