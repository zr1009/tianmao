window.onload=function(){		//1rem = 40px
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 320 * 20 + 'px';
		window.onresize = function() {
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 320 * 20 + 'px';
	};
	//搜索栏样式
	var oDiv = document.getElementById('div1');
	var topy = oDiv.offsetTop;
	var oSh=document.getElementById("sh")
	window.onscroll = function(){
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		if(topy>= scrollTop){
			oDiv.style.background='transparent';
			oDiv.children[1].style.color='#fff'
			oDiv.children[2].style.background='#fff';
			oDiv.children[3].style.color='#fff'
			oSh.style.color='#666'
		}else{		
			oDiv.style.background='#fff'
			oDiv.children[1].style.color='#666'
			oDiv.children[2].style.background='#ccc';
			oDiv.children[3].style.color='#666'
			oSh.style.color='black'
		} 
		
	};

	//搜索栏跳转
	ipta.onclick = function(){
		window.location.href = 'sousuo.html'
	}
	

	

	$(function(){		
		var aUl=document.getElementById("ulslide")
		var m,divLeft,aldX,mewX,ms,af,naxLength			
		aUl.addEventListener('touchstart',function (e){aUl
				aUl.style.transition = '0s';
				m = e.touches[0].clientX - this.offsetLeft;
				divLeft = aUl.offsetLeft;
				mewX = e.touches[0].clientX;
			});
			aUl.addEventListener('touchmove',function (e){
			
				aldX = e.touches[0].clientX;
				aUl.style.left = e.touches[0].clientX - m + 'px';
				ms = e.touches[0].clientX;
			});
			
			aUl.addEventListener('touchend',function (e){
				var naxLength = innerWidth - aUl.offsetWidth 
				//var ulLength = nav.offsetWidth;
				af = aldX-mewX;
				aUl.style.transition='1s';
				aUl.style.left = aUl.offsetLeft + af + 'px';
				if(aUl.offsetLeft + af >0){
					af =0
					aUl.style.left = 0
				}
				if( aUl.offsetLeft + af<naxLength){
					aUl.style.left = naxLength+'px'
				}
			});
		
		
		var start=0;
		var classify='jingxuan';
		
		var abox=document.getElementById("abox")
		var arr=[ 'jingxuan','lingshi','meirong','jiaqing', 'liangyou','jiushui','shengxian','muying','jiayong'];				
		var aUl=document.getElementById("ulslide")
		var jz=document.getElementById("jz")
		var aLi=aUl.children
		ajax(start,classify)
		abox.style.minHeight = '12rem'
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i
			aLi[i].onclick=function(){
				for(var j=0;j<aLi.length;j++){
					aLi[j].className='';
				}
				abox.innerHTML='';
				this.className='slidered';
				classify = arr[this.index]
				ajax(start,classify)
			}
		}	
		
		
		function ajax(start,classify){
			$.ajax({
				type: "post",
				url: "http://192.168.1.100/supermarket/data/get_commodity.php",
				async: true,
				data:{
					'start':start,
					'classify':classify
					},
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: "success_jsonpCallback",
				success:function(data) {
//					debugger
					if (data&&data.length>0) {
						for(var i=0;i<data.length;i++){
							var odiv=document.createElement('div');
							odiv.className="recoBox";
							odiv.innerHTML='<a href="detail.html?id='+data[i].id+'"><img src="http://192.168.1.100/supermarket/img/'+data[i].img+'" /></a><p style="height:1.6rem;">'+data[i].name+'</p><p>'+data[i].count+'人已购买</p><p>￥'+data[i].price+'</p><a id="'+data[i].id+'" class="gwc"><img src="img/img/gwc.png"/></a>'
							abox.appendChild(odiv);
						}
						
					}
					if(data&&data.length==4){
						$('#jz').html('加载更多商品')
					}else{
						$('#jz').html('没有更多商品了')
					}
					
				},
				error: function(d) {}
			
			})
		}
		$('#jz').click(function(){
			start+=4;
			ajax(start,classify)
			start=0;
		})
		
		
	})
	
	//购物车
	$("#abox").delegate(".gwc","click",function(){
//		var id=$(this).attr('id')
//		console.log(this.id)
		$.ajax({
			type: "post",
			url: "http://192.168.1.100/supermarket/data/my_commodity_car.php",
			async: true,
			data: {'user_phone': localStorage.user_phone,'commodity_id':this.id,'count': 1},
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: "success_jsonpCallback",
			success: function(data) {
//				debugger;
				window.location.href = 'myCar.html';
			},
			error: function(d) {}
		});	
	})
}
