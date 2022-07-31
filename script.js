	// Wait for window load
	$(window).load(function() {
		// Animate loader off screen
		$(".se-pre-con").fadeOut("slow");
  
	});
  
  $(document).ready(function()
  {
    $("back").click(function()
    {
      $("#rpmControl").fadeOut("slow");
    });
  });

var user_count = 1;
var flag = 0;
var user_name="notadmin";
function ModeChange() 
 {
  var checkBox = document.getElementById("checkRadio");
  if (checkBox.checked == false){
    document.getElementById('container').style.backgroundImage = 'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgb(255, 255, 255))' ;
    document.getElementById('headingTmfs').style.color = '#f23a24';
    // document.body.style.backgroundColor='white';

  } else {
    document.getElementById('container').style.backgroundImage = 'linear-gradient(rgb(13, 18, 36), rgb(47, 47, 56), rgb(21, 18, 24))' ;
    document.getElementById('headingTmfs').style.color = 'rgba(241, 241, 238, 0.904)';
    // document.body.style.backgroundColor='grey';
  }
}
function selectRpm()
{
    
    document.getElementById('calib').style.display='none';
    document.getElementById('controlRamp').style.display='none';
    document.getElementById('controlSpeed').style.display='none';
    document.getElementById('back').style.display='block';

    
    $("#rpmControl").fadeIn("slow");
    document.getElementById('rpmControl').style.display='flex';
    
    
}
function selectRamp()
{
    document.getElementById('calib').style.display='none';
    document.getElementById('controlRamp').style.display='none';
    document.getElementById('controlSpeed').style.display='none';
    document.getElementById('back').style.display='block';

    
    $("#rampControl").fadeIn("slow");
    document.getElementById('rampControl').style.display='flex';
    
}
function selectCalib()
{
    document.getElementById('calib').style.display='none';
    document.getElementById('controlRamp').style.display='none';
    document.getElementById('controlSpeed').style.display='none';
    document.getElementById('rampControl').style.display='none';
    document.getElementById('back').style.display='block';
    
    $("#calibControl").fadeIn("slow");
    
}
function homePage()
{
   document.getElementById('back').style.display='none';
   document.getElementById('rpmControl').style.display='none';
   document.getElementById('rampControl').style.display='none';
   document.getElementById('calibControl').style.display='none';
    $("#controlSpeed").fadeIn(400);
    $("#controlRamp").fadeIn(400);
    $("#calib").fadeIn(400);

}

function rpmChange(value){
    document.getElementById('range').value = value;
    document.getElementById('setBtn').value = value;
    // document.getElementById('setBtn').style.background = "linear-gradient(160deg,#0d1f47,#000000)";
}

function mouseoverSlide(value){
    document.getElementById('rangeValue').value = value;
    document.getElementById('setBtn').value = value;
    // document.getElementById('setBtn').style.background = "linear-gradient(160deg,#0d1f47,#000000)";
}
function RPMtimeOut()
{
  setInterval(function() {
    // Gets ADC value at every one second
    GetRPM();
  },1000);
}


function GetRPM() 
{
  if(user_name=="admin1")
  {
    var xhttp = new XMLHttpRequest();
        var adc=0;
    xhttp.onreadystatechange = function() 
    {
      if (this.readyState == 4 && this.status == 200) 
      {
      adc = Number(this.responseText);
       document.getElementById("rpmMeter").value=adc; 
      }
    };
    xhttp.open("GET", "/getRPM", false);
    xhttp.send();
  }
}


function sendData(pos) {
  if(user_name=="admin1")
  {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };
    xhttp.open("GET", "setPOS?servoPOS="+pos, true);
    xhttp.send();
  }
} 

function getUser()
{
  
  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() 
{
if (this.readyState == 4 && this.status == 200) 
{
user_count = Number(this.responseText);
if(user_count==0)
{
  user_name="admin1";
  document.getElementById("connect").style.backgroundColor='green';
  document.getElementById("connect").innerHTML='Connected';
  document.getElementById("connect").disabled='true';
  document.getElementById("connect").style.color='white';
  document.getElementById("disconnect").style.display='block';
  document.getElementById("disconnect").style.backgroundColor='red';
  document.getElementById("disconnect").style.color='white';
}
else
{
  document.getElementById("connect").style.backgroundColor='red';
  document.getElementById("connect").innerHTML='Access denied : Disconnect current user';
  document.getElementById("connect").style.color='white';
}
//  document.getElementById("rpmMeter").value=adc; 
}
};
xhttp.open("GET","/getUSER", false);
xhttp.send();
}

function disconnect_user(pos) {
  if(user_name=="admin1")
  {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };
    xhttp.open("GET", "disconnect?disconnect_user="+0, true);
    xhttp.send();
    user_name="notAdmin";
    document.getElementById("disconnect").style.display='none';
    document.getElementById("connect").disabled=false;
    document.getElementById("connect").innerHTML='connect';
    document.getElementById("connect").style.backgroundColor='white';
    document.getElementById("connect").style.color='black';
  }
} 

function SetRPM(output,event) 
{
  if(output==undefined)
  {
    output = 1500;
  }

    if(event.ctrlKey)
    {

      document.getElementById('note').style.display='none';
    if(flag==0 && output>0)
    {
      alert("Make sure the system is secure before running it, and keep objects away from the machine's moving parts. Select OK to continue.");
      flag=1;
    }
    
    if(output=="0")
    {
      document.getElementById('motorStatus').innerHTML = 'OFF';
      document.getElementById('motorStatus').style.color = 'green';
      document.getElementById('stopBtn').style.display='none';
    }
    // else if(output==undefined)
    // {
    //   alert("Note : The system does not accept the default RPM as a reference.Enter a reference RPM to proceed.");
    // }
    else{
      document.getElementById('motorStatus').innerHTML = 'ON';
      document.getElementById('motorStatus').style.color = 'red';
      document.getElementById('stopBtn').style.display='block';
    }
    sendData(output);
    document.getElementById("rpmRef").innerHTML=output; 
    }
    else
    {
      document.getElementById('note').style.display='block';
    }
  
  if(output=="0")
  {
    document.getElementById('motorStatus').innerHTML = 'OFF';
    document.getElementById('motorStatus').style.color = 'green';
    document.getElementById('stopBtn').style.display='none';
    sendData(output);
    document.getElementById("rpmRef").innerHTML=output; 
    document.getElementById('note').style.display='none';
  }
}




