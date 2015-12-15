var Arr= new Array();
        var i=0;
  		var textarea1 = document.getElementsByName('arr')[0];
  		var textarea2 = document.getElementsByName('ars')[0];

  		var Number=document.getElementById("TN");
  		textarea1.value="";
  		textarea2.value='';


   Number.onkeyup = function(e)
    {
    	e = e || event;
        if(e.keyCode===13)
        {
        	add_new_number();
        }
        return false;
    }

	
		function rfarr()
		{
			i=0;
			
			var Ar=$("#numbs").val();
			var Xar=Ar.split(" ");
			var xi=i;
			for(;xi<Xar.length-1;xi++,i++)
			{
				Arr[xi]=parseFloat(Xar[xi]);
			}
		}
	
     	function add_new_number()
     	{		
			if(Number.value)
			{
			Arr[i]=parseFloat(Number.value);
			Number.value="";
            textarea1.value+=Arr[i]+ " ";
		    i++;
			}
		}

function cta2()
{
	textarea1.value="";
	setTimeout(showarray, 500);
}
		
		function showarray()
		{
			var j;
			for(j=0;j<i;j++)
			{
				textarea1.value += Arr[j] + " ";
			}
			
		}
		


var Arr3=new Array();
var st,et;
		function buble()
		{

st=parseFloat(Date.now());
            for(var k=0;k<i;k++)
            {
            var Arr_min=Arr3[k];
            	for(var l=0;l<i;l++)
            	{
            		if(Arr3[l]>Arr_min)
            		{
            			var tmp=Arr3[k];
            			Arr_min=Arr3[l];
            			Arr3[k]=Arr_min;
            			Arr3[l]=tmp;
            		}
            	}
            }
et=parseFloat(Date.now());
		}

		

	
function shake()
{


st=parseFloat(Date.now());
				var ba=0;
				var ea=Arr3.length-1;
		for (var x=0; x < Arr3.length/2; x++)
		{	
		ba=0;
		ea=Arr3.length-1;
	    do
	    {
			if (Arr3[ba + 1] < Arr3[ba])
			{
				var tmp=Arr3[ba];
				Arr3[ba]=Arr3[ba+1];
				Arr3[ba+1]=tmp;
			}
			ba++;

			if (Arr3[ea-1] >  Arr3[ea])
			{
				var tmp=Arr3[ea];
				Arr3[ea]=Arr3[ea-1];
				Arr3[ea-1]=tmp;
			}
			ea--;
		}while(ba<=ea);
	}		
	et=parseFloat(Date.now());
}

function inps()
{

		
	st=parseFloat(Date.now());
	for(var j = 1; j < Arr3.length; j++)  
    {
		var key = Arr3[j];
		var x = j - 1;
		while(x >= 0 && Arr3[x] > key)
		{
			Arr3[x+1] = Arr3[x];
			x--;
		}

		Arr3[x+1] = key;
	}
	et=parseFloat(Date.now());
}

		
function sel()
{
	
	st=parseFloat(Date.now());
    for (var idx_i = 0; idx_i < Arr3.length-1; idx_i++)
    {
        var min_idx = idx_i;
        for (var idx_j = idx_i + 1; idx_j < Arr.length; idx_j++)
        {
            if (Arr3[idx_j] < Arr3[min_idx])
            {
                min_idx = idx_j;
            }
        }

        if (min_idx != idx_i)
        {
				var tmp=Arr3[idx_i];
				Arr3[idx_i]=Arr3[min_idx];
				Arr3[min_idx]=tmp;
        }
    }
	et=parseFloat(Date.now());
}


function checkInput(ob) {
  var invalidChars = /[^0-9, ,e]/gi
  if(invalidChars.test(ob.value)) {
            ob.value = ob.value.replace(invalidChars,"");
      }
}

function cta()
{
	textarea2.value="";
	setTimeout(showsortarray, 500);
}

		function showsortarray()
		{
			for(var x=0;x<Arr.length;x++)
			{
				Arr3[x]=Arr[x];
			}
			var inp = document.getElementsByName('r');
			if(inp[0].checked || inp[1].checked || inp[2].checked || inp[3].checked)
			{
			textarea2.value="";
			if (inp[0].checked)
			{
				buble();
			}
			if (inp[1].checked)
			{
				inps();
			}
			if (inp[2].checked)
			{
				sel();
			}
			if (inp[3].checked)
			{
				shake();
			}			
			
			var Timer=parseFloat(et-st);
			var j;
			for(j=0;j<i;j++)
			{
				textarea2.value+=Arr3[j]+ " ";
		    }
			document.getElementById('TNNN').value=Timer/100+"sec";
			}
			else
			{
				alert("No one type selected!!! Choose one & try again.");
}
}
