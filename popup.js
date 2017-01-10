(function(window) {

    var ActionButton = function(_title, _position, _clickCallback) {
        this.title = _title;
        this.position = _position;
        this.onClickCallback = _clickCallback;

    };
    ActionButton.prototype.getTitle = function() {
        return this.title;
    };
    ActionButton.prototype.getPosition = function() {
        return this.position;
    };
    ActionButton.prototype.getOnClickCallback = function() {
        return this.onClickCallback;
    };

    var Popup = function(_title, _content, _buttonArray, _alert) {

        this.title = _title;
        this.content = _content;
        this.buttonArray = _buttonArray;
        this.alert = _alert;
    };

    Popup.prototype.createDOMElement = function() {

        var backdiv = document.createElement("div");
        backdiv.className = "popup_back";
        backdiv.onclick = function() {
            console.log("backdiv click");
            backdiv.remove();
        };

        var popdiv = document.createElement("div");
        popdiv.className = "pop_frame"

        var topdiv = document.createElement("div");
        topdiv.className = "pop_title";
        topdiv.innerHTML = this.title;

        var bottomdiv = document.createElement("div");
        bottomdiv.className = "pop_content";

        if(this.content != null) {
            var bottomdivtext = document.createElement("div");
            bottomdivtext.className = "pop_content_text";
            bottomdivtext.innerHTML = this.content;
            bottomdiv.appendChild(bottomdivtext);
        }

        if(this.alert != null) {
            var alertMsg = document.createElement("alertMsg");
            alertMsg.className = "alert-msg";
            alertMsg.innerHTML = this.alert;
            bottomdiv.appendChild(alertMsg);
        }

        var buttonArr = this.buttonArray;

        if(buttonArr.length > 0) {
            for (var index in buttonArr) {
                var btn = buttonArr[index];
                var btnNew = document.createElement("BUTTON");
                var title = btn.getTitle();

                btnNew.className = "action-btn";
                btnNew.className += btn.getPosition();
                btnNew.onclick = btn.getOnClickCallback();

                if(CSPopup.cssClassMap[title]) {
                    btnNew.className += CSPopup.cssClassMap[title];
                }
                else {
                    var t = document.createTextNode(btn.getTitle());
                    btnNew.appendChild(t);
                }

                bottomdiv.appendChild(btnNew);
            }
        }

        popdiv.appendChild(topdiv);
        popdiv.appendChild(bottomdiv);
        backdiv.appendChild(popdiv);

        return backdiv;
    };

    Popup.prototype.show = function() {
        //console.log("show");
        var popupElement = this.createDOMElement();
        document.body.appendChild(popupElement);

    };
    Popup.prototype.hide = function() {
        //console.log("hide");

        var div = document.getElementsByClassName("popup_back");

        if(div != null) {
            div[0].remove();
        }
    };

    var CSPopup = {
        cssClassMap: {
            OK: " ok",
            CANCEL: " cancel",
            ACCODE: " accode",
            ACSEARCH: " acsearch",
            LOGIN: " login",
            LEFT: " p-left",
            RIGHT: " p-right",
            CENTER: " p-center",
            TOP: " p-top",
            BOTTOM: " p-bottom"
        },

        makeButton: function(_title, _position, _clickCallback) {
            return new ActionButton(_title, _position, _clickCallback);
        },
        makePopup: function(_title, _content, _buttonArray, _alert) {
            return new Popup(_title, _content, _buttonArray, _alert);
        }
    };

    window.CSPopup = CSPopup;
}(('undefined' !== typeof window) ? window : {}));
