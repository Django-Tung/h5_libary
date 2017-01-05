/**
 * Created by Administrator on 2016/12/7.
 */
//柱状图图文组件对象
var H5ComponentBar_v=function(name,cfg){


    var component=new H5ComponentBar(name,cfg);
    var width=100/cfg.data.length;
    component.find('.line').width( width + '%');
    $.each( component.find('.rate') ,function(){
        var w = $(this).css('width');
        $(this).css('height',w).css('width','');
    });

    $.each( component.find('.per'),function(){
        $(this).appendTo( $(this).prev() ) ;
        console.log($(this).prev())
    })


    return component

}