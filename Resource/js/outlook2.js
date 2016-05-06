$(function(){
	InitLeftMenu();
	tabClose();
	tabCloseEven();
})

var _menus = {"menus":[
	{"menuid":"1","icon":"icon-sys","menuname":"系统管理",
		"menus":[{"menuname":"菜单管理","icon":"icon-nav","url":"http://www.nongfuit.com"},
			{"menuname":"添加用户","icon":"icon-add","url":"demo.html"},
			{"menuname":"用户管理","icon":"icon-users","url":"demo2.html"},
			{"menuname":"角色管理","icon":"icon-role","url":"demo2.html"},
			{"menuname":"权限设置","icon":"icon-set","url":"demo.html"},
			{"menuname":"权限设置","icon":"icon-set","url":"demo.html"},
			{"menuname":"权限设置","icon":"icon-set","url":"demo.html"},
			{"menuname":"权限设置","icon":"icon-set","url":"demo.html"},
			{"menuname":"系统日志","icon":"icon-log","url":"demo.html"}
		]
	},{"menuid":"8","icon":"icon-sys","menuname":"员工管理",
		"menus":[{"menuname":"员工列表","icon":"icon-nav","url":"demo.html"},
			{"menuname":"视频监控","icon":"icon-nav","url":"demo1.html"}
		]
	},{"menuid":"56","icon":"icon-sys","menuname":"部门管理",
		"menus":[{"menuname":"添加部门","icon":"icon-nav","url":"demo1.html"},
			{"menuname":"部门列表","icon":"icon-nav","url":"demo2.html"}
		]
	},{"menuid":"28","icon":"icon-sys","menuname":"财务管理",
		"menus":[{"menuname":"收支分类","icon":"icon-nav","url":"demo.html"},
			{"menuname":"报表统计","icon":"icon-nav","url":"demo1.html"},
			{"menuname":"添加支出","icon":"icon-nav","url":"demo.html"}
		]
	},{"menuid":"39","icon":"icon-sys","menuname":"商城管理",
		"menus":[{"menuname":"商品分","icon":"icon-nav","url":"/shop/productcatagory.aspx"},
			{"menuname":"商品列表","icon":"icon-nav","url":"/shop/product.aspx"},
			{"menuname":"商品订单","icon":"icon-nav","url":"/shop/orders.aspx"}
		]
	},{"menuid":"39","icon":"icon-sys","menuname":"商城管理",
		"menus":[{"menuname":"商品分","icon":"icon-nav","url":"/shop/productcatagory.aspx"},
			{"menuname":"商品列表","icon":"icon-nav","url":"/shop/product.aspx"},
			{"menuname":"商品订单","icon":"icon-nav","url":"/shop/orders.aspx"}
		]
	},{"menuid":"39","icon":"icon-sys","menuname":"商城管理",
		"menus":[{"menuname":"商品分","icon":"icon-nav","url":"/shop/productcatagory.aspx"},
			{"menuname":"商品列表","icon":"icon-nav","url":"/shop/product.aspx"},
			{"menuname":"商品订单","icon":"icon-nav","url":"/shop/orders.aspx"}
		]
	}
]};
//设置登录窗口
function openPwd() {
	$('#w').window({
		title: '修改密码',
		width: 300,
		modal: true,
		shadow: true,
		closed: true,
		height: 160,
		resizable:false
	});
}
//关闭登录窗口
function close() {
	$('#w').window('close');
}



//修改密码
function serverLogin() {
	var $newpass = $('#txtNewPass');
	var $rePass = $('#txtRePass');

	if ($newpass.val() == '') {
		msgShow('系统提示', '请输入密码！', 'warning');
		return false;
	}
	if ($rePass.val() == '') {
		msgShow('系统提示', '请在一次输入密码！', 'warning');
		return false;
	}

	if ($newpass.val() != $rePass.val()) {
		msgShow('系统提示', '两次密码不一至！请重新输入', 'warning');
		return false;
	}

	$.post('/ajax/editpassword.ashx?newpass=' + $newpass.val(), function(msg) {
		msgShow('系统提示', '恭喜，密码修改成功！<br>您的新密码为：' + msg, 'info');
		$newpass.val('');
		$rePass.val('');
		close();
	})

}

