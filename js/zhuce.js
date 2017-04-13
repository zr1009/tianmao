window.onload=function(){
	document.documentElement.style.fontSize=innerWidth/16+"px";
	onresize=function(){
		document.documentElement.style.fontSize=innerWidth/16+"px";
	}
	//验证
	$(function(){
		var phone=/^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;//手机验证
		var user_phone,pass_word;
		$("#phone").blur(function(){
			if($(this).val().match(phone)){
				user_phone=true;
				$(this).next().html('');
			}else{
				$(this).next().html('*请输正确格式');
			}
		})
		var psd=/^[a-zA-Z]\w{5,17}$/;//密码验证
		$("#psd").blur(function(){
			if($(this).val().match(psd)){
				pass_word=true;
				$(this).next().html('');
			}else{
				$(this).next().html('*请输正确格式');
			}
		})
	});
	
	$('#login').click(function(){
		$.ajax({
			type:"post",
			url:"http://192.168.1.100/supermarket/data/register.php",
			async:true,
			data:{'user_phone':$('#phone').val(),'user_pass_word':$('#psd').val()},
			dataType:'jsonp',
			jsonp:'callback',
			jsonpCallback:'success_JsonpCallback',
			success:function(data){
//				debugger;//断点
				if(data.msg=='success'){
//					alert('注册成功！')
					sessionStorage.phone=$('#phone').val(),
                    sessionStorage.psd=$('#psd').val(),						  
					window.location.href='register.html'
				}else{
//					alert('注册失败！')
//					alert(data.reason)
				}
			},
			error:function(){							
			}	
		});
	})	
	
};



