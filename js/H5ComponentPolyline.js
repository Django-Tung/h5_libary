/**
 * Created by Administrator on 2016/12/7.
 */
//基本图文组件对象
var H5ComponentPolyline=function(name,cfg){
    var component=new H5ComponentBase(name,cfg);

    //绘制网格线-背景层
    var w=cfg.width;
    var h=cfg.height;
    //加入一个画布（网格线背景）
    var cns=document.createElement('canvas');
    var ctx=cns.getContext('2d');
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;

    //水平网格线 100份->10份
    var step=10;
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle='#aaa';

    window.ctx=ctx;
    //绘制横向网格线
    for(var i=0;i<step+1;i++){
        var y=(h/step)*i;
        ctx.moveTo(0,y);
        ctx.lineTo(w,y)
    }
    //绘制纵向网格线
    step=cfg.data.length+1;
    var text_w= w/step >> 0;
    for(var i=0;i<step+1;i++){
        var x=(w/step)*i;
        ctx.moveTo(x,0);
        ctx.lineTo(x,w);
        if(cfg.data[i]){
            var sec = 1.5 + i*.5;
            var text = $('<div class="text" style="-webkit-transition:all 1s '+sec+'s">');
            text.text(cfg.data[i][0]);
            text.css('width',text_w/2).css('left',x/2+text_w/4);

            component.append(text);
        }
    }
    ctx.stroke();
    component.append(cns);

    //加入画布-数据层
    var cns=document.createElement('canvas');
    var ctx=cns.getContext('2d');
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    //绘制折现数据
    ctx.beginPath();
    ctx.lineWidth=3;
    ctx.strokeStyle='#ff8878';


    var draw=function(per){
        //
        ctx.clearRect(0,0,w,h)
        ctx.beginPath();
        ctx.lineWidth=3;
        ctx.strokeStyle='#ff8878';
        var x=0;
        var y=0;
        var row_x=w/(cfg.data.length+1);
        //画点
        for(i in cfg.data){
            var item=cfg.data[i];
            x=row_x*i+row_x;
            y=h-(item[1]*h*per);

            ctx.moveTo(x,y);
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fillStyle='#ff8878';
            ctx.fill();
        }
        //连线
        //移动画笔到第一个数据的点位置
        ctx.moveTo(row_x,h-(cfg.data[0][1])*h*per);
        for(i in cfg.data){
            var item=cfg.data[i];
            x=row_x*i+row_x;
            y=h-(item[1]*h*per);
            ctx.lineTo(x,y)
        }
        ctx.stroke();
        ctx.strokeStyle='rgba(255,136,1209,0)';
        //绘制阴影
        ctx.lineTo(x,h);
        ctx.lineTo(row_x,h);
        ctx.fillStyle='rgba(255,136,1209,0.2)';
        ctx.fill();
        ctx.stroke();

        //写入数据
        for(i in cfg.data){
            var item=cfg.data[i];
            x=row_x*i+row_x;
            y=h-(item[1]*h*per);
            ctx.fillStyle=item[2]?item[2]:'#595959';
            ctx.fillText(item[1]*100+'%',x-10,y-10)
        }
    }


    component.on('onLoad',function(){
        var s=0;
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10+500)
        }
    });
    component.on('onLeave',function(){
        var s=1;
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                draw(s);
            },i*10)
        }
    })





    component.append(cns);
    return component;
}