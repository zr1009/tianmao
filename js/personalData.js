window.onload=function(){
	document.documentElement.style.fontSize=innerWidth/16+"px";
	// html font-size=50px;
	onresize=function(){
		document.documentElement.style.fontSize=innerWidth/16+"px";
    }
	
	var sex=document.getElementById("sex")
	var box=document.getElementById("box")
	var oDiv=document.getElementById("div")
	var nan=document.getElementById("nan")
	var nv=document.getElementById("nv")
	var oxb=document.getElementById("xb")
	sex.addEventListener('click',function(){
		box.style.display='block';
		oDiv.style.display='block';
		nan.addEventListener('click',function(){
			box.style.display='none';
			oDiv.style.display='none';
			//oxb.innerHTML=this.innerHTML;
		},false)
		nv.addEventListener('click',function(){
			box.style.display='none';
			oDiv.style.display='none';
			//oxb.innerHTML=this.innerHTML;
		},false)
		box.addEventListener('click',function(){
			box.style.display='none';
			oDiv.style.display='none';
		},false)
	},false)
		
		
	nc.innerHTML=localStorage.user_name;
	
	$('#nan').click(function() {
		var  user_sex_nan = $('#nan').html()
		$.ajax({
			type: "post",
			url: "http://192.168.1.100/supermarket/data/user_update_sex.php",
			async: true,
			data: {
				'user_sex': user_sex_nan,
				'user_phone': localStorage.user_phone
			},
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'success_JsonpCallback',
			success: function(data) {
//				debugger;
				localStorage.user_sex= user_sex_nan;
				xb.innerHTML=user_sex_nan
	
			},
			error: function() {}
		});
	})
	
	$('#nv').click(function() {
		var user_sex_nv = $('#nv').html()
		$.ajax({
			type: "post",
			url: "http://192.168.1.100/supermarket/data/user_update_sex.php",
			async: true,
			data: {
				'user_sex': user_sex_nv,
				'user_phone': localStorage.user_phone
			},
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'success_JsonpCallback',
			success: function(data) {
//				debugger;
//				if(data.msg == 'success') {
					localStorage.user_sex= user_sex_nv;
					xb.innerHTML=user_sex_nv
//				}
	
			},
			error: function() {}
		});
	}   )

}
