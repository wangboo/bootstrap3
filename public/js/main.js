/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-23
 * Time: 下午1:41
 * To change this template use File | Settings | File Templates.
 */
$(function(){
    //登陆模态框出现
    $("#login").click(function(){
        $("#login-modal").modal();
    });
    $("#login-model-close").click(function(){
        $("#login-modal").modal("toggle");
    });
    $("#login-modal-cancel").click(function(){
        $("#login-modal").modal("toggle");
    });
});
function changebg(img) {
    $("body").css("background-image", "url('"+img+"')");
    $("#changebgModal").modal('toggle');
    $.post("/json/changeBg", {"webBg": img}, function(){});
}