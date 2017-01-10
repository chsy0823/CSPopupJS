(function(window) {

    var BarButtonItem = function(_type, _position, _clickCallback, _badge) {
        this.type = _type;
        this.position = _position;
        this.onClickCallback = _clickCallback;
        this.badge = _badge;

    };
    BarButtonItem.prototype.getType = function() {
        return this.type;
    };
    BarButtonItem.prototype.getPosition = function() {
        return this.position;
    };
    BarButtonItem.prototype.getOnClickCallback = function() {
        return this.onClickCallback;
    };

    var Navibar = function(_title, _buttonArray) {

        this.title = _title;
        this.buttonArray = _buttonArray;
    };

    Navibar.prototype.createDOMElement = function() {

        var navibar = document.createElement("div");
        navibar.className = "navibar";

        var titlediv = document.createElement("div");
        titlediv.className = "navi_title"
        titlediv.innerHTML = this.title;
        navibar.appendChild(titlediv);

        var buttonArr = this.buttonArray;

        if(buttonArr.length > 0) {
            for (var index in buttonArr) {
                var btn = buttonArr[index];
                var btnNew = document.createElement("BUTTON");
                var type = btn.getType();

                btnNew.className = "navi_btn";
                btnNew.className += btn.getPosition();
                btnNew.onclick = btn.getOnClickCallback();

                if(CSNavibar.cssClassMap[type]) {
                    btnNew.className += CSNavibar.cssClassMap[type];
                }

                navibar.appendChild(btnNew);
            }
        }

        return navibar;
    };

    Navibar.prototype.append = function() {
        //console.log("show");
        var popupElement = this.createDOMElement();
        document.body.appendChild(popupElement);

    };

    var CSNavibar = {
        cssClassMap: {
            CLOSE: " a-close",
            BACK: " a-back",
            LIST: " a-list",
            FAVORITE: " a-favorite",
            NOTICE: " a-notice",
            OK: " a-ok",
            LEFT: " p-left",
            RIGHT: " p-right"
        },

        makeButton: function(_title, _position, _clickCallback) {
            return new BarButtonItem(_title, _position, _clickCallback);
        },
        makeNavibar: function(_title, _buttonArray) {
            return new Navibar(_title, _buttonArray);
        }
    };

    window.CSNavibar = CSNavibar;
}(('undefined' !== typeof window) ? window : {}));
