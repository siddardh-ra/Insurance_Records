function switch_div1(show) {
 console.log(show);  
  document.getElementById("show1_"+show).style.display = "block";
  document.getElementById("show2_"+show).style.display = "none";
}
function switch_div2(show) {  
  document.getElementById("show1_"+show).style.display = "none";
  document.getElementById("show2_"+show).style.display = "block";
}


function view(show) {
  document.getElementById("show"+show).style.display = "block";
  document.getElementById("show"+((show==1)?2:1)).style.display = "none";
}

function v_v(e){
document.getElementById("append_here").setAttribute("data-view",e)
var gd = document.getElementsByClassName("card__actions");
var ld = document.getElementsByClassName("show_1");
var sd = document.getElementsByClassName("status_hide");
    if(e == "list-view")
    {
     for(var i=0; i< gd.length;i++){
         gd[i].style.display = "none";
         ld[i].style.display = "none";
         sd[i].style.display = "none";
        }
    }
    else{
        for(var i=0; i< gd.length;i++){
         gd[i].style.display = "block";
         ld[i].style.display = "block";
         sd[i].style.display = "none";

        }
    }
}
































