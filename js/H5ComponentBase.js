/**
 * Created by Administrator on 2016/12/7.
 */
//基本图文组件对象
var H5ComponentBase=function(name,cfg){
    var cfg= cfg || {};
    var id=('h5_c_'+Math.random()).replace('0.','');

    //把当前的组件类型添加到样式中进行标记
    var cls=' h5_component_'+cfg.type;
    var component=$('<div id="'+id+'" class="h5_component '+cls+' h5_component_name_'+name+'"></div>');

    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);

    cfg.css&&component.css(cfg.css);
    cfg.bg&&component.css('backgroundImage','url('+cfg.bg+')');

    if(cfg.center){
        component.css({
            marginLeft:(cfg.width/4*-1+'px'),
            left:'50%'
        })
    }
    //  ... 很多自定义的参数
    if( typeof cfg.onclick === 'function' ){
        component.on('click',cfg.onclick);
    }

    if(cfg.relativeTo){
        var parent = $('body').find('.h5_component_name_'+cfg.relativeTo);
        var position = {
            left:$(parent)[0].offsetLeft,
            top:$(parent)[0].offsetTop
        };
        if(cfg.center === true){
            position.left=0;
        }
        component.css('transform','translate('+position.left+'px,'+position.top+'px)');
    }

    component.on('onLeave',function(){
        component.addClass(cls+'_onLeave').removeClass(cls+'_onLoad');
        cfg.animateOut && component.animate(cfg.animateOut);
        return false
    }),
    component.on('onLoad',function(){
        component.addClass(cls+'_onLoad').removeClass(cls+'_onLeave');
        cfg.animateIn && component.animate(cfg.animateIn);
        return false
    })

    return component;
}