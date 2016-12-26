(function(window) {

    const LEFT      = 0;
    const RIGHT     = 1;
    const CENTER    = 2;

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
    }
    ActionButton.prototype.getOnClickCallback = function() {
        return this.onClickCallback;
    }

    var Popup = function(_title, _content, _buttonArray, _alert=null) {

        this.title = _title;
        this.content = _content;
        this.buttonArray = _buttonArray;
        this.alert = _alert;
    };

    Popup.prototype.createDOMElement = function() {

        var backdiv = document.createElement("div");
        backdiv.className = "popup_back";
        //backdiv.onclick = this.hide();

        var popdiv = document.createElement("div");
        popdiv.className = "pop_frame"

        var topdiv = document.createElement("div");
        topdiv.className = "pop_title";
        topdiv.innerHTML = this.title;

        var bottomdiv = document.createElement("div");
        bottomdiv.className = "pop_content";

        var bottomdivtext = document.createElement("div");
        bottomdivtext.className = "pop_content_text";
        bottomdivtext.innerHTML = this.content;
        bottomdiv.appendChild(bottomdivtext);

        if(this.alert != null) {
            var alertMsg = document.createElement("alertMsg");
            alertMsg.className = "alert-msg";
            alertMsg.innerHTML = this.alert;
            bottomdiv.appendChild(alertMsg);
        }

        var buttonArr = this.buttonArray;

        if(buttonArr.length == 1 ) {
            var btn1 = buttonArr[0];
            var btnCenter = document.createElement("BUTTON");
            btnCenter.className = "action-btn";
            btnCenter.className += " p-center";
            btnCenter.onclick = btn1.getOnClickCallback();

            var t = document.createTextNode(btn1.getTitle());
            btnCenter.appendChild(t);
            bottomdiv.appendChild(btnCenter);
        }
        else {

        }

        popdiv.appendChild(topdiv);
        popdiv.appendChild(bottomdiv);
        backdiv.appendChild(popdiv);

        return backdiv;
    };
    Popup.prototype.show = function() {
        console.log("show");
        var popupElement = this.createDOMElement();

        document.body.appendChild(popupElement);

    };
    Popup.prototype.hide = function() {
        console.log("hide");

        var div = document.getElementsByClassName("popup_back");

        if(div != null) {
            div[0].remove();
        }
    };

    var CSPopup = {
        makeButton: function(_title, _position, _clickCallback) {
            return new ActionButton(_title, _position, _clickCallback);
        },
        makePopup: function(_title, _content, _buttonArray, _alert=null) {
            return new Popup(_title, _content, _buttonArray, _alert);
        }
    };

    window.CSPopup = CSPopup;
}(('undefined' !== typeof window) ? window : {}));