$(function() {

	openPwd();
	//
	$('#editpass').click(function() {
		$('#w').window('open');
	});

	$('#btnEp').click(function() {
		serverLogin();
	})



	$('#loginOut').click(function() {
		$.messager.confirm('系统提示', '您确定要退出本次登录吗?', function(r) {

			if (r) {
				location.href = '/ajax/loginout.ashx';
			}
		});

	})



});




//初始化左侧
function InitLeftMenu() {

    $(".easyui-accordion").empty();
    var menulist = "";
   
    $.each(_menus.menus, function(i, n) {
        menulist += '<div title="'+n.menuname+'"  icon="'+n.icon+'" style="overflow:auto;">';
		menulist += '<ul>';
        $.each(n.menus, function(j, o) {
			menulist += '<li><div><a target="mainFrame" href="' + o.url + '" ><span class="icon '+o.icon+'" ></span>' + o.menuname + '</a></div></li> ';
        })
        menulist += '</ul></div>';
    })

	$(".easyui-accordion").append(menulist);
	
	$('.easyui-accordion li a').click(function(){
		var tabTitle = $(this).text();
		var url = $(this).attr("href");
		addTab(tabTitle,url);
		$('.easyui-accordion li div').removeClass("selected");
		$(this).parent().addClass("selected");
	}).hover(function(){
		$(this).parent().addClass("hover");
	},function(){
		$(this).parent().removeClass("hover");
	});

	$(".easyui-accordion").accordion();
}

function addTab(subtitle,url){
	if(!$('#tabs').tabs('exists',subtitle)){
		$('#tabs').tabs('add',{
			title:subtitle,
			content:createFrame(url),
			closable:true,
			width:$('#mainPanle').width()-10,
			height:$('#mainPanle').height()-26
		});
	}else{
		$('#tabs').tabs('select',subtitle);
	}
	tabClose();
}

function createFrame(url)
{
	var s = '<iframe name="mainFrame" scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}

function tabClose()
{
	/*双击关闭TAB选项卡*/
	$(".tabs-inner").dblclick(function(){
		var subtitle = $(this).children("span").text();
		$('#tabs').tabs('close',subtitle);
	})

	$(".tabs-inner").bind('contextmenu',function(e){
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY,
		});
		
		var subtitle =$(this).children("span").text();
		$('#mm').data("currtab",subtitle);
		
		return false;
	});
}
//绑定右键菜单事件
function tabCloseEven()
{
	//关闭当前
	$('#mm-tabclose').click(function(){
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close',currtab_title);
	})
	//全部关闭
	$('#mm-tabcloseall').click(function(){
		$('.tabs-inner span').each(function(i,n){
			var t = $(n).text();
			$('#tabs').tabs('close',t);
		});	
	});
	//关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function(){
		var currtab_title = $('#mm').data("currtab");
		$('.tabs-inner span').each(function(i,n){
			var t = $(n).text();
			if(t!=currtab_title)
				$('#tabs').tabs('close',t);
		});	
	});
	//关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function(){
		var nextall = $('.tabs-selected').nextAll();
		if(nextall.length==0){
			//msgShow('系统提示','后边没有啦~~','error');
			alert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			$('#tabs').tabs('close',t);
		});
		return false;
	});
	//关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function(){
		var prevall = $('.tabs-selected').prevAll();
		if(prevall.length==0){
			alert('到头了，前边没有啦~~');
			return false;
		}
		prevall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			$('#tabs').tabs('close',t);
		});
		return false;
	});

	//退出
	$("#mm-exit").click(function(){
		$('#mm').menu('hide');
	})
}

//弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}

function clockon() {
    var now = new Date();
    var year = now.getFullYear(); //getFullYear getYear
    var month = now.getMonth();
    var date = now.getDate();
    var day = now.getDay();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var sec = now.getSeconds();
    var week;
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    week = arr_week[day];
    var time = "";
    time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu + ":" + sec + " " + week;

    $("#bgclock").html(time);

    var timer = setTimeout("clockon()", 200);
}
