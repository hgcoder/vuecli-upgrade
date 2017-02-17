/**
 *
 * @authors huxiao (you@example.org)
 * @date    2016-08-25 19:00:24
 * @version $Id$
 */
/**
 * 工具类
 *
 * @type {Object}
 */
import $ from "jquery"
import Vue from "vue"
var __this = new Vue({
    method:{
    /**
     * 设置datatable scrollY
     * [setClientH description]
     */
    setClientH:function(diyh){
        var ruleH = null;
        if( document.body.clientHeight 
            && (document.body.clientHeight - 330 >0)){
            ruleH = document.body.clientHeight -260;
            if(diyh){
               ruleH = ruleH - diyh; 
            }
        }else{
            ruleH = 400;
        }
        return ruleH;
    },
    /**
     * 本地缓存时间
     * [localTime description]
     * @type {[type]}
     */
    localTimOut:null,
    /**
     * 页面流转存储数据
     * [localStorag description]
     * @type {Object}
     */
    setStorage:function(key,val){
        if(key){
            key = key.toUpperCase();
            window.localStorage.setItem(key,val)
        }else{
            return null;
        }
    },
    getStorage:function(key){
        if(key){
            key = key.toUpperCase();
            return window.localStorage.getItem(key);
        }else{
            return null;
        }
    },
    delStorage:function(key){
        if(key){
            key = key.toUpperCase();
            window.localStorage.removeItem(key);
        }else{
            window.localStorage.clear();
        }
    },
    setStTime:function(option){

    },
    /**
     * dom 提示内容选择器
     * 校验浏览器版本号不支持8及一下版本查看
     * @param  {[type]}
     * @return {[type]}
     */
    checkVersion: function() {
        var agent = navigator.userAgent.toLowerCase();
        var regStr_ie = /msie [\d.]+;/gi;
        var browser = null;
        if (agent.indexOf("msie") > 0) {
            browser = agent.match(regStr_ie)
            if ((browser + "").replace(/[^0-9.]/ig, "") == 8) {
                window.location.href = "../dtm-web/dist/static/diyIE.html";
            }
        };
    },
    /**
     * ajax请求
     * [setRequest description]
     * @param {[type]} option [description]
     */
    setRequest: function(option, extObj) {

        var params = $.extend({}, option);
        if (!params.error || typeof params.error != 'function') {
            params.error = function(err) {
                __this.$message('服务开小差，请稍后重试');
            }
        }
        if (params.success && typeof params.success == 'function') {
            var success = params.success;
            params.success = function(json) {
                var data = json;
                
                if (data) {
                    success(data);
                } else {
                    __this.$message('请求无正确返回');
                    if (extObj && typeof extObj.successCall == 'function') {
                        extObj.successCall();
                    }
                }
            }
        }
        $.ajax(params);
    },
    /**
     * 获取url参数
     * [getParam description]
     * @param  {[type]} key [description]
     * @return {[type]}     [description]
     */
    getParam: function(key) {
        var args = {};
        var match = null;
        var search = decodeURIComponent(location.search.substring(1));
        var reg = /(?:([^&]+)=([^&]+))/g;
        while ((match = reg.exec(search)) !== null) {
            args[match[1]] = match[2];
        }
        return args[key];
    },
    /**
     * 修复告警导航展示问题
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    repairMenu: function(str) {
        var dom = $('#J_menuItem_locker');
        if (str == "mon-lockerDet") {
            dom.removeClass('hide');
        } else {
            dom.addClass('hide');
        }
    },
    /**
     * 权限获取 
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    dealAuthority: function(val) {
        var flag = false;
        if (!this.roleNameList || this.roleNameList.indexOf(val) == -1) {
            flag = true;
        }
        return flag;
    },
    HashMap: function() {
        this.keys = new Array();
        this.data = new Object();
        this.put = function(key, value) {
            if (this.data[key] == null) {
                this.keys.push(key);
            }
            this.data[key] = value;
        };
        this.get = function(key) {
            return this.data[key];
        };
        /** 删除 * */
        this.remove = function(key) {
            if (this.get(key) != null) {
                delete this.data[key];
            }
        };
    }
    }
})
window.__ut = __this.$options.method;