window.onload=function(){
	//验证
	$(function(){
		var phone=/^((\+)?86|((\+)?86)?)0?1[34578]\d{9}$/;//手机验证
		var user_phone,pass_word;
		$("#phone").blur(function(){
			if($(this).val().match(phone)){
				user_phone=true;
				$(this).next().html('');
			}else{
				$(this).next().html('*请输入正确格式');
			}
		})
		var psd=/^[a-zA-Z]\w{5,17}$/;//密码验证
		$("#psd").blur(function(){
			if($(this).val().match(psd)){
				pass_word=true;
				$(this).next().html('');
			}else{
				$(this).next().html('*请输入正确的格式');
			}
		})
		
		
		$('#phone').val(sessionStorage.phone)
		$('#psd').val(sessionStorage.psd)
		$('#register').click(function() {
			$.ajax({
				type: "post",
				url: "http://192.168.1.100/supermarket/data/login.php",
				async: true,
				data: {
					'user_phone': $('#phone').val(),
					'user_pass_word': $('#psd').val()
				},
				dataType: 'jsonp',
				jsonp: 'callback',
				jsonpCallback: 'success_JsonpCallback',
				success: function(data) {
//						debugger;
					if(data.msg == 'success') {
						//alert('登录成功')
							localStorage.user_phone = data.info.user_phone;
							localStorage.user_psd = data.info.user_psd;
							localStorage.user_name = data.info.user_name;
							localStorage.user_sex = data.info.user_sex;
							localStorage.user_addr = data.info.user_addr;
							localStorage.arr = '';

						window.location.href = 'homepage.html'

					}else{
//						alert('登录失败')
					}
				},
				error: function() {}
			});
		})			
	});				
};