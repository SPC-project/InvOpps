function integral() {
var a, b, n, f;
a = parseInt(document.getElementById("inputa").value);//Schitali a
b = parseInt(document.getElementById("inputb").value);//Schitali b
n = parseInt(document.getElementById("inputn").value);//Schitali n
f = document.getElementById("inputf").value;//Schitali n
var s, d, xb, xe, x, t;
s = 0;
d = (b - a)/n;
xb = a;
t = f;
f= "with (Math) {" + f + "}";
	for(i = 0; i < n; i++){
		xe = xb + d;
		x = (xb + xe)/2;
		s = s + d*eval(f);
		xb = xe;

	}
	document.getElementById("output1").value = s.toFixed(2);
};//function integral
window.onload = function(){
        document.getElementById("calcBtn").onclick = function(){
            integral();
        }
    }

