/**
*  Ajax Autocomplete for jQuery, version 1.1.3
*  (c) 2010 Tomas Kirda
*
*  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
*  For details, see the web site: http://www.devbridge.com/projects/autocomplete/jquery/
*
*  Last Review: 04/19/2010
*/

/*jslint onevar: true, evil: true, nomen: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true */
/*global window: true, document: true, clearInterval: true, setInterval: true, jQuery: true */

(function($) {

  var reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g');

  function fnFormatResult(value, data, currentValue) {
    var pattern = '(' + currentValue.replace(reEscape, '\\$1') + ')';
    return value.replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
  }

  function Autocomplete(el, options) {
    this.el = $(el);
    this.el.attr('autocomplete', 'off');
    this.suggestions = [];
    this.data = [];
    this.uuids = [];
    this.mimes = [];
    this.imgs = [];
    this.alts = [];
    this.attLang = [];
    this.attLangAlt = [];
    this.attLangSrc = [];
    this.badQueries = [];
    this.selectedIndex = -1;
    this.currentValue = this.el.val();
    this.intervalId = 0;
    this.cachedResponse = [];
    this.onChangeInterval = null;
    this.ignoreValueChange = false;
    this.serviceUrl = options.serviceUrl;
    this.isLocal = false;
    this.selection = null;
    this.options = {
      autoSubmit: false,
      minChars: 1,
      maxHeight: 300,
      deferRequestBy: 0,
      width: 0,
      highlight: true,
      params: {},
      fnFormatResult: fnFormatResult,
      delimiter: null,
      onSearchError: undefined,
      onInvalidateSelection: undefined,
      zIndex: 9999
    };
    this.initialize();
    this.setOptions(options);
  }
  
  $.fn.autocomplete = function(options) {
    return new Autocomplete(this.get(0)||$('<input />'), options);
  };


  Autocomplete.prototype = {

    killerFn: null,

    initialize: function() {

      var me, uid, autocompleteElId;
      me = this;
      uid = Math.floor(Math.random()*0x100000).toString(16);
      autocompleteElId = 'Autocomplete_' + uid;

      this.killerFn = function(e) {
        if ($(e.target).parents('.autocomplete').size() === 0) {
          me.killSuggestions();
          me.disableKillerFn();
        }
      };

      if (!this.options.width) { this.options.width = this.el.width(); }
      this.mainContainerId = 'AutocompleteContainter_' + uid;

      if ($('#dialog-form').length>0 && $('#dialog-form').hasClass('ui-dialog-content') && $('#dialog-form').dialog('isOpen')===true) {
        $('<div id="' + this.mainContainerId + '" style="position:fixed;z-index:9999;"><div class="autocomplete-w1"><div class="autocomplete" id="' + autocompleteElId + '" style="display:none; width:300px;"></div></div></div>').appendTo('body');
      } else {
        $('<div id="' + this.mainContainerId + '" style="position:absolute;z-index:9999;"><div class="autocomplete-w1"><div class="autocomplete" id="' + autocompleteElId + '" style="display:none; width:300px;"></div></div></div>').appendTo('body');
      }

      this.container = $('#' + autocompleteElId);
      this.fixPosition();
      if (window.opera) {
        this.el.keypress(function(e) { me.onKeyPress(e); });
      } else {
        this.el.keydown(function(e) { me.onKeyPress(e); });
      }
      this.el.keyup(function(e) { me.onKeyUp(e); });
      this.el.blur(function() { me.enableKillerFn(); });
      this.el.focus(function() { me.onFocus(); });
    },

    onFocus: function () {
        var that = this;

        that.fixPosition();

        if (that.el.val().length >= that.options.minChars) {
            that.onValueChange();
        }
    },
    
    setOptions: function(options){
      var o = this.options;
      $.extend(o, options);
      if(o.lookup){
        this.isLocal = true;
        if($.isArray(o.lookup)){ o.lookup = { suggestions:o.lookup, data:[] }; }
      }
      $('#'+this.mainContainerId).css({ zIndex:o.zIndex });
      this.container.css({ maxHeight: o.maxHeight + 'px', width:o.width });
    },
    
    clearCache: function(){
      this.cachedResponse = [];
      this.badQueries = [];
    },
    
    disable: function(){
      this.disabled = true;
    },
    
    enable: function(){
      this.disabled = false;
    },

    fixPosition: function() {

      var offset = this.el.offset();
      if ($('#dialog-form').length>0 && $('#dialog-form').hasClass('ui-dialog-content') && $('#dialog-form').dialog('isOpen')===true) {
        $('#' + this.mainContainerId).css({ top: (offset.top - $(window).scrollTop() + this.el.innerHeight()) + 'px', left: offset.left + 'px' });
      } else {
        $('#' + this.mainContainerId).css({ top: (offset.top + this.el.innerHeight()) + 'px', left: offset.left + 'px' });
      }

    },

    enableKillerFn: function() {
      var me = this;
      $(document).bind('click', me.killerFn);
    },

    disableKillerFn: function() {
      var me = this;
      $(document).unbind('click', me.killerFn);
    },

    killSuggestions: function() {
      var me = this;
      this.stopKillSuggestions();
      this.intervalId = window.setInterval(function() { me.hide(); me.stopKillSuggestions(); }, 300);
    },

    stopKillSuggestions: function() {
      window.clearInterval(this.intervalId);
    },

    onKeyPress: function(e) {
      if (this.disabled || !this.enabled) { return; }
      // return will exit the function
      // and event will not be prevented
      switch (e.keyCode) {
        case 27: //KEY_ESC:
          this.el.val(this.currentValue);
          this.hide();
          break;
        case 9: //KEY_TAB:
        case 13: //KEY_RETURN:
          if (this.selectedIndex === -1) {
            this.hide();
            return;
          }
          this.select(this.selectedIndex);
          if(e.keyCode === 9){ return; }
          break;
        case 38: //KEY_UP:
          this.moveUp();
          break;
        case 40: //KEY_DOWN:
          this.moveDown();
          break;
        default:
          return;
      }
      e.stopImmediatePropagation();
      e.preventDefault();
    },

    onKeyUp: function(e) {
      if(this.disabled){ return; }
      switch (e.keyCode) {
        case 38: //KEY_UP:
        case 40: //KEY_DOWN:
          return;
      }
      clearInterval(this.onChangeInterval);
      if (this.currentValue !== this.el.val()) {
        if (this.options.deferRequestBy > 0) {
          // Defer lookup in case when value changes very quickly:
          var me = this;
          this.onChangeInterval = setInterval(function() { me.onValueChange(); }, this.options.deferRequestBy);
        } else {
          this.onValueChange();
        }
      }
    },

    onValueChange: function(hideProposals) {

      var that = this,
          options = that.options,
          value = that.el.val(),
          query = that.getQuery(value);

      if (that.selection && this.currentValue !== query) {
        that.selection = null;
        (options.onInvalidateSelection || $.noop).call(that.el);
      }

      clearInterval(this.onChangeInterval);
      if(typeof this.options.onPassAuto == 'function'){
        this.options.onPassAuto();
      }
      try{
        if(typeof this.options.sentPrepare == 'function'){
          this.options.sentPrepare(this.options);
        }  
      }catch(err){
        
      }


      this.currentValue = this.el.val();
      var q = this.getQuery(this.currentValue);
      this.selectedIndex = -1;                	      
      if (this.ignoreValueChange) {
        this.ignoreValueChange = false;
        return;
      }
      if (q === '' || q.length < this.options.minChars) {
        this.hide();
      } else {
        this.getSuggestions(q, hideProposals);
      }
    },

    getQuery: function(val) {
      var d, arr;
      d = this.options.delimiter;
      if (!d) { return $.trim(val); }
      arr = val.split(d);
      return $.trim(arr[arr.length - 1]);
    },

    getSuggestionsLocal: function(q) {
      var ret, arr, len, val, i;
      arr = this.options.lookup;
      len = arr.suggestions.length;
      ret = { suggestions:[], data:[], uuids:[], mimes:[], imgs:[], alts:[], attLang:[], attLangAlt:[], attLangSrc:[] };
      q = q.toLowerCase();
      for(i=0; i< len; i++){
        val = arr.suggestions[i];
        if(val.toLowerCase().indexOf(q) === 0){
          ret.suggestions.push(val);
          ret.data.push(arr.data[i]);
          ret.uuids.push(arr.uuids[i]);
          ret.mimes.push(arr.mimes[i]);
          ret.imgs.push(arr.imgs[i]);
          ret.alts.push(arr.alts[i]);
          ret.attLang.push(arr.attLang[i]);
          ret.attLangAlt.push(arr.attLangAlt[i]);
          ret.attLangSrc.push(arr.attLangSrc[i]);
        }
      }
      return ret;
    },
    
    getSuggestions: function(q, hideProposals) {
      var cr, me;
      cr = this.isLocal ? this.getSuggestionsLocal(q) : this.cachedResponse[q];
      if (cr && $.isArray(cr.suggestions)) {
        this.suggestions = cr.suggestions;
        this.data = cr.data;
        this.uuids = cr.uuids;
        this.mimes = cr.mimes;
        this.imgs = cr.imgs;
        this.alts = cr.alts;
        this.attLang = cr.attLang;
        this.attLangAlt = cr.attLangAlt;
        this.attLangSrc = cr.attLangSrc;
        this.suggest();
      } else if (!this.isBadQuery(q)) {
        me = this;
        me.options.params.query = q;
        $.get(this.serviceUrl, me.options.params, function(txt) { me.processResponse(txt, hideProposals); }, 'text')
            .fail(function (jqXHR, textStatus, errorThrown) {
                me.options.onSearchError.call(me.el, q, jqXHR, textStatus, errorThrown);
            });
      }
    },

    isBadQuery: function(q) {
      var i = this.badQueries.length;
      while (i--) {
        if (q.indexOf(this.badQueries[i]) === 0) { return true; }
      }
      return false;
    },

    hide: function() {
      this.enabled = false;
      this.selectedIndex = -1;
      this.container.hide();
    },
    
    show: function() {
    	if (this.suggestions.length === 0) {
    		return;
    	}
        this.enabled = true;
        this.selectedIndex = -1;
        this.container.show('fast');
      },

    suggest: function(hideProposals) {
      if (this.suggestions.length === 0) {
        this.hide();
        return;
      }

      var me, len, div, f, v, i, s, uuid, mime, imgs, alts, attLang, attLangAlt, attLangSrc, mOver, mClick,mOut;
      me = this;
      len = this.suggestions.length;
      f = this.options.fnFormatResult;
      v = this.getQuery(this.currentValue);
      mOver = function(xi) { return function() { me.activate(xi); }; };
      mOut = function(xi) { return function() { me.deactivate(this,xi); }; };
      mClick = function(xi) { return function() { me.select(xi); }; };
      this.container.hide().empty();
      for (i = 0; i < len; i++) {
        s = this.suggestions[i];
        uuid = this.uuids[i];
        mime = this.mimes[i];
        imgs = this.imgs[i];
        alts = this.alts[i];
        attLang = this.attLang[i];
        attLangAlt = this.attLangAlt[i];
        attLangSrc = this.attLangSrc[i];
        div = $((me.selectedIndex === i ? '<div class="selected"' : '<div') + ' title="' + s + '">' + f(s, this.data[i], v) + '</div>');
        div.mouseover(mOver(i));
        div.mouseout(mOut(i));
        div.blur(mOut(i));
        div.click(mClick(i));
        this.container.append(div);
      }
      this.enabled = true;
        if (!hideProposals) {
            this.container.show();
        }
    },

    processResponse: function(text, hideProposals) {
      var response;
      try {
        response = eval('(' + text + ')');
      } catch (err) { return; }
      if (!$.isArray(response.data)) { response.data = []; }
      if (!$.isArray(response.uuids)) { response.uuids = []; }
      if (!$.isArray(response.mimes)) { response.mimes = []; }
      if (!$.isArray(response.imgs)) { response.imgs = []; }
      if (!$.isArray(response.alts)) { response.alts = []; }
      if (!$.isArray(response.attLang)) { response.attLang = []; }
      if (!$.isArray(response.attLangAlt)) { response.attLangAlt = []; }
      if (!$.isArray(response.attLangSrc)) { response.attLangSrc = []; }
      
      if(!this.options.noCache){
        this.cachedResponse[response.query] = response;
        if (response.suggestions.length === 0) { this.badQueries.push(response.query); }
      }
      if (response.query === this.getQuery(this.currentValue)) {
        this.suggestions = response.suggestions;
        this.data = response.data;
        this.uuids = response.uuids;
        this.mimes = response.mimes;
        this.imgs = response.imgs;
        this.alts = response.alts;
        this.attLang = response.attLang;
        this.attLangAlt = response.attLangAlt;
        this.attLangSrc = response.attLangSrc;
        this.suggest(hideProposals);
      }
    },

    activate: function(index) {
      var divs, activeItem;
      divs = this.container.children();
      // Clear previous selection:
      if (this.selectedIndex !== -1 && divs.length > this.selectedIndex) {
        $(divs.get(this.selectedIndex)).removeClass();
      }
      this.selectedIndex = index;
      if (this.selectedIndex !== -1 && divs.length > this.selectedIndex) {
        activeItem = divs.get(this.selectedIndex);
        $(activeItem).addClass('selected');
      }
      return activeItem;
    },

    deactivate: function(div, index) {
      var divs, activeItem;
      divs = this.container.children();
      div.className = '';
      if (this.selectedIndex === index) { activeItem = divs.get(this.selectedIndex);
      $(activeItem).removeClass('selected'); this.selectedIndex = -1; }
    },

    select: function(i) {
      var selectedValue, f;
      selectedValue = this.suggestions[i];
      if (selectedValue) {
        this.el.val(selectedValue);
        if (this.options.autoSubmit) {
          f = this.el.parents('form');
          if (f.length > 0) { f.get(0).submit(); }
        }
        this.ignoreValueChange = true;
        this.hide();
        if(typeof this.onSelect == "function"){
          this.onSelect(i);
        }
        
      }
    },

    moveUp: function() {
      if (this.selectedIndex === -1) { return; }
      if (this.selectedIndex === 0) {
        this.container.children().get(0).className = '';
        this.selectedIndex = -1;
        this.el.val(this.currentValue);
        return;
      }
      this.adjustScroll(this.selectedIndex - 1);
      let child = this.container[0].childNodes;
      child[this.selectedIndex+1].className = '';
    },

    moveDown: function() {
      if (this.selectedIndex === (this.suggestions.length - 1)) { return; }
      this.adjustScroll(this.selectedIndex + 1);
      let child = this.container[0].childNodes;
      if (this.selectedIndex == 0){
        child[this.selectedIndex].className = '';
      } else {
        child[this.selectedIndex-1].className = '';
      }
    },

    adjustScroll: function(i) {
      var activeItem, offsetTop, upperBound, lowerBound;
      activeItem = this.activate(i);
      offsetTop = activeItem.offsetTop;
      upperBound = this.container.scrollTop();
      lowerBound = upperBound + this.options.maxHeight - 25;
      if (offsetTop < upperBound) {
        this.container.scrollTop(offsetTop);
      } else if (offsetTop > lowerBound) {
        this.container.scrollTop(offsetTop - this.options.maxHeight + 25);
      }
      this.el.val(this.getValue(this.suggestions[i]));
    },

    onSelect: function(i) {
      var me, fn, s, d, u, m, im, a, al, ala, als;
      me = this;
      fn = me.options.onSelect;
      s = me.suggestions[i];
      d = me.data[i];
      u = me.uuids[i];
      m = me.mimes[i];
      im = me.imgs[i];
      a = me.alts[i];
      al = me.attLang[i];
      ala = me.attLangAlt[i];
      als = me.attLangSrc[i];
      me.el.val(me.getValue(s));
      me.currentValue = me.getValue(s);
      me.selection = s;

      try {
        if (typeof me.options.setData === 'function') {
          me.options.setData(me.options, {
            sugg : s,
            data : d,
            uuid : u
          });
        }
      } catch (err) {
      }
      
      if ($.isFunction(fn)) { fn(s, d, u, m, im, a, al, ala, als, me.el); }
    },
    
    getValue: function(value){
        var del, currVal, arr, me;
        me = this;
        del = me.options.delimiter;
        if (!del) { return value; }
        currVal = me.currentValue;
        arr = currVal.split(del);
        if (arr.length === 1) { return value; }
        return currVal.substr(0, currVal.length - arr[arr.length - 1].length) + value;
    }

  };

}(jQuery));
