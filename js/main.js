window.onload=function(){
			document.documentElement.style.fontSize=innerWidth/16+"px";
		onresize = function(){
			document.documentElement.style.fontSize = innerWidth/16 +"px";
		}
		
		var main=document.getElementById("main")
		var url = window.location.href
		var id=url.split('=')[1]
		var pj=document.getElementById("pj")
	
		$.ajax({
			type: "post",
			url:  "http://192.168.1.100/supermarket/data/get_commodity_info.php",
			async: true,
			data:{'id':id},
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: "success_jsonpCallback",
			success: function(data) {
//				debugger;
//				console.log(data);
				pj.innerHTML=data.evaluate;	
				main.innerHTML='<img src="http://192.168.1.100/supermarket/img/'+data.img+'" /><p>'+data.name+'</p><p><span>￥</span><span>'+data.price+'</span></p><p>'+data.count+'人已购买</p><p>重量'+data.weight+'</p>';				
			},
			error: function(d) {}
		});
		
		//购物车
		$('.right').click(function(){
			$.ajax({
				type: "post",
				url: "http://192.168.1.100/supermarket/data/my_commodity_car.php",
				async: true,
				data: {'user_phone': localStorage.user_phone,'commodity_id':id,'count': 1},
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: "success_jsonpCallback",
				success: function(data) {
					if(data!=null){
						window.location.href = 'myCar.html';
                    }
				},
				error: function(d) {}
			});	
		})

}		