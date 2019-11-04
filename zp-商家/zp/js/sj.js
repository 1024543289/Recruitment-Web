//获取分页列表函数
function getPage(cpage,sum_page){
            var list='';//数字列表
		 	var num=4;//列表前后有几个数字
		 	var num_page=cpage;//当前页码
            var new_num;//动态页面
		 	
        //当前数字之前
		 for(i=num;i>=1;i--){
		 		new_num=num_page-i;
		 		if(new_num>=1){
		 		list+="<li class='btn-group'><a href='#' onclick='getData("+new_num+")'>"+ new_num +"</a></li>";
		 	    }
		 }
		 	//当前数字
		 	list+="<li class='btn-group'>"+cpage+"</li>";
		 	//当前数字之后
		 	for(i=1;i<=num;i++){
		 		new_num=num_page+i;
		 		if(new_num<=sum_page){
		 		list+="<li class='btn-group'><a href='#' onclick='getData("+new_num+")'>"+new_num +"</a></li>";
		 		}else{
		 			break;
		 		}
		 	}
            $('.menu').empty();
            $('.menu').append(list);
        }
        

//封装获取数据方法（包含分页）
function getData(page,sf=''){
if(!sf)//如果省份没传，正常全部查找
var url='http://203.195.246.58:7777/Business/findAll';
else{//如果省份传值，则根据传值的省份查找
var url='http://203.195.246.58:7777/Business/findByProvince?province='+sf
}
$.get(url,function(result){
    var data = result.data;
    var total = data.length;//总个数
    var nums=10;//一页显示多少条记录
    var sum_page;//总页数
    var cpage=1;//当前在多少页
    
    //计算总页码
    if (total%nums==0){
		sum_page=parseInt(total/nums);
	}else {
		sum_page=parseInt(total/nums+1);
    }
    
    var newdata=[];//新数据
    cpage=page;//改变当前页面
    var i;//当前数据索引
    if(cpage==1)
        i=0;
    else
        i=(cpage-1)*nums;//公式：计算当前的索引
    for(j=0;j<=9;j++){//循环10次调取数据
        if(data[i+j]==undefined)
        break;
        newdata[j] = data[i+j];
    }
    //展示数据
    var t_data;
    newdata.forEach(function(item){
        t_data += '<tr>';
        t_data += '<td><input type="checkbox" id='+item.id+' /></td>';
        t_data += '<td>'+item.name+'</td>';
        t_data += '<td>'+item.contactName+'</td>';
        t_data += '<td>'+item.contactPhone+'</td>';
        t_data += '<td>'+item.industry+'</td>';
        t_data += '<td>'+item.province+'-'+item.city+'</td>';    
        t_data += '<td>'+item.scale+'</td>';
        t_data += '<td><input type="button" value="查看" data-toggle="modal" data-target="#myModal" class="show" id='+item.id+' /></td>';
        t_data += '<td><a href="javascript:void(0)" data-toggle="modal" data-target="#sj_add" class="update" id='+item.id+' >修改</a> <a href="javascript:void(0)" class="del" id='+item.id+' >删除</a></td>';
        t_data += '</tr>';
    });
    $('#sj_table_body').empty();
    $('#sj_table_body').append(t_data);
    getPage(cpage,sum_page);    
})
}
getData(1);//初始化数据
//查看商家信息的模态框
$('#sj_table_body').on('click','.show',function(){   
    var id = $(this).attr('id');
    var url = 'http://203.195.246.58:7777/Business/findById?id='+id;
    $.get(url,function(result){
        $('#sj_title').text(result.data.name);
    });    
})
//删除商家信息（有发布招聘的商家不能直接删除,需要先删除对应招聘）
$('#sj_table_body').on('click','.del',function(){   
    var id = $(this).attr('id');
    var data = {id:id} 
    var datastr = Qs.stringify(data, { arrayFormat: 'repeat' });
    var url = 'http://203.195.246.58:7777/Business/deleteById';
    console.log(datastr);
    $.post(url,datastr,function(result){
        getData(1);
    });    
})

//点击修改按钮(调用的仍是添加模态，在模态中展示数据)
$('#sj_table_body').on('click','.update',function(){   
    var id = $(this).attr('id');
    var url = 'http://203.195.246.58:7777/Business/findById?id='+id;
    $.get(url,function(result){
        $('#name').val(result.data.name)
        $('#scale').val(result.data.scale)
        $('#establishedTime').val(result.data.establishedTime)
        $('#registeredCapital').val(result.data.registeredCapital)
        $('#description').val(result.data.description)
        $('#businessLicense').val(result.data.businessLicense)
        $('#status').val(result.data.status)
        $('#contactName').val(result.data.contactName)
        $('#contactPhone').val(result.data.contactPhone)
        $('#location').val(result.data.location)
        $('#province').val(result.data.province)
        $('#city').val(result.data.city)
        $('#industry').val(result.data.industry)
    });
    //将ID传递给隐藏控件hidden ->sj_id，该控件在模态框中
    $("#sj_id").val(id);   
})
//添加或修改商家信息的方法（判断表单中是否有ID）
function sj_save(){  
    var data;//要发送的对象
    data = {
        name:$('#name').val(),
        scale:$('#scale').val(),
        establishedTime:$('#establishedTime').val(),
        registeredCapital:$('#registeredCapital').val(),
        description:$('#description').val(),
        businessLicense:$('#businessLicense').val(),
        status:$('#status').val(),
        contactName:$('#contactName').val(),
        contactPhone:$('#contactPhone').val(),
        location:$('#location').val(),
        province:$('#province').val(),
        city:$('#city').val(),
        industry:$('#industry').val()
    }
//如果商家ID有数据，则带上。
    if($("#sj_id").val()){
        data.id = $("#sj_id").val()
    }else{

    }
    
    //console.log(data);
    //如果后台接口传递参数为json，使用：
    //var datastr = JSON.stringify(data);
    //如果后台接口传递参数为拼接字符串，使用：
    var datastr = Qs.stringify(data, { arrayFormat: 'repeat' });
    var url = 'http://203.195.246.58:7777/Business/saveOrUpdate';
    $.post(url,datastr,function(result){
        $('#sj_add').modal('toggle');
        $("#sj_id").val('')
        getData(1);
    });
}


var url = 'http://203.195.246.58:7777/Province/findAll';
$.get(url,function(result){
    result.data.forEach(function(item){
        var dom = '<li>'+item.name+'</li>'
        $('#sf').append(dom);
    })   
});   
//检索
$('#sf').on('click', 'li', function(){
    $('#dLabel').text($(this).text());
    //点击时传递条件,检索数据
    getData(1,$(this).text());
});
