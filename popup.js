(function(window) {

    ////////////   ActionButton

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

    ///////////   NoticeItem

    var NoticeItem = function(_category, _date, _time, _clickCallback) {
        this.category = _category;
        this.date = _date;
        this.onClickCallback = _clickCallback;

        var time = _time.split(":");
        var hour = time[0]*1;

        if(hour > 12) {
            this.tm = "PM";
            hour-=12;
        }
        else {
            this.tm = "AM";
        }

        this.time = hour+":"+time[0];
    };

    NoticeItem.prototype.getMsg = function() {
        var msgMap = {
            "notice": "새로운 공지가 등록되었습니다.",
            "event": "새로운 이벤트가 등록되었습니다.",
            "video": "새로운 강의가 등록되었습니다.",
            "test": "새로운 시험이 등록되었습니다.",
            "board": "게시판에 새글이 등록되었습니다.",
        };

        return msgMap[this.category];
    };

    NoticeItem.prototype.getCategory = function() {
        return this.category;
    };
    NoticeItem.prototype.getDate = function() {
        return this.date;
    };
    NoticeItem.prototype.getTime = function() {
        return this.tm + " "+this.time;
    };
    NoticeItem.prototype.getOnClickCallback = function() {
        return this.onClickCallback;
    };

    //////////   Popup
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
                var title = btn.getTitle();
                var btnNew;

                if(title == "CODEINPUT") {
                    btnNew = document.createElement("INPUT");
                    btnNew.setAttribute("type","text");
                    btnNew.setAttribute("placeholder","코드 입력");
                    btnNew.setAttribute("maxlength","4");
                    btnNew.onclick = function(e) {
                        e.stopPropagation();
                    };
                }
                else {
                    btnNew = document.createElement("BUTTON");
                    btnNew.onclick = btn.getOnClickCallback();
                }

                btnNew.className = "action-btn";
                btnNew.className += btn.getPosition();

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

    /////// NoticePopup
    var NoticePopup = function(_title, _itemArray) {
        this.title = _title;
        this.itemArray = _itemArray;
    };

    NoticePopup.prototype.createDOMElement = function() {

        var backdiv = document.createElement("div");
        backdiv.className = "popup_back";
        backdiv.onclick = function() {
            console.log("backdiv click");
            backdiv.remove();
        };

        var popdiv = document.createElement("div");
        popdiv.className = "pop_frame notice";

        var topdiv = document.createElement("div");
        topdiv.className = "pop_title";
        topdiv.innerHTML = this.title;

        var bottomdiv = document.createElement("div");
        bottomdiv.className = "pop_content all";

        var itemArr = this.itemArray;

        if(itemArr.length > 0) {
            for (var index in itemArr) {

                var item = itemArr[index];
                var noticeitem = document.createElement("div");
                noticeitem.className = "noticeitem";

                var img = document.createElement("div");
                img.className = "noticeitem_ic " + item.getCategory();

                var msg = document.createElement("div");
                msg.className = "noticeitem_msg";
                msg.innerHTML = item.getMsg();

                var timediv = document.createElement("div");
                timediv.className = "noticeitem_time";

                var date = document.createElement("div");
                date.className = "date";
                date.innerHTML = item.getDate();

                var time = document.createElement("div");
                time.className = "time";
                time.innerHTML = item.getTime();

                timediv.appendChild(date);
                timediv.appendChild(time);

                var split = document.createElement("div");
                split.className = "splitx";

                noticeitem.appendChild(img);
                noticeitem.appendChild(msg);
                noticeitem.appendChild(split);
                noticeitem.appendChild(timediv);

                bottomdiv.appendChild(noticeitem);
            }
        }

        popdiv.appendChild(topdiv);
        popdiv.appendChild(bottomdiv);
        backdiv.appendChild(popdiv);

        return backdiv;
    };

    NoticePopup.prototype.show = function() {
        //console.log("show");
        var popupElement = this.createDOMElement();
        document.body.appendChild(popupElement);

    };
    NoticePopup.prototype.hide = function() {
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
            CODEINPUT: " code_input",
            LOGIN: " login",
            LEFT: " p-left",
            RIGHT: " p-right",
            CENTER: " p-center",
            TOP: " p-top",
            BOTTOM: " p-bottom",
            MIDDLE: " p-middle"
        },

        makeButton: function(_title, _position, _clickCallback) {
            return new ActionButton(_title, _position, _clickCallback);
        },
        makeNoticeItem: function(_category, _date, _time, _clickCallback) {
            return new NoticeItem(_category, _date, _time, _clickCallback);
        },
        makePopup: function(_title, _content, _buttonArray, _alert) {
            return new Popup(_title, _content, _buttonArray, _alert);
        },
        makeNotice: function(_title, _itemArray) {
            return new NoticePopup(_title, _itemArray);
        }
    };

    window.CSPopup = CSPopup;
}(('undefined' !== typeof window) ? window : {}));
