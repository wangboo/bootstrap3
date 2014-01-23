/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-1-23
 * Time: 下午1:41
 * To change this template use File | Settings | File Templates.
 */
$(function(){


});
function changebg(img) {
    $("body").css("background-image", "url('"+img+"')");
    $("#changebgModal").modal('toggle');
}