$(document).ready(function(){
	var $card=$('.card');
	var token = localStorage.getItem("token");
	var template="";
	var dep=localStorage.getItem('dep');
	var pageinfo1='';
	var pageinfo2='';
	var urlfinal="http://grievanceapi.herokuapp.com/api/complaint/?format=json";
	filter(urlfinal);
	$( "#panelcon" ).delegate( ".card", "click", function() {
  		var u=$(this).attr("id");

  		$.ajax({
							
							type: "GET",
							dataType: "json",
							url: u,
							beforeSend: function (xhr) {
			                    //alert(token);
			                    xhr.setRequestHeader('Authorization', "token" + " " + token);
			                },
							success: function(resp){
								console.log(resp);
							},
							error: function(xhr){
								alert("error");
								//alert(xhr.status);
								//alert(xhr.statusText);
								//alert(xhr.responseText);
							},
								
					});	



});
	// $('#panelcon div[class="card"]').click(function(){
	// 		// $(this).attr("href")
	// 		alert("clicked");
	// 	});	
	$('#all').click(function(e){
		$('#panelcon').show();
		$('#result').hide();
		filter(urlfinal);
		pageinfo1 = "page1";
		pageinfo2 = '';
		template='';
		e.preventDefault();
	});
	$('#dep').click(function(e){
		$('#panelcon').show();
		$('#result').hide();
		pageinfo1 = '';
		pageinfo2 = "page2";
		filter(urlfinal+"&search="+dep);
		template='';
		e.preventDefault();
	
	});
	//alert(template);
	function filter(urlfinal){
			$.ajax({
							
							type: "GET",
							dataType: "json",
							url: urlfinal,
							beforeSend: function (xhr) {
			                    //alert(token);
			                    xhr.setRequestHeader('Authorization', "token" + " " + token);
			                },
							success: function(data){
								//alert("done");
								// var comp_status;
								// if (value.status==true){
								// 	comp_status='seen';
								// }
								// else{
								// 	comp_status='seen';
								// }

								$.each(data,function(index,value){
									var comp='';
									if (value.status==true){
									comp+='<div><i class="material-icons text-green" data-toggle="tooltip" data-placement="bottom" title="notifications">done</i></div>';
								}
								else{
									comp='';
								}
									if (data.length){
										template+='<div class="card" id="'+value.url+'">'+
														'<div class="card-header text-center">'+value.subject+'</div>'+
															'<div class="card-body">'+comp+
														    	'<p id="category">'+'Category: '+value.category+'</p>'+
														    	'<p id="sub_category">'+'Sub-Category: '+value.sub_category+'</p>'+
														    	'<p id="desc">'+'Description: '+value.complaint_text+'</p>'+
															'</div>'+
													'</div>';
										
									}
									
								});
								if (template===''){
									template+='<div class="card"><div class="card-header text-center">Oops!</div>';
							template+='<div class="card-body"><p id="category">Data is not available !</p></div></div>';
								}
								
									$('#panelcon').html(template);

								
								
							},
							error: function(xhr){
								alert("error");
								//alert(xhr.status);
								//alert(xhr.statusText);
								//alert(xhr.responseText);
							},
								
					});	
	}



	$('#search').keyup(function(e){
			e.preventDefault();
			$('#result').show();
			$('#panelcon').hide();
			var urlinfo = '';
			if(pageinfo1==="page1" && pageinfo2===""){
				urlinfo = urlfinal;
			}
			if(pageinfo1==="" && pageinfo2=="page2"){
				urlinfo = urlfinal+"&search="+dep;
			}

			if(searchField === ''){
				$('#result').html('');
				return;
			}
	
		
			var searchField = $('#search').val();
			var regex = new RegExp(searchField, "i");


			$.ajax({
							
				type: "GET",
				dataType: "json",
				url: urlinfo,
				beforeSend: function (xhr) {
					//alert(token);
					xhr.setRequestHeader('Authorization', "token" + " " + token);
				},
				success: function(data){
					var temp='';

					$.each(data, function(key, val){
						var comp='';
									if (val.status==true){
									comp+='<div><i class="material-icons text-green" data-toggle="tooltip" data-placement="bottom" title="notifications">done</i></div>';
								}
								else{
									comp='';
								}
						//alert(val.complaint_text);
						//alert(val.complaint_text.search(regex));
						//alert(val.complaint_text);
						if (val.complaint_text.search(regex) != -1){
							//alert("found");
							temp+='<div class="card"><div class="card-header text-center">'+val.subject+'</div>';
							temp+='<div class="card-body">'+comp+'<p id="category">Category: '+val.category+'</p>';
							temp+='<p id="sub_category">Sub-Category: '+val.sub_category+'</p>';
							temp+='<p id="desc">Description: '+val.complaint_text+'</p></div></div>';
						}
						
						
					});
					if (temp===''){
						temp+='<div class="card"><div class="card-header text-center">Oops!</div>';
							temp+='<div class="card-body"><p id="category">Data is not available !</p></div></div>';
					}
					$('#result').html(temp);

				},
				error: function(xhr){
					//alert("error");
				},

					});






				});

	
});