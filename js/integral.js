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
f = "with (Math) {" + f + "}";
	for(i = 0; i < n; i++){
		xe = xb + d;
		x = (xb + xe)/2;
		s = s + d*eval(f);
		xb = xe;

	}
	document.getElementById("output1").value = s.toFixed(6);
};
function integral_Simpson() {
var a_s, b_s, n_s, f_s;
a_s = parseInt(document.getElementById("inputa_sim").value);//Schiti a
b_s = parseInt(document.getElementById("inputb_sim").value);//Schitali b
n_s = parseInt(document.getElementById("inputn_sim").value);//Schitali n
f_s = document.getElementById("inputf_sim").value;//Schitali n
var s_s, i_s, x0_s, x1_s, x, h_s;
var tmp1, tmp2, tmp3, tmp4, tmp5, k;
h_s = (b_s - a_s)/n_s;
f_s = "with (Math) {" + f_s + "}";
x = a_s;
tmp1 = eval(f_s);
x = b_s;
tmp2 = eval(f_s);
x = (a_s + h_s / 2);
tmp3 = eval(f_s);
s_s = ((tmp1 + tmp2)/2) + 2 * tmp3;
x = a_s;
	for(i_s = 0; i_s < n_s - 1; i_s++)
	{
		x = x + h_s;
		x1_s = x;
		tmp4 = eval(f_s);
		x = x + h_s / 2;
		tmp5 = eval(f_s);
		x = x1_s;
		s_s = s_s + (2 * tmp5 + tmp4);
		
	}
	var result = s_s * (h_s / 3);
	document.getElementById("output1_sim").value = result.toFixed(6);
};
function trap() {
var at, bt, nt, ft;
at = parseInt(document.getElementById("inputa_trap").value);//Schitali a
bt = parseInt(document.getElementById("inputb_trap").value);//Schitali b
nt = parseInt(document.getElementById("inputn_trap").value);//Schitali n
ft = document.getElementById("inputf_trap").value;//Schitali n
var st, ht, x;
var tmp1t, tmp2t;

ht = (bt - at)/nt;
ft = "with (Math) {" + ft + "}";
x = at;
tmp1t = eval(ft);
x = bt;
tmp2t = eval(ft);
st = (tmp1t + tmp2t)/2;
for(x = at + ht; x < bt; x = x + ht)
{
	st = st + eval(ft);
}
var result_trap = st * ht;
document.getElementById("output1_trap").value = result_trap.toFixed(6);
};

