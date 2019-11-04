$('#index_menu li').click(function(){
    var index = $(this).index();//当前我点击那个元素的索引
    if(index==1){
        $('#index_con').load('./src/sj.html');
    }
});