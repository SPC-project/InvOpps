

function euler (){

x1 = parseInt(document.getElementById("x_O").value);
x2 = parseInt(document.getElementById("x_N").value);
y1 = parseInt(document.getElementById("y_Euler").value);
h = parseFloat(document.getElementById("h_Euler").value);
f = document.getElementById("inputf").value;

	console.log("\tX\t|\tY\t");
	console.log("------------------------------------");


var x = x1, y = y1 ;


	//while ((x<x2  && x1<x2) ||(x>x2  && x1>x2) )
	 for (var t = x; t < x2; t += h){

   
		f = "with (Math) {" + f + "}";	
		console.log("\t"  + f  + "\t\t" );
		console.log("\t" + x + "\t\t" + y);

		y = y+ h*eval(f) ;
		py = y + h/2 * eval(f);


		x = ((x * 10) + (h * 10)) / 10;

	
		/*y +=  h *eval(f) ; 
		py = y + h/2 * eval(f);*/
		
		//x += h ; 

	document.getElementById("elem").innerHTML +=  " X( " +t.toPrecision(2)+ ") :\t\t y  \t\t" + py.toPrecision(5) + "\n<br>" ;
	 //   document.write (x + " :  " + y.toFixed(6) + "<br>"+"<hr align = 'left'  width = '250' >"); 
	}
	return y;	
}




function clr() {
    document.getElementById('elem').innerHTML = '';
}


