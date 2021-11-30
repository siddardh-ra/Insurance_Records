
var res,render_card;

function initResp(e){
    $.ajax({
            type: "GET",
            url : "https://insurance-record-backend.herokuapp.com/project/get_all_data/",
            dataType: 'json',
            success: function (response){
            res = response;
            console.log(res)
            if(res != "")
            {
                document.getElementById("empty_layer").style.display="none"
            }
            if(e == "dash"){
                init();
            }
            }
            });
}


function init(){
$("#append_here").empty();
			for(var key in res) {
				render_card = '';
				render_card+='<article class="download-card"><div class="card card__media--view"><div class="card__media__body">';
				render_card+='<div class="card__primary__title"><h3 class="card__primary__title__text">Policy ID : '+res[key]["Policy_id"]+'</h3>';
				render_card+='<small class="card__primary__title__subtext mt-2">Customer ID : '+res[key]["Customer_id"]+'</small>';
				render_card+='<small class="card__primary__title__subtext mt-2">Premium : '+res[key]["Premium"]+'</small>';
				render_card+='<small class="card__primary__title__subtext mt-2">Date of Purchase : '+res[key]["Date_of_Purchase"]+'</small></div>';
				render_card+='<div class="viewsss_map" >';
                render_card+=' <button class="btn btn-primary" style="color: #fff;" onclick="pass_data(this)" key="'+key+'" policy_id="'+res[key]["Policy_id"]+'"data-toggle="modal" data-target="#myModal">Edit Record</button>';
                render_card+='</div></div>'
				render_card+='<figure class="card__media"><img src="assets/images/images.png" alt="pro-img"></figure>';
				render_card+='<div class="card__actions" id="c1">';
				render_card+='<button type="button" class="btn">More Details</button></div>';
				render_card+=	'<div class="show_1" id="show1_'+key+'">';
                render_card+='<div class="card__primary__title" style="padding-top: 0px;">';
				render_card+='<small class="card__primary__title__subtext mt-2">Fuel : '+res[key]["Fuel"]+'</small>';
				render_card+='<small class="card__primary__title__subtext mt-2">Vehicle Segment : '+res[key]["VEHICLE_SEGMENT"]+'</small>';
				render_card+='<small class="card__primary__title__subtext mt-2">Region : '+res[key]["Customer_Region"]+'</small></div>';
				render_card+=		'<ul class="list list__threeline">';
				render_card+=		'<li class="list__item">';
				render_card+=			'<i class="material-icons mi list__item__icon">chat_bubble</i>';
				render_card+=		'<span class="list__item__text"><h5>Gender</h5>';
				render_card+=		'<small class="list__item__subtext">'+res[key]["Customer_Gender"]+'</small>';
				render_card+=	'</span>';
				render_card+=	'</li>';
				render_card+=		'<li class="list__item">';
				render_card+=		'<i class="material-icons mi list__item__icon">chat_bubble</i>';
				render_card+=		'<span class="list__item__text"><h5>Income Group</h5>';
				render_card+=	'<small class="list__item__subtext">'+res[key]["Customer_Income_Group"]+'</small>';
				render_card+=	'</span>';
				render_card+=	'</li></ul>';

				render_card+='</div>';
				render_card+=	'<div class="status_hide" id="show2_'+key+'">';
				render_card+='<div class="history-tl-container">';
				render_card+=	 '<ol class="timeline" id="'+res[key]["site_name"]+'"></ol></div></div></div></article>';

				$("#append_here").append(render_card);
                if(localStorage.getItem("user_sector") == "farm analytics"){
				document.getElementById("checkst").style.display = "none";
				}
            }
}



$(document).ready(function(){
$("#searchProject").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("article ").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});


var data = {};
          function send_form_data(){
                  data["Fuel"]=$("#Fuel").val();
                  data["Premium"]=$("#preminum").val();
                  data["Bodily_injury_liability"]=document.getElementById("Bodily_injury_liability").checked
                  data["Personal_injury_protection"]=document.getElementById("Personal_injury_protection").checked
                  data["Property_damage_liability"]=document.getElementById("Property_damage_liability").checked
                  data["Collision"]=document.getElementById("Collision").checked
                  data["Comprehensive"]=document.getElementById("Comprehensive").checked
                  data["Customer_Marital_status"]=document.getElementById("Customer_Marital_status").checked
                  data["Customer_Income_Group"]=$("#Customer_Income_Group").val();
                  data["Customer_Region"]=$("#Customer_Region").val();
                  data["Customer_Gender"]=$("#Customer_Gender").val();
                  data["VEHICLE_SEGMENT"] = $("#vehicle_segment").val();
                  console.log(data, "http://127.0.0.1:8000/project/update_record/"+document.getElementById("p_id").innerHTML)
                  toastr.info("Saving Record");
                    $.ajax({
                          type: "PUT",
                          url: "https://insurance-record-backend.herokuapp.com/project/update_record/"+document.getElementById("p_id").innerHTML,
                          dataType: 'json',
                          data: data,
                          success: function (res){
                            console.log("success");
                            initResp("dash");
                            toastr.success("Updated Successfully");
                          },
                          });
          }

function blockSpecialChar(e){
        var k;
        document.all ? k = e.keyCode : k = e.which;
        return (k > 47 && k < 58)
        }

function pass_data(e){
        t_key= e.getAttribute("key")
        document.getElementById("p_id").innerHTML=res[t_key]["Policy_id"]
        document.getElementById("dop").innerHTML=res[t_key]["Date_of_Purchase"]
        document.getElementById("c_id").innerHTML=res[t_key]["Customer_id"]
        document.getElementById("preminum").value=res[t_key]["Premium"]
        document.getElementById("vehicle_segment").value=res[t_key]["VEHICLE_SEGMENT"]
        document.getElementById("Customer_Gender").value=res[t_key]["Customer_Gender"]
        document.getElementById("Customer_Income_Group").value=res[t_key]["Customer_Income_Group"]
        document.getElementById("Customer_Region").value=res[t_key]["Customer_Region"]
        document.getElementById("Fuel").value=res[t_key]["Fuel"]
        document.getElementById("Bodily_injury_liability").checked = res[t_key]["Bodily_injury_liability"];
        document.getElementById("Personal_injury_protection").checked = res[t_key]["Personal_injury_protection"];
        document.getElementById("Property_damage_liability").checked = res[t_key]["Property_damage_liability"];
        document.getElementById("Collision").checked = res[t_key]["Collision"];
        document.getElementById("Comprehensive").checked = res[t_key]["Comprehensive"];
        document.getElementById("Customer_Marital_status").checked = res[t_key]["Customer_Marital_status"];
        }

 window.onload = initResp("dash");
