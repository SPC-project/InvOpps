function rk4(y, x, dx, f) {
    var k1 = dx * f(x,y),
        k2 = dx * f(x + dx / 2.0,   +y + k1 / 2.0),
        k3 = dx * f(x + dx / 2.0,   +y + k2 / 2.0),
        k4 = dx * f(x + dx,         +y + k3);

      
 
    return y + (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0;
}
 

x = parseInt(document.getElementById("x").value);
sampleEveryN = parseInt(document.getElementById("sampleEveryN").value);
y = parseInt(document.getElementById("y").value);
step = parseFloat(document.getElementById("step").value);
//maxSteps = parseInt(document.getElementById("maxSteps").value);
//steps = parseFloat(document.getElementById("steps").value);
//f = document.getElementById("inputR").value;
 
var 
    steps = 0,
    maxSteps = 11;
// f = "with (Math) {" + f + "}";
 while (steps < maxSteps) {
    if (steps%sampleEveryN === 0) {
        console.log( y );
         document.getElementById("elemR").innerHTML +=  " X( " +x.toPrecision(2)+ ") :\t\t y  \t\t" + y.toPrecision(5) + "\n<br>" ;
     
    }
    
    y = rk4(y, x, step, f);
 
    // using integer math for the step addition
    // to prevent floating point errors as 0.2 + 0.1 != 0.3
    x = ((x * 10) + (step * 10)) / 10;
    steps += 1;
   
}

function f(x, y) {
    func = document.getElementById("inputR").value;
   // document.getElementById("elemR").innerHTML = eval(func);


    return  eval(func);
}




function clrR() {
    document.getElementById('elemR').innerHTML = '';
}



