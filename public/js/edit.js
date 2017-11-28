(function(global){
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    var type = getQueryString('type');

    $('.addinfo_btn').on('click', function(){
        if(!type){
            return;
        }
        var title = $('#title').val();
        var url = $('#url').val();
        var img = $('#img').val();
        var obj = {
            type: type,
            title: title,
            url: url,
            img: img
        };

        $.ajax({
            type: 'POST',
            url: '/data/write',
            data: obj,
            success: function(data){
                if(data.status){
                    alert('添加数据成功');
                    window.location.reload();
                }else{
                    alert('添加失败');
                }
            },
            error: function(){
                alert('添加失败');
            },
            dataType: 'json'
        });

    });

    $('.remove').on('click', function(){
        if(!type){
            return;
        }
        var id = $(this).data('id');
        var obj = {
            id:id,
            type:type
        };
        
        var btn = confirm("你确定要删除吗")
        // return
        if(btn == true)
        {
            $.ajax({
                type: 'POST',
                url: '/data/remove',
                data: obj,
                success: function(data){
                    if(data.status){
                        // alert('删除成功');
                        window.location.reload();
                    }else{
                        alert('删除失败');
                    }
                },
                error: function(){
                    // alert('添加失败');
                },
                dataType: 'json'
            });
        }
        else
        {
            return
        }
    })
    $('.LogOut').on('click', function(){

        var logout = confirm("你确定要登出吗?")
        
        if(logout == false){
            return false;             
        }
        // console.log('sdf')
        $.ajax({
            type: 'POST',
            url: '/data/LogOut',
            data: 'obj',
            success: function(data){
                alert("你已登出")
                window.location.href = '/';
            },
            error: function(){
                alert('登出失败,请重试');
            },
            dataType: 'json'
        });
    })
})(window);