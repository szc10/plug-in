var MobileSelect = (function() {

    CSS.insertRule("._no_display{ display: none !important;}");
    CSS.insertRule("._isdjyd { background-color: #fff;margin: 0 auto;display: block;clear: both;height: 400px;position: relative;width: 250px; border-radius: 3px;}");
    CSS.insertRule("._isdjyd li {padding-top: 20px;padding-bottom: 15px;padding-left: 30px;border-bottom: solid 1px rgb(240, 240, 240);} ");
    CSS.insertRule("._isdjyd li:last-child {border-bottom: 0} ");
    CSS.insertRule("._isdjyd li.active {background: rgb(250, 250, 250);color: #03A9F4;}");
    CSS.insertRule("._isdjyd li:active {background: rgb(245, 245, 245);}");
    //设置一个空的回调函数
    var _select_callFn = new Function('');
    var model_type = null;
    var _select_panel_wrapper = document.createElement('div');
    _select_panel_wrapper.className = "_no_display";
    _select_panel_wrapper.style.cssText = 'loat: left;width: 100%;background-color: rgba(50,50,50,.2);height: 100%;z-index: 99;position: fixed;top: 0;';
    document.body.appendChild(_select_panel_wrapper);

    var _select_floater = document.createElement("div");
    _select_floater.style.cssText = 'float: left;height: 50%;margin-bottom: -200px;width: 100%;';
    _select_panel_wrapper.appendChild(_select_floater);


    var defaultSelect = (function() {
        var _select_context = document.createElement("div");
        _select_context.className = "_isdjyd _no_display";
        _select_panel_wrapper.appendChild(_select_context);

        var srodiv = document.createElement("div");
        srodiv.style.cssText = "overflow-y: scroll; height: 100%;";
        _select_context.appendChild(srodiv);

        var _select_panel = document.createElement("ul");
        srodiv.appendChild(_select_panel);


        var _select_sty_arr = []; //设置样式表
        _select_sty_arr['defalut'] = function(data) {
            var str = "";
            for (var k = 0; k < data.length; k++) {
                var one = data[k];
                var tmpl = '<li data-val="' + one.value + '">' + one.text + '</li>';
                str += tmpl;
            }
            return str;
        };

        J(_select_panel).click(function(ev) {
            var target = ev.target;
            _select_input.value = target.innerHTML;
            console.log(_select_input.value);
            _select_input.dataset.val = target.dataset.val;
            closePanel();
            _select_callFn.call(_select_panel, _select_input);
            stopBubble(ev);
        });
        return {
            setData: function(data) {
                _select_panel.innerHTML = _select_sty_arr.defalut(data);
                return this;
            },
            display: function(dom) {
                var val = dom.dataset.val;
                if (val) {
                    J(_select_panel).domFirst('*[data-val="' + val + '"]').className = "active";
                }
                J(_select_panel_wrapper).removeClass('_no_display');
                J(_select_context).removeClass('_no_display');
                model_type = this;
            },
            close: function() {
                J(_select_panel_wrapper).addClass('_no_display');
                J(_select_context).addClass('_no_display');
            }
        }
    }());


    var treeSelect = (function() {
        var _select_context = document.createElement("div");
        _select_context.className = "_isdjyd _no_display";
        _select_context.style.cssText = "width:300px";
        _select_panel_wrapper.appendChild(_select_context);
        var first_cu = null;
        var childData = [];




        // ok =

        _select_context.innerHTML = '<div name="first-div"><ul name="first-ul"></ul></div>' + '<div name="second-div"><ul name="second-ul"></ul></div>'
        var cssText = "overflow-y: scroll;height: 100%;width: 49.5%;float: left;";
        J(_select_context).domFirst('div[name=first-div]').style.cssText = cssText;
        J(_select_context).domFirst('div[name=second-div]').style.cssText = "margin-left:1%;" + cssText;
        var first_ul = J(_select_context).domFirst('ul[name=first-ul]');
        var second_ul = J(_select_context).domFirst('ul[name=second-ul]');
        var first_text = "";
        var second_text = "";






        var _select_sty_arr = []; //设置样式表
        _select_sty_arr['defalut'] = function(data) {
            var str = "";
            for (var k = 0; k < data.length; k++) {
                var one = data[k];
                var tmpl = '<li data-val="' + one.value + '">' + one.text + '</li>';
                str += tmpl;
            }
            return str;
        };
        J(first_ul).click(function(ev) {
            var target = ev.target;
            if (first_cu) {
                J(first_cu).removeClass('active');
            }
            first_cu = target;

            J(first_cu).addClass('active');

            second_ul.innerHTML = _select_sty_arr.defalut(childData[target.dataset.val]);

            _select_input.value = target.innerHTML;
            _select_input.dataset.text1 = target.innerHTML;
            _select_input.dataset.val1 = target.dataset.val;

            stopBubble(ev);
        });
        J(second_ul).click(function(ev) {
            var target = ev.target;
            J(target).addClass('active');

             _select_input.dataset.text2 = target.innerHTML;
            _select_input.dataset.val2 = target.dataset.val;

            _select_input.value = _select_input.dataset.text1+" " + target.innerHTML;

            closePanel();

              _select_callFn.call(second_ul, _select_input);

            stopBubble(ev);
        });
        return {
            setData: function(data) {

                first_ul.innerHTML = _select_sty_arr.defalut(data);
                childData = [];
                for (var i = 0; i < data.length; i++) {
                    childData[data[i].value] = data[i].child;
                }
                return this;
            },
            display: function(dom) {
                var val1 = dom.dataset.val1;
                if (val1) {
                    J(first_ul).domFirst('*[data-val="' + val1 + '"]').className = "active";
                    first_cu = J(first_ul).domFirst('*[data-val="' + val1 + '"]');
                    second_ul.innerHTML = _select_sty_arr.defalut(childData[val1]);
                    var val2 = dom.dataset.val2;
                    if (val2) {
                        J(second_ul).domFirst('*[data-val="' + val2 + '"]').className = "active";
                    }
                }


                J(_select_panel_wrapper).removeClass('_no_display');
                J(_select_context).removeClass('_no_display');
                model_type = this;
            },
            close: function() {
                J(_select_context).addClass('_no_display');
            }
        }
    }());




    J(_select_panel_wrapper).click(function() {
        closePanel();
    });

    function closePanel() {
        J(_select_panel_wrapper).addClass('_no_display');
        model_type.close();
    }


    /**
     * [stopBubble 阻止冒泡事件]
     * @param  {[type]} ev [description]
     * @return {[type]}    [description]
     */
    function stopBubble(ev) {
        if (ev && ev.stopPropagation)
            ev.stopPropagation();
        else
            window.event.cancelBubble = true;
    }

    return {
        tSelect: function(dom, data) {
            _select_input = dom;
            defaultSelect.setData(data).display(dom);
            return this;
        },
        treeSelect: function(dom, data) {
            _select_input = dom;
            treeSelect.setData(data).display(dom);
            return this;
        },
        then: function(fn) {
            _select_callFn = fn;
        }
    }

}());
