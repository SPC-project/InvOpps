var Arr= new Array();
        var i=0;
  		var textarea1 = document.getElementsByName('arr')[0];
  		var textarea2 = document.getElementsByName('ars')[0];

  		var Number=document.getElementById("TN");
  		textarea1.value="";
  		textarea2.value='';


   Number.onkeyup = function(e)
    {    	e = e || event;
        if(e.keyCode===13)
        {
        	add_new_number();
        }
        return false;
    }

    Number.onkeydown = function(e)
    {
    	e = e || event;
    	if(e.keyCode==69)
    	return false;
    }

     	function add_new_number()
     	{
			Arr[i]=parseFloat(Number.value);
			Number.value="";
            textarea1.value+=Arr[i]+ ";";
		    i++;
		}

		function showarray()
		{
			var j;
            textarea1.value="";
			for(j=0;j<i;j++)
			{
				if(Arr[j]=='') Arr[j]=0;
				textarea1.value+=Arr[j]+ ";";
		    }
		}

var Arr2=new Array();

		function buble()
		{
                for(var x=0;x<i;x++)
                {                	Arr2[x]=Arr[x];                }

            for(var k=0;k<i;k++)
            {
            var Arr_min=Arr2[k];
            	for(var l=0;l<i;l++)
            	{
            		if(Arr2[l]>Arr_min)
            		{            			var tmp=Arr2[k];
            			Arr_min=Arr2[l];
            			Arr2[k]=Arr_min;
            			Arr2[l]=tmp;
            		}
            	}
            }

		}



		function showsortarray()
		{
			var j;
            textarea2.value="";
			for(j=0;j<i;j++)
			{
				textarea2.value+=Arr2[j]+ ";";
		    }
		}