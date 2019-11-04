$(function(){
	//点击左侧导航，子页面跳转
	$("ul#nav").on('click','li',function(){
		var url = $(this).attr("url");
		$(".layui-body").load(url);
	})
})