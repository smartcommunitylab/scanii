var AdvancedSearch = {

    init: function () {

        // Map selectors
        this.selectors = {
            parent: '.js-query-operator',
            filter: '.js-query-filter',
            check: '.js-query-check',
            checkLabel: '.js-query-check-label',
            input: '.js-query-input',
            inputLabel: '.js-query-input-label',
            select: '.js-query-select',
            selectLabel: '.js-query-select-label',
            time: '.js-time',
            timeSelect: '.js-time-select',
            dropdownSelect: '.dropdown-select',
            dropdownSelectContainer: '.dropdown-select-wrapper .dropdown-select-selected',
            dropdownSelectAdd: '.dropdown-select .select-item .add',
        };

        // Init time selector
        var timeSelect = $(this.selectors.timeSelect);
        if (timeSelect.length) {
            this.checkTime();
            timeSelect.on('change', {this: this}, function(e) {
                e.data.this.checkTime();
            })
        }

        // Init time selector
        var dropdownSelect = $(this.selectors.dropdownSelect);
        if (dropdownSelect.length) {
            this.dropdownSelect({this: this, select: dropdownSelect});
        }

        // Init if query operator exists on page
        this.parent = $(this.selectors.parent);
        if (this.parent.length) {
            this.filter = $(this.selectors.filter);

            // Listen to changes
            this.parent.on('input', this.selectors.input, {this: this}, this.onChange);
        }
    },

    onChange: function (e) {
        var _this = e.data.this;

        // If last input field has content clone field
        var filters = $(_this.selectors.filter);
        if ($(filters[filters.length-1]).find(_this.selectors.input).val() !== '') _this.clone();

        // If input field (except last input field) has no content: remove it
        filters.each(function(index) {
            var filter = filters[index];
            if ($(filter).find(_this.selectors.input).val() === '' && index !== filters.length-1) {
                _this.remove(index);
            }
        });
    },

    clone: function () {
        // Clone original filter
        var clone = this.filter.clone();

        // Clear input field
        clone.find(this.selectors.input).val('');

        // Get count
        var filters = $(this.selectors.filter);
        var lastFilter = $(filters[filters.length-1]);
        var lastInput = lastFilter.find('.js-query-input');
        var count = parseInt(lastInput.prop('id').match(/\d+/g), 10 ) + 1;

        // Update clone count
        clone.find(this.selectors.check).attr('id', 'queryOperatorCheck' + count);
        clone.find(this.selectors.checkLabel).attr('for', 'queryOperatorCheck' + count);

        clone.find(this.selectors.input).attr('id', 'queryOperatorField' + count);
        clone.find(this.selectors.inputLabel).attr('for', 'queryOperatorField' + count);

        clone.find(this.selectors.select).attr('id', 'queryOperatorSelection' + count);
        clone.find(this.selectors.selectLabel).attr('for', 'queryOperatorSelection' + count);

        // Append clone to parent
        this.parent.append(clone);
    },

    remove: function (index) {
        $(this.selectors.filter)[index].remove();
    },

    checkTime: function () {
        var val = $(this.selectors.timeSelect).val();
        if ( val === "custom") {
            $(this.selectors.time).removeClass('disabled');
        } else {
            $(this.selectors.time).addClass('disabled');
        }
    },

    dropdownSelect: function(data){
        var _this = data.this;
        $(document).on('click', _this.selectors.dropdownSelectAdd,function(e){
            e.preventDefault();
            var self = $(this);
            var val = $(this).data('value');
            val = '<span>'+val+'<a href="#" class="remove"><i class="fa fa-times" aria-hidden="true"></i></a></span>';

            var container = self.closest('.dropdown-select-wrapper').find('.dropdown-select-selected');
            container.append(val);
        });

        $(_this.selectors.dropdownSelectContainer).on('click', 'span .remove', function(e){
            e.preventDefault();
            $(this).closest('span').remove();
        })
    }

};

var Anchor = {

    init: function () {
        $('.js-page-link').on('click', this.scrollToSection);

        $('.table-of-contents a').on('click', this.scrollToTitle);
    },

    scrollToSection: function (e) {
        var index, top;

        e.preventDefault();

        index = $(this).parent().index();

        if($($(this).attr('href'))){
            top = $($(this).attr('href')).position().top + Anchor.getContentOffset();
            if($(this).hasClass('chapter-link')){
                // $('.chapter-toggle').removeClass('open');
                $($(this).attr('href')).addClass('open');
                top = $($(this).attr('href')).position().top + Anchor.getContentOffset();
                TweenMax.to($(window), .5, {scrollTo: top, ease: Expo.easeOut});
            }
        }else{
            top = $('.js-title').eq(index).position().top + Anchor.getContentOffset();
        }


        TweenMax.to($(window), .5, {scrollTo: top, ease: Expo.easeOut});
    },

    scrollToTitle: function (e) {
        e.preventDefault();

        var $title, top;

        $title = $('.title[data-name="'+this.hash.substr(1)+'"]');
        if (!$title.length) return;

        top = $title.position().top + Anchor.getContentOffset();

        TweenMax.to($(window), .5, {scrollTo: top, ease: Expo.easeOut});
    },

    getContentOffset: function () {

        // 20 px extra = spacing
        return $('.content-bar').parents('.content').offset().top - 20;
    }

};

var App = {

    init: function () {

        // $('.no-js').removeClass('no-js');

        MainMenu.init();
        LangMenu.init();
        Anchor.init();
        Toggle.init();
        Selection.init();
        AdvancedSearch.init();
        Autocomplete.init();
        CheckList.init();
        Inbox.init();
        Modals.init();
        ScrollTop.init();
        Feedback.init();

        Plugins.init();
        Forms.init();
        Notification.init();

        // page specific
        FoldScroll.init();
    },

    resize: function () {
        Plugins.resize();
    }

};

var DisclaimerModule = (function () {

    var data;

    var currentElement;

    var setData = function(json_data){
        // console.log(json_data);
        data=json_data;
    }

    // for submitting form
    var checkDisclaimer = function(el, e){

        if(!data){
            return true;
        }

        if(currentElement){
            currentElement = null;
            return true;
        }

        var msValue = $(el).val();
        for (var i = 0; i < data.length; i++) {
            if(msValue==data[i].id || msValue==data[i].code){
                showDisclaimerModal();
                currentElement = el;
                return false;
            }
        }
        return true;

    }

    var closeDialog= function(){
        if(currentElement){
            setTimeout(function() {
                    $(currentElement).focus();
                    $(currentElement).trigger('change');
                return false;
            }, 100);
        }
    }

    function showDisclaimerModal(){
        $('body').addClass('modal-active');
        var modal = "forms-disclaimer-modal";
        var $modal = $('.js-modal-' + modal);
        $modal.addClass('active');
        $('.js-modal-' + modal + ' > div.container > div.modal-content > a.close').focus();
    }

    return {
        setData: setData,
        checkDisclaimer: checkDisclaimer,
        closeDialog: closeDialog,
    };
})();



$(window).resize(function (e) {
    App.resize();
});

$(document).ready(function () {
    App.init();
    $(window).trigger("resize");
});

var Autocomplete = {

    init: function () {

        // Map selectors
        this.selectors = {
            hasAutocomplete: '.js-has-autocomplete',
            autocomplete: '.js-autocomplete',
        };

        if ($(this.selectors.hasAutocomplete).length) {
            $(document).on('click', this.selectors.autocomplete + ' li:not(.autocomplete_title)' , function() {
                var selectedValue = $(this).context.innerText;
                if($(this).parent().parent().siblings('input').length){
                    $(this).parent().parent().siblings('input').val(selectedValue);
                }
                console.log($(this).parent().parent());
                if($(this).parent().parent().siblings('.input-wrapper').find('input')){
                    $(this).parent().parent().siblings('.input-wrapper').find('input').val(selectedValue);
                    $(this).parent().parent().siblings('.input-wrapper').find('input').trigger('change');
                }
            });

            $(document).on('focus', this.selectors.hasAutocomplete, function() {
                $(this).find('.js-autocomplete').removeClass('closed');
                $(this).find('.error').addClass('hidden');
            });

            $(document).on('blur', this.selectors.hasAutocomplete, function() {
                // Timeout so that the click on an item still gets intercepted
                var _this = this;
                setTimeout(function () {
                    $(_this).find('.js-autocomplete').addClass('closed');
                    $(_this).find('.error').removeClass('hidden');
                }, 180);
            });
        }

    }
};

var CheckList = {
    selectors: {
        checkList: '.js-check-list',
        checkListLang: '.js-check-list-lang',
        group: '.js-check-group',
        item: '.js-check-item',
        toggle: '.js-check-toggle',
        activeList: '.js-active-list',
        regionList: '.js-region-list',
        list: '.js-list',
        noResult: '.js-no-result',
        regionSelection: '.js-selection',
        warning: '.js-warning',
        nextEnabler: '[data-next]',
    },

    init: function() {
        this.initActiveList();
        if ($(this.selectors.checkList).length){ this.initChecklist();this.initChecklistGeneric();}
        if ($(this.selectors.checkListLang).length) this.initChecklistLang();
        if ($(this.selectors.nextEnabler).length) this.initNextEnabler();
    },

    initActiveList: function() {
        // On region change update region list
        var _this = this;
        if ($(this.selectors.regionSelection).length && $(this.selectors.regionList).length) {
            $(this.selectors.regionSelection).on('change', 'input', {_this: this}, this.onRegionUpdate);

            $(this.selectors.regionList).on('click', '.js-close', function() {
                var value = $(this).data('value');
                var input = $(_this.selectors.regionSelection).find('input#country-' + value);
                input.prop('checked', false);
                input.change();
            });


            $(this.selectors.regionList).on('keydown', '.js-close', function(e) {
                if(e.keyCode === 13) {
                    var dataValueOfCurrent = $(this).attr('data-value');
                    var indexOfCurrent = -1;
                    var dataValueTemp = '';
                    var elements = $('#regionList ul li');
                    for (var i = 0; i < elements.length; i++) {
                        dataValueTemp = $(elements[i]).find('.js-close').attr('data-value');
                        if (dataValueTemp === dataValueOfCurrent) {
                            indexOfCurrent = i;
                            break;
                        }
                    }
                    var indexTobeFocused = indexOfCurrent;
                    if(indexOfCurrent === elements.length - 1) {
                        indexTobeFocused = indexTobeFocused - 1;
                    }

                    $(this).click();

                    elements = $('#regionList ul li');
                    if(indexTobeFocused !== -1) {
                        $(elements[indexTobeFocused]).find('.js-close').focus();
                    }
                }
            });
        }

        if ($(this.selectors.activeList).length && $(this.selectors.checkList).length) {
            $(this.selectors.activeList).on('click', '.js-close', function() {
                var value = $(this).data('value');
                var input = $(_this.selectors.checkList).find('input#' + value);
                input.prop('checked', false);
                input.change();
            });

            $(this.selectors.activeList).on('keydown', '.js-close', function(e) {
                if(e.keyCode === 13) {
                    var dataValueOfCurrent = $(this).attr('data-value');
                    var indexOfCurrent = -1;
                    var dataValueTemp = '';
                    var elements = $('#ulActiveList li');
                    for (var i = 0; i < elements.length; i++) {
                        dataValueTemp = $(elements[i]).find('.js-close').attr('data-value');
                        if (dataValueTemp === dataValueOfCurrent) {
                            indexOfCurrent = i;
                            break;
                        }
                    }
                    var indexTobeFocused = indexOfCurrent;
                    if(indexOfCurrent === elements.length - 1) {
                        indexTobeFocused = indexTobeFocused - 1;
                    }

                    $(this).click();

                    elements = $('#ulActiveList li');
                    if(indexTobeFocused !== -1) {
                        $(elements[indexTobeFocused]).find('.js-close').focus();
                    }
                }
            });
        }
    },

    initChecklist: function() {
        $(this.selectors.toggle).on('click', {_this: this}, this.onToggle);
        $(this.selectors.item).on('change', {_this: this}, this.onCheckboxChange);
    },

    initChecklistLang: function(customSelector) {
        Notification.init();
        var sel = this.selectors.checkListLang;
        if(customSelector){sel = customSelector}
        $(sel + ' input[type=radio],'+ sel + ' input[type=checkbox]').on('change', function(){
            Notification.show();
        });

    },
    initChecklistGeneric: function(){
        CheckList.initChecklistLang(this.selectors.checkList);
    },
    onToggle: function(e) {
        var _this = e.data._this;
        var group = $(this).closest(_this.selectors.group);
        group.siblings(_this.selectors.group).addClass('collapsed');
        group.find(_this.selectors.group).addClass('collapsed');
        group.toggleClass('collapsed');
    },

    onCheckboxChange: function(e) {


        var _this = e ? e.data._this : this;
        var checked = $(this).find('input').is(':checked');

        // Check / uncheck all children
        if ($(this).parent().hasClass(_this.selectors.group.replace('.', ''))) {
            var children = $(this).parent().find(_this.selectors.item);
            children.each(function(item) {
                $(children[item]).find('input').prop('checked', checked)
            });
        }

        // Check / uncheck parent if all children in group are checked / unchecked
        var groups = $(_this.selectors.checkList).find(_this.selectors.group);
        var list = [];
        // Loop over every group (in reverse)
        $(groups.get().reverse()).each(function() {

            var children = $(this).find('input');
            var allTrue = true;

            // Loop over every child of group (in reverse)
            // Loop over every child of group (in reverse)
            if (children.length == 1) {
                allTrue = false;
                return false;
            } else {
                $(children.get().reverse()).each(function (item) {
                    if (item !== 0) {
                        // Check if every value is true. If it fails once immediately stop loop
                        if (!$(children[item]).prop('checked')) {
                            allTrue = false;
                            return false;
                        }
                    }

                });
            }

            // Check parent if all is checked inside group
            if (allTrue) {
                $($(this).find('input')[0]).prop('checked', true);
            } else {
                $($(this).find('input')[0]).prop('checked', false);
            }
        });

        // Loop again over all items to get the checked items in the correct order
        var checked = $(_this.selectors.checkList).find('input:checked');
        checked.each(function(i) {
            if ($(checked[i]).prop('checked')) {
                var shortcode = $(checked[i]).val();
                var value = $(checked[i]).siblings('label').find('.text')[0].innerText;
                list.push({
                    'shortcode': shortcode,
                    'value': value
                });
            }
        });

        _this.updateList(list);

        Notification.show()

    },

    onRegionUpdate: function(e) {
        var _this = e.data._this;

        // Get all active checkboxxes
        var checked = $(_this.selectors.regionSelection).find('input:checked');

        var regions = [];
        checked.each(function(i) {
            var shortcode = $(checked[i]).val();
            var value = $(checked[i]).parent().find('label')[0].innerText;
            regions.push({
                'shortcode': shortcode,
                'value': value
            });
        });
        _this.updateList(regions, true);
    },

    updateList: function(list, region) {
        var $parent = region ? $(this.selectors.regionList) : $(this.selectors.activeList);

        var $noResult = $parent.find(this.selectors.noResult);
        var $list = $parent.find(this.selectors.list);

        if (list.length) {
            $noResult.addClass('hidden');
        } else {
            $noResult.removeClass('hidden');
        }

        $list.empty();

        for (var i = 0; i < list.length; i++) {

            var close = '<span class="close js-close" tabindex="0" data-value="' + list[i].shortcode + '"></span></li>';

            if (region) {
                $list.append('<li><span class="country-label">' +
                    '<span class="flag flag-big flag-' + list[i].shortcode + '">' +
                    list[i].value +
                    '</span>' +
                    '</span>' + close);
            } else {
                $list.append('<li><span>' + list[i].value + '</span>' + close);
            }
        }

        if (list.length >= 50) {
            $(this.selectors.warning).removeClass('hidden');
        } else {
            $(this.selectors.warning).addClass('hidden');
        }
    },
    initNextEnabler: function(){
        $('[data-next]').on('change', function(e){
            console.log($(this).data('next'));
            $('.button-next').attr('href', $(this).data('next'));
            $('.button-next').attr('disabled', false);
        })
    }
};

var Feedback = {
    init: function() {
        $feedback = $(".js-feedback");
        if ($feedback.length) {
            $feedback.on('click', '.feedback_top', function(e) {
                $feedback.addClass('open');
            });

            $feedback.on('click', '.js-close', function(e) {
                e.preventDefault();
                $feedback.hide();
            });
        }
    }
};

var FoldScroll = {

    $foldScroll: null,
    $foldScrollSkip: null,
    $elements: null,

    init: function () {
        var $home = $('.content.home-page');

        // break if not on home page
        if (!$home.length) return;

        this.initElements();
    },

    initElements: function () {

        var $body = $('body');

        this.$foldScroll = $('<div />', {'class': 'fold-scroll'});
        this.$foldScrollSkip = $('<div />', {'class': 'fold-scroll-skip'});
        this.$elements = FoldScroll.$foldScroll.add(FoldScroll.$foldScrollSkip);

        $body.append(this.$elements);

        // event listeners
        $(window).on('scroll', this.scrollHandler);
        $(window).trigger('scroll');
        //
        this.$foldScrollSkip.on('click', this.skipClickedHandler)
    },

    scrollHandler: function () {

        var $win, scrollTop, winHeight;

        $win = $(window);
        scrollTop = $win.scrollTop();
        winHeight = $win.height();

        FoldScroll.$elements['fade' + ((scrollTop >= winHeight / 2) ? 'Out' : 'In')]();
    },

    skipClickedHandler: function () {

        var $win, winHeight;

        $win = $(window);
        winHeight = $win.height();

        TweenMax.to($win, .5, {scrollTo: winHeight / 2, ease: Expo.easeOut});
    }

};

var Forms = {

    init: function () {

        $('form.reset').each(function(i,el){
            el.reset();
        });

        _this = {};
        _this.$inputs = $('.show-next-element');
        _this.$inputNumber = 1;

        if (_this.$inputs.length) {
            _this.$inputs.hide();
            Forms.showInput(_this.$inputNumber)
        }

        if($('form.dynamic-form').length){
            Forms.initAdvancedForms();
        }

        /* If this needs to be implemented via input/select click */
        if(_this.$inputs.length){
            _this.$inputs.on('change',  'input, select',function(e){
                $(e.delegateTarget.getAttribute('data-show')).show();
            })
        }

        $('[data-change="changeBtnText"]').on('change', function(){
            $('.show-next-element-button').html('Search');
        });

        $('input[type="file"]').on('change', Forms.showFilename);
        $('span.filename').on('click',  Forms.removeFile);

        /* If this needs to be implemented via button click */
        // _this.$nextButton = $('.show-next-element-button');
        // if(_this.$nextButton.length){
        //   _this.$nextButton.on('click', function(e){
        //     e.preventDefault();
        //     Forms.showInput(_this.$inputNumber)
        //     _this.$inputNumber++;
        //   })
        // }


    },
    showInput: function($number) {
        _this.$inputs.filter(':nth-child('+$number+')').show();
    },

    initAdvancedForms: function(){
        $('.advanced-forms-step').hide();
        $('#advanced-forms-step-1').show();

        //Specific for frit page
        $('#advanced-forms-step-1 .country input').on('change', function(e){

            $('ul.step-menu li:nth-child(1) a').find('.flag').remove();
            $('ul.step-menu li:nth-child(1) a').append('<div class="flag flag-'+$(this).val()+'"></div>');

            $('#advanced-forms-step-2').show();
            var offsetTop = parseInt($('#advanced-forms-step-2')[0].getBoundingClientRect().top);
            offsetTop -= 20;
            TweenMax.to($(window), 1, {scrollTo: '+= '+offsetTop, ease: Expo.easeInOut});
            Forms.setStep(2);
        });

        var steps = $('.step-menu li').length;
        for (var i = 1; i <= steps; i++) {
            (function(i){
                $('#advanced-forms-step-'+i+' div:not(".country") input').on('change', function(e){
                    Forms.setStep(i, true);
                    Forms.setStep(i+1);
                })
            })(i)
        }


        $('input[data-show*="#advanced-forms"]').on('change', function(e){
            var showEl = $(this).data('show');
            $(showEl).show();
            var offsetTop = parseInt($(showEl)[0].getBoundingClientRect().top);
            offsetTop -= 20;
            TweenMax.to($(window), 1, {scrollTo: '+= '+offsetTop, ease: Expo.easeOut});
        });

        $('.button[data-show*="#advanced-forms"]').on('click', function(e){
            console.log('test');
            $('.advanced-forms-step').hide();
            var showEl = $(this).data('show');
            $(showEl).show();
            var offsetTop = parseInt($(showEl)[0].getBoundingClientRect().top);
            offsetTop -= 20;
            TweenMax.to($(window), 1, {scrollTo: '+= '+offsetTop, ease: Expo.easeOut});
            Forms.setStep(parseInt($(this).data('step'))-1, true);
            Forms.setStep($(this).data('step'));
        })
    },
    activeStep: 0,
    setStep: function(nr, setValid){
        /*
        ED: disable this functionality this should be done only on submit

        if(setValid){
            $('ul.step-menu li:nth-child('+nr+') a').append('<div class="validated"></div>')
        }else{
            if(nr >= Forms.activeStep){
                Forms.activeStep = nr;
                $('ul.step-menu li').removeClass('active')
                $('ul.step-menu li:nth-child('+nr+')').addClass('active')
            }
        }*/
    },
    showFilename: function(e){
        var self = $(this);
        var name = self.val().split('\\').pop();
        console.log(name);
        if(name){
            self.siblings('.filename').show();
            self.siblings('.filename').find('.text').html(name);
        }
    },
    removeFile: function(e){
        var self = $(this);
        var fileInput = self.siblings('input[type="file"]');
        console.log(fileInput.val().split('\\').pop());
        fileInput.wrap('<form>').closest('form').get(0).reset();
        fileInput.unwrap();

        self.find('.text').empty();
        self.hide();
    },

};
var Inbox = {

    init: function () {
        this.$parent = $('.js-inbox');

        if (this.$parent.length) {

            this.$sidebar = $('.js-sidebar');
            this.$link = $('.js-mail-link');
            this.$mail = $('.js-mail');
            this.$back = $('.js-back');
            this.$toggle = $('.filter.js-toggle');

            var _this = this;

            _this.unMatchMobile();
            enquire.register('(max-width:47.9rem)', {
                match: function() {
                    _this.matchMobile();
                },
                unmatch: function() {
                    _this.unMatchMobile();
                }
            });

            $('body').on('click', function(e) {
                if (!$(e.target).parents('.filter.js-toggle').length) {
                    _this.$toggle.removeClass('open');
                }
            });
        }
    },
    calculateSidebarSize: function() {
        var sidebar = this.$sidebar.find('.mails');
        var sidebarHeight = sidebar.height();
        var diff = (this.$sidebar.height() - sidebarHeight );
        sidebar.height( this.$mail.height() );
    },
    matchMobile: function() {
        var _this = this;

        // Hide mail on mobile
        _this.$mail.hide();
        _this.$sidebar.show();

        // On link click
        _this.$link.on('click', function(e) {
            e.preventDefault();
            _this.$sidebar.hide();
            _this.$mail.show();
        });

        _this.$back.on('click', function(e) {
            _this.$sidebar.show();
            _this.$mail.hide();
        });

        // Stop listening to resize
        $(window).off('resize');

    },
    unMatchMobile: function() {
        var _this = this;

        // Show mail on desktop
        _this.$mail.show();

        // Stop listening on click events
        _this.$link.off('click');
        _this.$back.off('click');

        // On resize
        $(window).on('resize', function() {
            _this.calculateSidebarSize();
        });
    }
};

var LangMenu = {

    init : function() {
        var _this = this;

        if (!$('.js-lang-warning').length) return;

        enquire.register('(max-width:47.9rem)', {
            match: function () {
                _this.build.call(_this);
            },
            unmatch: function () {
                _this.unbuild.call(_this);
            }
        });
    },

    build: function () {

        // attach all event listeners
        $('.js-lang-warning .lang-swap').on('click', this.showLangMenu);
        $('.js-lang-warning .lang-list li').on('click', this.langSelected);

        this.initSwipe();
    },

    unbuild: function () {

        // remove all event listeners
        $('.js-lang-warning .lang-swap').off('click');
        $('.js-lang-warning .lang-list li').off('click');

        $('.js-lang-warning .lang-swap').hammer().unbind('pan');

        // quick fix to remove styling set by JS
        $('.js-lang-warning').removeAttr('style');
        $('.js-lang-warning .lang-swap').removeAttr('style');
        $('.js-lang-warning .lang-list').removeAttr('style');
        $('.js-lang-warning .lang-list li').removeAttr('style');
    },

    initSwipe : function() {

        $('.js-lang-warning .lang-swap').hammer().unbind('pan');
        $('.js-lang-warning .lang-swap').hammer().bind('pan', function(ev) {

            var pos = $(this).position().left;
            pos = pos+(ev.gesture.deltaX/10);

            $(this).css({'left':pos});

            if ( ev.gesture.isFinal ) {
                if ( Math.abs(ev.gesture.deltaX) > 75 ) {
                    LangMenu.showLangMenu();
                } else {
                    TweenMax.to($('.js-lang-warning .lang-swap'), .4, {left:'auto',force3D: true, ease:"easeOutExpo", overwrite:1});
                }
            }
        });

    },

    showLangMenu : function() {

        TweenMax.to($('.js-lang-warning .lang-swap'), .4, {left:0,force3D: true, ease:"easeOutExpo", overwrite:1});

        $('.js-lang-warning .lang-list').show();

        $('.js-lang-warning .lang-list li').each(function(e){

            TweenMax.to($(this), .3, { opacity:1, scale:1, ease:Expo.easeOut, delay:$(this).index()*0.03, force3D:true});
            TweenMax.to($('.js-lang-warning'), .3, { height: $('.js-lang-warning .lang-list').outerHeight(), ease:Expo.easeOut, force3D:true });
            TweenMax.to($('.js-lang-warning .lang-list'), .1, { opacity: 1, ease:Expo.easeOut, force3D:true });

        });

    },

    langSelected : function() {

        $('.js-lang-warning .lang-swap span').html($(this).html());

        $('.js-lang-warning .lang-list li').removeClass('active');
        $(this).addClass('active');

        TweenMax.to($('.js-lang-warning .lang-swap'), .4, {left:'auto',force3D: true, ease:"easeOutExpo", overwrite:1});

        $('.js-lang-warning .lang-list li').each(function(e){

            TweenMax.to($(this), .2, { opacity:0, scale:.6, ease:Expo.easeOut, delay:$(this).index()*0.03, force3D:true});
            TweenMax.to($('.js-lang-warning'), .3, { height: 'auto', ease:Sine.easeOut, force3D:true });
            TweenMax.to($('.js-lang-warning .lang-list'), .3, { opacity: 0, ease:Sine.easeIn, force3D:true, onComplete:function(){ $('.js-lang-warning .lang-list').hide(); } });

        });

    }

};

var LangSelectDetail = {
    init: function() {
        var $content = $('.lang-select-detail .pageTitle');
        var $title = $('.intro-header .title-block > h1');

        // break if langSelectDetail box is not present
        if (!$content.length || !$title.length) return;

        $content.text($title.text());
    }
};
var x  = document.querySelector("body > div.content-home.home-page > div.menu-blocks.center.no-overflow");
var MainMenu = {

    previousScrollTop: null,

    init: function () {

        // toggle button links
        $('.menu-block .menu-toggle').on('click', this.setMenuActive);
        $('.overlay').on('click', this.hideAllMenus);

            $(".menu-block").on("keyup", ".show-more", function (event) {
                if (event.keyCode == 13) {
                    $(this).trigger('click');
                    let menu = $(this).parent().parent().parent().find("li > a");
                    menu[0].focus();
                }
                if (event.keyCode == 27) {
                    $('.overlay').trigger('click');
                    for (let i=0; i<x.childElementCount-1; i++) {
                        if (document.activeElement == x.children[i].children[0].children[1].children[1]) {
                            x.children[i].children[0].children[1].children[0].focus();
                            MainMenu.hideAllMenus();
                        }
                        }
                    }

            });

        $(".menu-block").on("keyup", ".show-less", function (event) {
            if (event.keyCode == 13) {
                    $('.overlay').trigger('click');
                    for (let i=0; i<x.childElementCount-1; i++) {
                        if (document.activeElement == x.children[i].children[0].children[1].children[1]) {
                            x.children[i].children[0].children[1].children[0].focus();
                            MainMenu.hideAllMenus();
                        }
                    }
                }

            });



        // main navigation menu toggle
        $('.menu-btn').on('click', this.toggleMenu);

        // main navigation menu blocks
        $('.full-menu .menu-block > .title > span:last-child').on('click', this.showMenuList);
        $('.full-menu .menu-block > ul > li > a.has-children > span:last-child').on('click', this.filterMenuList);

        var $lastMenuBlock;
        $lastMenuBlock = $('.full-menu .menu-block:last-child');
        if($($lastMenuBlock).find('.title').hasClass('has-content')) {
            $($lastMenuBlock).find('.title > span > .expandInsideList').on('keydown', function(e) {
                if (e.keyCode == 9) {
                    if (!$(this).parents('.menu-block').hasClass('active')) {
                        e.preventDefault();
                        $('.menu-btn').focus();
                    }
                }
            });
            var $lastMenuBlockLastLi = $($lastMenuBlock).children('ul:first').children('li:last');
            if($($lastMenuBlockLastLi).children('a:first').hasClass('has-content')) {
                $($lastMenuBlockLastLi).children('a:first').on('keydown', function (e) {
                    if (e.keyCode == 9) {
                        if (!$lastMenuBlockLastLi.hasClass('active')) {
                            e.preventDefault();
                            $('.menu-btn').focus();
                        }
                    }
                });
            } else {
                $($lastMenuBlockLastLi).children('a:first').on('keydown', function (e) {
                    if (e.keyCode == 9) {
                        e.preventDefault();
                        $('.menu-btn').focus();
                    }
                });
            }
        } else {
            $($lastMenuBlock).find('.title').on('keydown', function(e) {
                if (e.keyCode == 9) {
                    e.preventDefault();
                    $('.menu-btn').focus();
                }
            });
        }
    },

    setMenuActive: function () {

        var $menuBlock, $window;

        $menuBlock = $(this).parents('.menu-block');
        $window = $(window);

        if ($menuBlock.hasClass('active')) {
            $menuBlock.removeClass('active');
             let sh =  $menuBlock.find("span");
             if(sh.length>0){
                 sh[0].setAttribute("tabindex", "0");
                 sh[0].focus();
                 sh[0].setAttribute("tabindex", "-1");
             }
            $('.overlay').hide();
        } else {

            // set classes
            $('.menu-block').removeClass('active');

            $menuBlock.addClass('active');
            let om = $menuBlock.find("ul > li > a");
            if (om.length>0){
                om[0].focus();
            }
            $('.overlay').show();
            // store previous
            MainMenu.previousScrollTop = $window.scrollTop();

            // animate to new scrollTop
            var viewportTop = $window.scrollTop();
            var viewportHeight = $window.height();
            var viewportBottom = viewportTop + viewportHeight;
            var elementTop = $menuBlock.offset().top;
            var elementHeight = $menuBlock.find('.expand').outerHeight();
            var elementBottom = elementTop + elementHeight;
            var scrollDown = viewportTop + elementBottom - viewportBottom + 30;
            if (elementTop > viewportTop && elementBottom < viewportBottom) {
                return;
            } else if (elementBottom > viewportBottom) {        //Do nothing, only care for top visible
                //Scroll until element bottom visible
                //TweenMax.to($window, .5, {scrollTo:scrollDown, ease: Expo.easeOut});
                return;
            } else if (elementTop < viewportTop || elementHeight > viewportHeight) {
                //Scroll until element top visible
                TweenMax.to($window, .5, {scrollTo: elementTop-30, ease: Expo.easeOut});
                return;
            }
        }
    },

    hideAllMenus: function () {

        $('.menu-block').removeClass('active');
        $('.overlay').hide();

        //
        if (MainMenu.previousScrollTop) {
            TweenMax.to($(window), .5, {scrollTo: MainMenu.previousScrollTop, ease: Expo.easeOut});
        }
    },

    toggleMenu: function () {

        if ($(this).hasClass('active')) {
            $(".full-menu > .menu-blocks > .menu-block > .filter > .active").removeClass("active")
            $(".full-menu > .menu-blocks > .menu-block > .filter").removeClass("filter")
            $(".full-menu > .menu-blocks > .menu-block").removeClass("active")
            $(this).removeClass('active');
            $('.full-menu').hide();
        } else {
            $(this).addClass('active');
            $('.full-menu').show();
            var pos = $(this).position().top + 32;
            TweenMax.to($(window), .5, {scrollTo: pos, ease: Expo.easeOut});
        }

    },

    showMenuList: function (e) {
        e.preventDefault();

        var $menuBlock = $(this).parents('.menu-block');

        $menuBlock.siblings().removeClass('active');
        $menuBlock.toggleClass('active');
    },

    filterMenuList: function (e) {
        e.preventDefault();

        var $li = $(this).closest('li');

        //
        $li.siblings().removeClass('active');
        $li.toggleClass('active');

        // set filter state
        $(this).closest('ul')[(($li.hasClass('active')) ? 'add' : 'remove') + 'Class']('filter');
    }

};

var Modals = {

    init: function init() {
        this.$select = $('.js-open-modal');
        this.$close = $('.js-close-modal');

        if (this.$select.length) {
            this.$select.on('click', function(e) {
                if(!$(this).data('allow-action')){
                    e.preventDefault();
                }
                $('body').addClass('modal-active');
                var modal = $(this).data('modal');
                var $modal = $('.js-modal-' + modal);
                $modal.addClass('active');
                if(modal === 'popup-modal') {
                    var $close = $modal.find('.container .modal-content .js-close-modal')[0];
                    $close.focus();
                    $($close).on('keydown', function (e) {
                        if(e.keyCode === 9) {
                            e.preventDefault();
                        }
                        if(e.keyCode === 27) {
                            $(this).click();
                        }
                    })
                }
            });
            this.$select.on('keydown', function(e) {
                if (e.keyCode === 13 || e.keyCode === 32){
                    if (navigator.userAgent.search("Firefox") > 0){
                        this.click();
                    } else {
                        $(this).trigger('click');
                    }
                    let formModal = $('.modal.small.active')[0];
                    if ($(formModal).find(':input')[0]) {
                        $(formModal).find(':input')[0].focus();
                    } else {
                        $('.lang').find('a')[0].focus();
                        e.preventDefault();
                    }
                }
            });
            this.$select.on("click", function(e){
                let formModal = $('.modal.small.active')[0];
                if ($(formModal).find(':input')[0]) {
                    $(formModal).find(':input')[0].focus();
                } else {
                    $('.lang').find('a')[0].focus();
                }
            });
            if (window.location.href.indexOf("init=true&action=home&plang") > -1) {
                $('#re-focus').focus();
            }

            // Handle modal for select option
            $(this.$select).each(function() {
                if($(this).is( "option" )){
                    $(this).parent().change(function(e) {
                        var select = e.target;
                        var option = select.options[select.selectedIndex];
                        if ($(option).hasClass('js-open-modal')) {
                            if(!$(option).data('allow-action')){
                                e.preventDefault();
                            }
                            $('body').addClass('modal-active');
                            var modal = $(option).data('modal');
                            var $modal = $('.js-modal-' + modal);
                            $modal.addClass('active');
                        }
                    });
                }
            });

            if (this.$close.length) {
                this.$close.on('click', function(e) {
                    e.preventDefault();

                    $('body').removeClass('modal-active');
                    var modal = $(this).data('modal-close') || $(this).data('modal') ;
                    var $modal = $('.js-modal-' + modal);
                    $modal.removeClass('active');
                    if($('a.js-open-modal[data-modal=' + modal).length > 0) {
                        $('a.js-open-modal[data-modal=' + modal).focus();
                    }
                    var moduleStr = $(this).data('module');
                    var callbackStr = $(this).data('callback');
                    if(moduleStr && callbackStr){
                        var module = window[moduleStr];
                        if(module && typeof module[callbackStr]==="function"){
                            module[callbackStr].apply(null);
                        }
                    }
                });
                this.$close.on('keydown', function(e) {
                    if (e.keyCode === 13){
                        $(this).trigger('click');
                    }
                });

                this.$close.on('click', function(e) {
                    var modal = $(this).data('modal-close') || $(this).data('modal') ;
                    let charterClickModal = $('body').find('.charter-span-modal')[0];
                    if(modal === 'lang' && modal !== 'forms-disclaimer-modal'){
                        $('#re-focus-div').attr("tabindex", "0");
                        $("#re-focus-div").focus();
                        $('#re-focus-div').removeAttr("tabindex");
                    }else if(charterClickModal != null){
                        setTimeout(
                            function() {
                                $(charterClickModal).focus();
                            }, 200);
                    }
                });
            }
        }

        this.$select = $('.js-add-nomodal');

        if (this.$select.length) {
            this.$select.on('click', function (e) {
                if (!$(this).data('allow-action')) {
                    e.preventDefault();
                }
                var modal = $(this).data('select');
                var form = $(this).data('form');
                var $modal = $('#' + modal);
                var $form = $('#' + form);
                $modal.attr('checked', true);
                $modal.prop('checked', true);
                $form.submit();
            });
            this.$select.on('keyup', function (e) {
                if (navigator.userAgent.search("Chrome") < 0){
                    if (e.keyCode === 13){
                        $(this).trigger('click');
                    }
                }
            });
        }

        $(document).ready(function() {
            if ($('#modal-info-message').length > 0) {
                if($('#modal-info-message').hasClass('active')) {
                    $('#modal-info-message .js-close-modal').focus();
                }

                $('#modal-info-message .js-close-modal').keydown(function (e) {
                    if(e.keyCode === 9) {
                        e.preventDefault();
                    }
                    if(e.keyCode === 27) {
                        $(this).click();
                    }
                });
            }
        });
    }
};

var Notification = {
    text: 'Your changes have been saved',
    show: function(text, duration){
        var text = text || Notification.text;
        var duration = duration || 3000;
        if($('.notification').length){
            $('.notification').stop().html(text).fadeIn(200).delay(duration).fadeOut(200);
        }
    },
    init: function(){
        Notification.text = $('.notification').html();

        $('.notification').on('click', function(e){
            $(this).stop().fadeOut(200);
        })
    }
};
var Plugins = {

    init: function () {

        this.initSlider();
        this.initSticky();

        var el = $('.draggable .js-list')[0];
        if (el) var sortable = Sortable.create(el);

        if($('.construction-overlay.active')[0]){
            Plugins.initConstructionOverlay();
        }
    },

    initSlider: function () {
        var $slider, numChildren;

        $slider = $('.partnerships ul.partners');
        numChildren = $slider.children().length;

        $slider.slick({
            dots: true,
            arrows: false,
            mobileFirst: true,
            autoplay: true,
            infinite: true
        });

        // pause on last slide
        // $slider.on('afterChange', function(event, slick, currentSlide) {
        //     if (currentSlide == numChildren - 1) slick.slickPause();
        // });
    },

    initSticky: function () {
        var $stickyStuff = $('.lang-select-detail, .sticky-sidebar');
        var $stickySidebar = $('.sticky-sidebar');

        // break if not available
        if (!$stickyStuff.length) return;

        if($stickyStuff.length){

            enquire.register('(min-width:48rem)', {

                match : function() {
                    $stickyStuff.sticky({
                        topSpacing: 25,
                        bottomSpacing: $('footer').height() + 25
                    });
                },

                unmatch : function() {
                    $stickyStuff.unstick();
                }

            })
        }

        var $stickyTop = 0;
        var $SBisSticky = false;
        var $SBisUnStickedBottom = true;
        if($stickySidebar.length){
            var $stickySidebar = $('.sidebar');
            enquire.register('(max-width:48rem)', {
                match: function(){
                    $(window).on('scroll', function(e){
                        var scrollPos = $(window).scrollTop();
                        var sidebartop = $stickySidebar.offset().top;
                        var bottomSpacing= $('footer').height() + 25;
                        var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
                        if(scrollPos>sidebartop && !$SBisSticky){

                            $SBisSticky = true;
                            $stickyTop = sidebartop;
                            $stickySidebar.addClass('sticks');

                        }else if(scrollPos< $stickyTop && $SBisSticky){
                            $SBisSticky = false;
                            $stickyTop = 0;
                            $stickySidebar.removeClass('sticks');

                        }else if(scrollBottom < bottomSpacing){
                            $SBisUnStickedBottom = false;
                            // $stickySidebar.removeClass('sticks');
                        }
                    })
                },
                unmatch: function(){
                    $(window).off('scroll')
                }
            })
        }

    },
    initConstructionOverlay: function(){
        var redirectTimer;
        (function(){
            var seconds = 10;
            var timer = $('.construction-overlay .time-remaining')[0];
            redirectTimer = setInterval(function(){
                seconds--;
                timer.innerHTML = seconds;
                if(seconds == 0){
                    //window.location = './';
                    var href = $('.button.big.dark.pull-right.main').attr('href');
                    window.location.href = href;
                    clearInterval(redirectTimer);
                }
            }, 1000)
        })();
        $('.construction-overlay .button.cancel').on('click', function (){
            var overlay = document.querySelectorAll('.construction-overlay')[0];
            overlay.className = overlay.className.replace('active', '');
            clearInterval(redirectTimer);
        })
    },
    resize: function () {
        $('.lang-select-detail').sticky('update');
    }

};

/* input type date polyfill */
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}n(84);var o=n(41),i=r(o),a=function(){i["default"].addPickerToOtherInputs(),i["default"].supportsDateInput()||i["default"].addPickerToDateInputs()};a(),document.addEventListener("DOMContentLoaded",function(){a()}),document.querySelector("body").addEventListener("mousedown",function(){a()})},function(t,e,n){t.exports=!n(11)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(9),o=n(32),i=n(25),a=Object.defineProperty;e.f=n(1)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return a(t,e,n)}catch(u){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(59),o=n(16);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(4),o=n(14);t.exports=n(1)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(23)("wks"),o=n(15),i=n(2).Symbol,a="function"==typeof i,u=t.exports=function(t){return r[t]||(r[t]=a&&i[t]||(a?i:o)("Symbol."+t))};u.store=r},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(12);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(2),o=n(8),i=n(56),a=n(6),u="prototype",s=function(t,e,n){var c,l,f,d=t&s.F,p=t&s.G,h=t&s.S,y=t&s.P,m=t&s.B,v=t&s.W,b=p?o:o[e]||(o[e]={}),g=b[u],x=p?r:h?r[e]:(r[e]||{})[u];p&&(n=e);for(c in n)l=!d&&x&&void 0!==x[c],l&&c in b||(f=l?x[c]:n[c],b[c]=p&&"function"!=typeof x[c]?n[c]:m&&l?i(f,r):v&&x[c]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[u]=t[u],e}(f):y&&"function"==typeof f?i(Function.call,f):f,y&&((b.virtual||(b.virtual={}))[c]=f,t&s.R&&g&&!g[c]&&a(g,c,f)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(38),o=n(17);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){t.exports={}},function(t,e){t.exports=!0},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(4).f,o=n(3),i=n(7)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(23)("keys"),o=n(15);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(2),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(12);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(2),o=n(8),i=n(19),a=n(27),u=n(4).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||u(e,t,{value:a.f(t)})}},function(t,e,n){e.f=n(7)},function(t,e){"use strict";e.__esModule=!0,e["default"]=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var o=n(45),i=r(o);e["default"]=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,i["default"])(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}()},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(12),o=n(2).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){t.exports=!n(1)&&!n(11)(function(){return 7!=Object.defineProperty(n(31)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){"use strict";var r=n(19),o=n(10),i=n(39),a=n(6),u=n(3),s=n(18),c=n(61),l=n(21),f=n(67),d=n(7)("iterator"),p=!([].keys&&"next"in[].keys()),h="@@iterator",y="keys",m="values",v=function(){return this};t.exports=function(t,e,n,b,g,x,M){c(n,e,b);var w,S,O,D=function(t){if(!p&&t in k)return k[t];switch(t){case y:return function(){return new n(this,t)};case m:return function(){return new n(this,t)}}return function(){return new n(this,t)}},T=e+" Iterator",_=g==m,A=!1,k=t.prototype,E=k[d]||k[h]||g&&k[g],j=E||D(g),C=g?_?D("entries"):j:void 0,N="Array"==e?k.entries||E:E;if(N&&(O=f(N.call(new t)),O!==Object.prototype&&(l(O,T,!0),r||u(O,d)||a(O,d,v))),_&&E&&E.name!==m&&(A=!0,j=function(){return E.call(this)}),r&&!M||!p&&!A&&k[d]||a(k,d,j),s[e]=j,s[T]=v,g)if(w={values:_?j:D(m),keys:x?j:D(y),entries:C},M)for(S in w)S in k||i(k,S,w[S]);else o(o.P+o.F*(p||A),e,w);return w}},function(t,e,n){var r=n(9),o=n(35),i=n(17),a=n(22)("IE_PROTO"),u=function(){},s="prototype",c=function(){var t,e=n(31)("iframe"),r=i.length,o="<",a=">";for(e.style.display="none",n(58).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(o+"script"+a+"document.F=Object"+o+"/script"+a),t.close(),c=t.F;r--;)delete c[s][i[r]];return c()};t.exports=Object.create||function(t,e){var n;return null!==t?(u[s]=r(t),n=new u,u[s]=null,n[a]=t):n=c(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(4),o=n(9),i=n(13);t.exports=n(1)?Object.defineProperties:function(t,e){o(t);for(var n,a=i(e),u=a.length,s=0;u>s;)r.f(t,n=a[s++],e[n]);return t}},function(t,e,n){var r=n(38),o=n(17).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(3),o=n(5),i=n(55)(!1),a=n(22)("IE_PROTO");t.exports=function(t,e){var n,u=o(t),s=0,c=[];for(n in u)n!=a&&r(u,n)&&c.push(n);for(;e.length>s;)r(u,n=e[s++])&&(~i(c,n)||c.push(n));return c}},function(t,e,n){t.exports=n(6)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t}function i(t){var e=new Date(t.getFullYear(),t.getMonth(),t.getDate());e.setDate(e.getDate()-(e.getDay()+6)%7+3);var n=new Date(e.getFullYear(),0,4);n.setDate(n.getDate()-(n.getDay()+6)%7+3);var r=e.getTimezoneOffset()-n.getTimezoneOffset();e.setHours(e.getHours()-r);var o=(e-n)/6048e5;return 1+Math.floor(o)}function a(t){var e=t.getDay();return 0===e&&(e=7),e}function u(t){return null===t?"null":void 0===t?"undefined":"object"!==("undefined"==typeof t?"undefined":(0,c["default"])(t))?"undefined"==typeof t?"undefined":(0,c["default"])(t):Array.isArray(t)?"array":{}.toString.call(t).slice(8,-1).toLowerCase()}Object.defineProperty(e,"__esModule",{value:!0});var s=n(48),c=r(s),l=function(){var t=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g,e=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,n=/[^-+\dA-Z]/g;return function(r,s,c,f){if(1!==arguments.length||"string"!==u(r)||/\d/.test(r)||(s=r,r=void 0),r=r||new Date,r instanceof Date||(r=new Date(r)),isNaN(r))throw TypeError("Invalid date");s=String(l.masks[s]||s||l.masks["default"]);var d=s.slice(0,4);"UTC:"!==d&&"GMT:"!==d||(s=s.slice(4),c=!0,"GMT:"===d&&(f=!0));var p=c?"getUTC":"get",h=r[p+"Date"](),y=r[p+"Day"](),m=r[p+"Month"](),v=r[p+"FullYear"](),b=r[p+"Hours"](),g=r[p+"Minutes"](),x=r[p+"Seconds"](),M=r[p+"Milliseconds"](),w=c?0:r.getTimezoneOffset(),S=i(r),O=a(r),D={d:h,dd:o(h),ddd:l.i18n.dayNames[y],dddd:l.i18n.dayNames[y+7],m:m+1,mm:o(m+1),mmm:l.i18n.monthNames[m],mmmm:l.i18n.monthNames[m+12],yy:String(v).slice(2),yyyy:v,h:b%12||12,hh:o(b%12||12),H:b,HH:o(b),M:g,MM:o(g),s:x,ss:o(x),l:o(M,3),L:o(Math.round(M/10)),t:b<12?"a":"p",tt:b<12?"am":"pm",T:b<12?"A":"P",TT:b<12?"AM":"PM",Z:f?"GMT":c?"UTC":(String(r).match(e)||[""]).pop().replace(n,""),o:(w>0?"-":"+")+o(100*Math.floor(Math.abs(w)/60)+Math.abs(w)%60,4),S:["th","st","nd","rd"][h%10>3?0:(h%100-h%10!=10)*h%10],W:S,N:O};return s.replace(t,function(t){return t in D?D[t]:t.slice(1,t.length-1)})}}();l.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"},l.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},e["default"]=l},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(44),i=r(o),a=n(28),u=r(a),s=n(29),c=r(s),l=n(43),f=r(l),d=n(42),p=r(d),h=n(40),y=r(h),m=function(){function t(e){var n=this;(0,u["default"])(this,t),this.element=e,this.element.setAttribute("data-has-picker",""),this.locale=this.element.getAttribute("lang")||document.body.getAttribute("lang")||"en",this.format=this.element.getAttribute("date-format")||document.body.getAttribute("date-format")||this.element.getAttribute("data-date-format")||document.body.getAttribute("data-date-format")||"yyyy-mm-dd",this.localeText=this.getLocaleText(),(0,i["default"])(this.element,{valueAsDate:{get:function(){if(!n.element.value)return null;var t=n.format||"yyyy-mm-dd",e=n.element.value.match(/(\d+)/g),r=0,o={};return t.replace(/(yyyy|dd|mm)/g,function(t){o[t]=r++}),new Date(e[o.yyyy],e[o.mm]-1,e[o.dd])},set:function(t){n.element.value=(0,y["default"])(t,n.format)}},valueAsNumber:{get:function(){return n.element.value?n.element.valueAsDate.valueOf():NaN},set:function(t){n.element.valueAsDate=new Date(t)}}});var r=function(t){var e=n.element;e.locale=n.localeText,f["default"].attachTo(e)};this.element.addEventListener("focus",r),this.element.addEventListener("mouseup",r),this.element.addEventListener("keydown",function(t){var e=new Date;switch(t.keyCode){case 9:case 27:f["default"].hide();break;case 38:n.element.valueAsDate&&(e.setDate(n.element.valueAsDate.getDate()+1),n.element.valueAsDate=e,f["default"].pingInput());break;case 40:n.element.valueAsDate&&(e.setDate(n.element.valueAsDate.getDate()-1),n.element.valueAsDate=e,f["default"].pingInput())}f["default"].sync()}),this.element.addEventListener("keyup",function(t){f["default"].sync()})}return(0,c["default"])(t,[{key:"getLocaleText",value:function(){var t=this.locale.toLowerCase();for(var e in p["default"]){var n=e.split("_");if(n.map(function(t){return t.toLowerCase()}),~n.indexOf(t)||~n.indexOf(t.substr(0,2)))return p["default"][e]}}}],[{key:"supportsDateInput",value:function(){var t=document.createElement("input");t.setAttribute("type","date");var e="not-a-date";return t.setAttribute("value",e),!(t.value===e)}},{key:"addPickerToDateInputs",value:function(){var e=document.querySelectorAll('input[type="date"]:not([data-has-picker])'),n=e.length;if(!n)return!1;for(var r=0;r<n;++r)new t(e[r])}},{key:"addPickerToOtherInputs",value:function(){var e=document.querySelectorAll('input[type="text"].date-polyfill:not([data-has-picker])'),n=e.length;if(!n)return!1;for(var r=0;r<n;++r)new t(e[r])}}]),t}();e["default"]=m},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={"en_en-US_en-UK":{days:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"]},"zh_zh-CN":{days:["星期天","星期一","星期二","星期三","星期四","星期五","星期六"],months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]},"zh-Hans_zh-Hans-CN":{days:["周日","周一","周二","周三","周四","周五","周六"],months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]},"zh-Hant_zh-Hant-TW":{days:["週日","週一","週二","週三","週四","週五","週六"],months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]},"de_de-DE":{days:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]},"nl_nl-NL_nl-BE":{days:["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"],months:["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"],today:"Vandaag",format:"D/M/Y"},"pt_pt-BR":{days:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],today:"Hoje"},"fr_fr-FR_fr-BE":{days:["Di","Lu","Ma","Me","Je","Ve","Sa"],months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],today:"Aujourd'hui",format:"D/M/Y"},"es_es-VE":{days:["Do","Lu","Ma","Mi","Ju","Vi","Sa"],months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],today:"Hoy",format:"D/M/Y"},"da_da-dk":{days:["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"],months:["Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","Oktober","November","December"],today:"I dag",format:"dd/MM-YYYY"},"ru_ru-RU_ru-UA_ru-KZ_ru-MD":{days:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],today:"Сегодня",format:"D.M.Y"},"uk_uk-UA":{days:["Нд","Пн","Вт","Ср","Чт","Пт","Сб"],months:["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],today:"Cьогодні",format:"D.M.Y"},"sv_sv-SE":{days:["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"],months:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],today:"Idag",format:"YYYY-MM-dd"},"test_test-TEST":{days:["Foo","Mon","Tue","Wed","Thu","Fri","Sat"],months:["Foo","February","March","April","May","June","July","August","September","October","November","December"]},ja:{days:["日","月","火","水","木","金","土"],months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],today:"今日",format:"YYYY-MM-dd"}};e["default"]=n},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(28),i=r(o),a=n(29),u=r(a),s=function(){function t(){var e=this;if((0,i["default"])(this,t),window.thePicker)return window.thePicker;this.date=new Date,this.input=null,this.isOpen=!1,this.container=document.createElement("date-input-polyfill"),this.year=document.createElement("select"),t.createRangeSelect(this.year,1890,this.date.getFullYear()+20),this.year.className="yearSelect",this.year.addEventListener("change",function(){e.date.setYear(e.year.value),e.refreshDaysMatrix()});var n=document.createElement("span");n.className="yearSelect-wrapper",n.appendChild(this.year),this.container.appendChild(n),this.month=document.createElement("select"),this.month.className="monthSelect",this.month.addEventListener("change",function(){e.date.setMonth(e.month.value),e.refreshDaysMatrix()});var r=document.createElement("span");r.className="monthSelect-wrapper",r.appendChild(this.month),this.container.appendChild(r),this.today=document.createElement("button"),this.today.textContent="Today",this.today.addEventListener("click",function(){var t=new Date;e.date=new Date(t.getFullYear()+"/"+("0"+(t.getMonth()+1)).slice(-2)+"/"+("0"+t.getDate()).slice(-2)),e.setInput()}),this.container.appendChild(this.today);var o=document.createElement("table");this.daysHead=document.createElement("thead"),this.days=document.createElement("tbody"),this.days.addEventListener("click",function(t){var n=t.target;if(!n.hasAttribute("data-day"))return!1;var r=e.days.querySelector("[data-selected]");r&&r.removeAttribute("data-selected"),n.setAttribute("data-selected",""),e.date.setDate(parseInt(n.textContent)),e.setInput()}),o.appendChild(this.daysHead),o.appendChild(this.days),this.container.appendChild(o),this.hide(),document.body.appendChild(this.container),this.removeClickOut=function(t){if(e.isOpen){for(var n=t.target,r=n===e.container||n===e.input;!r&&(n=n.parentNode);)r=n===e.container;("date"!==t.target.getAttribute("type")&&!r||!r)&&e.hide()}},this.removeBlur=function(t){e.isOpen&&e.hide()}}return(0,u["default"])(t,[{key:"hide",value:function(){this.container.setAttribute("data-open",this.isOpen=!1),this.input&&this.input.blur(),document.removeEventListener("mousedown",this.removeClickOut),document.removeEventListener("touchstart",this.removeClickOut)}},{key:"show",value:function(){var t=this;this.container.setAttribute("data-open",this.isOpen=!0),setTimeout(function(){document.addEventListener("mousedown",t.removeClickOut),document.addEventListener("touchstart",t.removeClickOut)},500),window.onpopstate=function(){t.hide()}}},{key:"goto",value:function(t){var e=this,n=t.getBoundingClientRect();this.container.style.top=n.top+n.height+(document.documentElement.scrollTop||document.body.scrollTop)+3+"px";var r=this.container.getBoundingClientRect(),o=r.width?r.width:280,i=function(){return e.container.className.replace("polyfill-left-aligned","").replace("polyfill-right-aligned","").replace(/\s+/g," ").trim()},a=n.right-o;n.right<o?(a=n.left,this.container.className=i()+" polyfill-left-aligned"):this.container.className=i()+" polyfill-right-aligned",this.container.style.left=a+(document.documentElement.scrollLeft||document.body.scrollLeft)+"px",this.show()}},{key:"attachTo",value:function(t){return!(t===this.input&&this.isOpen||(this.input=t,this.refreshLocale(),this.sync(),this["goto"](this.input),0))}},{key:"sync",value:function(){isNaN(Date.parse(this.input.valueAsDate))?this.date=new Date:this.date=t.absoluteDate(this.input.valueAsDate),this.year.value=this.date.getFullYear(),this.month.value=this.date.getMonth(),this.refreshDaysMatrix()}},{key:"setInput",value:function(){var t=this;this.input.valueAsDate=this.date,this.input.focus(),setTimeout(function(){t.hide()},100),this.pingInput()}},{key:"refreshLocale",value:function(){if(this.locale===this.input.locale)return!1;this.locale=this.input.locale,this.today.textContent=this.locale.today||"Today";for(var e=["<tr>"],n=0,r=this.locale.days.length;n<r;++n)e.push('<th scope="col">'+this.locale.days[n]+"</th>");this.daysHead.innerHTML=e.join(""),t.createRangeSelect(this.month,0,11,this.locale.months)}},{key:"refreshDaysMatrix",value:function(){this.refreshLocale();for(var e=this.date.getFullYear(),n=this.date.getMonth(),r=new Date(e,n,1).getDay(),o=new Date(this.date.getFullYear(),n+1,0).getDate(),i=t.absoluteDate(this.input.valueAsDate)||!1,a=i&&e===i.getFullYear()&&n===i.getMonth(),u=[],s=0;s<o+r;++s)if(s%7===0&&u.push("\n          "+(0!==s?"</tr>":"")+"\n          <tr>\n        "),s+1<=r)u.push("<td></td>");else{var c=s+1-r,l=a&&i.getDate()===c;u.push("<td data-day "+(l?"data-selected":"")+">\n          "+c+"\n        </td>")}this.days.innerHTML=u.join("")}},{key:"pingInput",value:function(){var t=void 0,e=void 0;try{t=new Event("input"),e=new Event("change")}catch(n){t=document.createEvent("KeyboardEvent"),t.initEvent("input",!0,!1),e=document.createEvent("KeyboardEvent"),e.initEvent("change",!0,!1)}this.input.dispatchEvent(t),this.input.dispatchEvent(e)}}],[{key:"createRangeSelect",value:function(t,e,n,r){t.innerHTML="";for(var o=e;o<=n;++o){var i=document.createElement("option");t.appendChild(i);var a=r?r[o-e]:o;i.text=a,i.value=o}return t}},{key:"absoluteDate",value:function(t){return t&&new Date(t.getTime()+60*t.getTimezoneOffset()*1e3)}}]),t}();window.thePicker=new s,e["default"]=window.thePicker},function(t,e,n){t.exports={"default":n(49),__esModule:!0}},function(t,e,n){t.exports={"default":n(50),__esModule:!0}},function(t,e,n){t.exports={"default":n(51),__esModule:!0}},function(t,e,n){t.exports={"default":n(52),__esModule:!0}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var o=n(47),i=r(o),a=n(46),u=r(a),s="function"==typeof u["default"]&&"symbol"==typeof i["default"]?function(t){return typeof t}:function(t){return t&&"function"==typeof u["default"]&&t.constructor===u["default"]?"symbol":typeof t};e["default"]="function"==typeof u["default"]&&"symbol"===s(i["default"])?function(t){return"undefined"==typeof t?"undefined":s(t)}:function(t){return t&&"function"==typeof u["default"]&&t.constructor===u["default"]?"symbol":"undefined"==typeof t?"undefined":s(t)}},function(t,e,n){n(73);var r=n(8).Object;t.exports=function(t,e){return r.defineProperties(t,e)}},function(t,e,n){n(74);var r=n(8).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){n(77),n(75),n(78),n(79),t.exports=n(8).Symbol},function(t,e,n){n(76),n(80),t.exports=n(27).f("iterator")},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var r=n(5),o=n(70),i=n(69);t.exports=function(t){return function(e,n,a){var u,s=r(e),c=o(s.length),l=i(a,c);if(t&&n!=n){for(;c>l;)if(u=s[l++],u!=u)return!0}else for(;c>l;l++)if((t||l in s)&&s[l]===n)return t||l||0;return!t&&-1}}},function(t,e,n){var r=n(53);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(13),o=n(37),i=n(20);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var a,u=n(t),s=i.f,c=0;u.length>c;)s.call(t,a=u[c++])&&e.push(a);return e}},function(t,e,n){t.exports=n(2).document&&document.documentElement},function(t,e,n){var r=n(30);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(30);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){"use strict";var r=n(34),o=n(14),i=n(21),a={};n(6)(a,n(7)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(a,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var r=n(13),o=n(5);t.exports=function(t,e){for(var n,i=o(t),a=r(i),u=a.length,s=0;u>s;)if(i[n=a[s++]]===e)return n}},function(t,e,n){var r=n(15)("meta"),o=n(12),i=n(3),a=n(4).f,u=0,s=Object.isExtensible||function(){return!0},c=!n(11)(function(){return s(Object.preventExtensions({}))}),l=function(t){a(t,r,{value:{i:"O"+ ++u,w:{}}})},f=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!s(t))return"F";if(!e)return"E";l(t)}return t[r].i},d=function(t,e){if(!i(t,r)){if(!s(t))return!0;if(!e)return!1;l(t)}return t[r].w},p=function(t){return c&&h.NEED&&s(t)&&!i(t,r)&&l(t),t},h=t.exports={KEY:r,NEED:!1,fastKey:f,getWeak:d,onFreeze:p}},function(t,e,n){var r=n(20),o=n(14),i=n(5),a=n(25),u=n(3),s=n(32),c=Object.getOwnPropertyDescriptor;e.f=n(1)?c:function(t,e){if(t=i(t),e=a(e,!0),s)try{return c(t,e)}catch(n){}if(u(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){var r=n(5),o=n(36).f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],u=function(t){try{return o(t)}catch(e){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?u(t):o(r(t))}},function(t,e,n){var r=n(3),o=n(71),i=n(22)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e,n){var r=n(24),o=n(16);t.exports=function(t){return function(e,n){var i,a,u=String(o(e)),s=r(n),c=u.length;return s<0||s>=c?t?"":void 0:(i=u.charCodeAt(s),i<55296||i>56319||s+1===c||(a=u.charCodeAt(s+1))<56320||a>57343?t?u.charAt(s):i:t?u.slice(s,s+2):(i-55296<<10)+(a-56320)+65536)}}},function(t,e,n){var r=n(24),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(24),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(16);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(54),o=n(62),i=n(18),a=n(5);t.exports=n(33)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e,n){var r=n(10);r(r.S+r.F*!n(1),"Object",{defineProperties:n(35)})},function(t,e,n){var r=n(10);r(r.S+r.F*!n(1),"Object",{defineProperty:n(4).f})},function(t,e){},function(t,e,n){"use strict";var r=n(68)(!0);n(33)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";var r=n(2),o=n(3),i=n(1),a=n(10),u=n(39),s=n(64).KEY,c=n(11),l=n(23),f=n(21),d=n(15),p=n(7),h=n(27),y=n(26),m=n(63),v=n(57),b=n(60),g=n(9),x=n(5),M=n(25),w=n(14),S=n(34),O=n(66),D=n(65),T=n(4),_=n(13),A=D.f,k=T.f,E=O.f,j=r.Symbol,C=r.JSON,N=C&&C.stringify,L="prototype",P=p("_hidden"),F=p("toPrimitive"),J={}.propertyIsEnumerable,H=l("symbol-registry"),I=l("symbols"),Y=l("op-symbols"),R=Object[L],z="function"==typeof j,U=r.QObject,B=!U||!U[L]||!U[L].findChild,W=i&&c(function(){return 7!=S(k({},"a",{get:function(){return k(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=A(R,e);r&&delete R[e],k(t,e,n),r&&t!==R&&k(R,e,r)}:k,Z=function(t){var e=I[t]=S(j[L]);return e._k=t,e},G=z&&"symbol"==typeof j.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof j},K=function(t,e,n){return t===R&&K(Y,e,n),g(t),e=M(e,!0),g(n),o(I,e)?(n.enumerable?(o(t,P)&&t[P][e]&&(t[P][e]=!1),n=S(n,{enumerable:w(0,!1)})):(o(t,P)||k(t,P,w(1,{})),t[P][e]=!0),W(t,e,n)):k(t,e,n)},V=function(t,e){g(t);for(var n,r=v(e=x(e)),o=0,i=r.length;i>o;)K(t,n=r[o++],e[n]);return t},q=function(t,e){return void 0===e?S(t):V(S(t),e)},Q=function(t){var e=J.call(this,t=M(t,!0));return!(this===R&&o(I,t)&&!o(Y,t))&&(!(e||!o(this,t)||!o(I,t)||o(this,P)&&this[P][t])||e)},X=function(t,e){if(t=x(t),e=M(e,!0),t!==R||!o(I,e)||o(Y,e)){var n=A(t,e);return!n||!o(I,e)||o(t,P)&&t[P][e]||(n.enumerable=!0),n}},$=function(t){for(var e,n=E(x(t)),r=[],i=0;n.length>i;)o(I,e=n[i++])||e==P||e==s||r.push(e);return r},tt=function(t){for(var e,n=t===R,r=E(n?Y:x(t)),i=[],a=0;r.length>a;)!o(I,e=r[a++])||n&&!o(R,e)||i.push(I[e]);return i};z||(j=function(){if(this instanceof j)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(n){this===R&&e.call(Y,n),o(this,P)&&o(this[P],t)&&(this[P][t]=!1),W(this,t,w(1,n))};return i&&B&&W(R,t,{configurable:!0,set:e}),Z(t)},u(j[L],"toString",function(){return this._k}),D.f=X,T.f=K,n(36).f=O.f=$,n(20).f=Q,n(37).f=tt,i&&!n(19)&&u(R,"propertyIsEnumerable",Q,!0),h.f=function(t){return Z(p(t))}),a(a.G+a.W+a.F*!z,{Symbol:j});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)p(et[nt++]);for(var et=_(p.store),nt=0;et.length>nt;)y(et[nt++]);a(a.S+a.F*!z,"Symbol",{"for":function(t){return o(H,t+="")?H[t]:H[t]=j(t)},keyFor:function(t){if(G(t))return m(H,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){B=!0},useSimple:function(){B=!1}}),a(a.S+a.F*!z,"Object",{create:q,defineProperty:K,defineProperties:V,getOwnPropertyDescriptor:X,getOwnPropertyNames:$,getOwnPropertySymbols:tt}),C&&a(a.S+a.F*(!z||c(function(){var t=j();return"[null]"!=N([t])||"{}"!=N({a:t})||"{}"!=N(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!G(t)){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);return e=r[1],"function"==typeof e&&(n=e),!n&&b(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!G(e))return e}),r[1]=e,N.apply(C,r)}}}),j[L][F]||n(6)(j[L],F,j[L].valueOf),f(j,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},function(t,e,n){n(26)("asyncIterator")},function(t,e,n){n(26)("observable")},function(t,e,n){n(72);for(var r=n(2),o=n(6),i=n(18),a=n(7)("toStringTag"),u=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],s=0;s<5;s++){var c=u[s],l=r[c],f=l&&l.prototype;f&&!f[a]&&o(f,a,c),i[c]=i.Array}},function(t,e,n){e=t.exports=n(82)(),e.push([t.id,"date-input-polyfill{background:#fff;color:#000;text-shadow:none;border:0;padding:0;height:auto;width:auto;line-height:normal;font-family:sans-serif;font-size:14px;position:absolute!important;text-align:center;box-shadow:0 3px 10px 1px rgba(0,0,0,.22);cursor:default;z-index:1;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;overflow:hidden;display:block}date-input-polyfill[data-open=false]{visibility:hidden;z-index:-100!important;top:0}date-input-polyfill[data-open=true]{visibility:visible}date-input-polyfill select,date-input-polyfill table,date-input-polyfill td,date-input-polyfill th{background:#fff;color:#000;text-shadow:none;border:0;padding:0;height:auto;width:auto;line-height:normal;font-family:sans-serif;font-size:14px;box-shadow:none;font-family:Lato,Helvetica,Arial,sans-serif}date-input-polyfill button,date-input-polyfill select{border:0;border-radius:0;border-bottom:1px solid #dadfe1;height:24px;vertical-align:top;-webkit-appearance:none;-moz-appearance:none}date-input-polyfill .monthSelect-wrapper{width:55%;display:inline-block}date-input-polyfill .yearSelect-wrapper{width:25%;display:inline-block}date-input-polyfill select{width:100%}date-input-polyfill select:first-of-type{border-right:1px solid #dadfe1;border-radius:5px 0 0 0;-moz-border-radius:5px 0 0 0;-webkit-border-radius:5px 0 0 0}date-input-polyfill button{width:20%;background:#dadfe1;border-radius:0 5px 0 0;-moz-border-radius:0 5px 0 0;-webkit-border-radius:0 5px 0 0}date-input-polyfill button:hover{background:#eee}date-input-polyfill table{border-collapse:separate!important;border-radius:0 0 5px 5px;-moz-border-radius:0 0 5px 5px;-webkit-border-radius:0 0 5px 5px;overflow:hidden;max-width:280px;width:280px}date-input-polyfill td,date-input-polyfill th{width:32px;padding:4px;text-align:center;box-sizing:content-box}date-input-polyfill td[data-day]{cursor:pointer}date-input-polyfill td[data-day]:hover{background:#dadfe1}date-input-polyfill [data-selected]{font-weight:700;background:#d8eaf6}",""]);
},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=p[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(c(r.parts[i],e))}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(c(r.parts[i],e));p[r.id]={id:r.id,refs:1,parts:a}}}}function o(t){for(var e=[],n={},r=0;r<t.length;r++){var o=t[r],i=o[0],a=o[1],u=o[2],s=o[3],c={css:a,media:u,sourceMap:s};n[i]?n[i].parts.push(c):e.push(n[i]={id:i,parts:[c]})}return e}function i(t,e){var n=m(),r=g[g.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),g.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){t.parentNode.removeChild(t);var e=g.indexOf(t);e>=0&&g.splice(e,1)}function u(t){var e=document.createElement("style");return e.type="text/css",i(t,e),e}function s(t){var e=document.createElement("link");return e.rel="stylesheet",i(t,e),e}function c(t,e){var n,r,o;if(e.singleton){var i=b++;n=v||(v=u(e)),r=l.bind(null,n,i,!1),o=l.bind(null,n,i,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=s(e),r=d.bind(null,n),o=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=u(e),r=f.bind(null,n),o=function(){a(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}function l(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=x(e,o);else{var i=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function f(t,e){var n=e.css,r=e.media;if(r&&t.setAttribute("media",r),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function d(t,e){var n=e.css,r=e.sourceMap;r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([n],{type:"text/css"}),i=t.href;t.href=URL.createObjectURL(o),i&&URL.revokeObjectURL(i)}var p={},h=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},y=h(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),m=h(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,b=0,g=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=y()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=o(t);return r(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var u=n[a],s=p[u.id];s.refs--,i.push(s)}if(t){var c=o(t);r(c,e)}for(var a=0;a<i.length;a++){var s=i[a];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete p[s.id]}}}};var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e,n){var r=n(81);"string"==typeof r&&(r=[[t.id,r,""]]),n(83)(r,{}),r.locals&&(t.exports=r.locals)}])});
var ScrollTop = {

    init: function () {
        this.$scrollTop = $('.js-scroll-top');
        if (this.$scrollTop.length) {
            var _this = this;
            $(document).on('scroll', function() {
                if ( $(document).scrollTop() >= $(window).height() ) {
                    _this.$scrollTop.removeClass('hidden');
                } else {
                    _this.$scrollTop.addClass('hidden');
                }
            });

            this.$scrollTop.on('click', function(e) {
                e.preventDefault();
                TweenMax.to($(window), .5, {scrollTo: 0, ease: Expo.easeOut});
            })

        }
    }

};

var Selection = {

    init: function () {
        if ($('.js-selection').length) {
            $('.js-select').on('click', {select: true}, this.onClick);
            $('.js-clear').on('click', {select: false}, this.onClick);

            $('.js-selection').on('click', 'input', this.onSelect);

            var _this = this;
            $('.js-collapse').each(function() {
                // init collapse
                _this.toggleCollapse(this);
                $(this).find('.js-collapse-toggle').on('click', {this: _this}, _this.onToggleCollapse);
            });
        }
        if($('.js-select-all').length){
            $('.js-select-all').on('click', this.selectAll)
        }
    },
    onToggleCollapse: function(e) {
        e.preventDefault();
        var _this = e.data.this;
        _this.toggleCollapse($(this).closest('.js-collapse')[0]);
    },
    toggleCollapse: function(selection) {
        // Toggle collapse class on parent
        var $selection = $(selection);
        $selection.toggleClass('collapsed');

        var $radioWrapper = $selection.find('.radio-wrapper');

        if ($selection.hasClass('collapsed')) {
            // Add hidden class to all items > 5
            // console.log($selection.find('.radio-wrapper'));
            var i = 0;
            $radioWrapper.each(function() {
                i++;
                if (i > 5) $(this).addClass('hidden');
            });
        } else {
            // Remove hidden class from all items
            $radioWrapper.each(function() {
                $(this).removeClass('hidden');
            });
        }
    },
    onSelect: function () {
        // Loop over all options
        var checked = false;
        var allChecked = true;
        $('.js-selection').find('input').each(function(input) {
            if (this.checked) {
                checked = true;
            } else {
                allChecked = false;
            }
        });

        if (checked) {
            $('.js-clear').removeClass('disabled')
        } else {
            $('.js-clear').addClass('disabled')
        }

        if (allChecked) {
            $('.js-select').addClass('disabled');
        } else {
            $('.js-select').removeClass('disabled');
        }
    },
    onClick: function (e) {
        e.preventDefault();

        // Continue if not disabled
        if ($(e.target).hasClass('disabled')) return;

        var target = $(e.target).closest('.js-selection');
        var checkboxList = target.find('input');

        // Check / clear all input fields
        for (var i = 0; i < checkboxList.length; i++) {
            $(checkboxList[i]).prop( "checked", e.data.select );
        }

        // Disable other option
        if (e.data.select) {
            target.find('.js-select').addClass('disabled');
            target.find('.js-clear').removeClass('disabled')
        } else {
            target.find('.js-clear').addClass('disabled');
            target.find('.js-select').removeClass('disabled')
        }
    },
    selectAll: function(e){
        if($('input'+$(this).data('target')+':checked').length){
            $('input'+$(this).data('target')).prop('checked', false);
        }else{
            $('input'+$(this).data('target')).prop('checked', true);
        }
    }

};

var Toggle = {

    init: function () {
        $('.subtitle.js-toggle').on('keyup', '.js-toggle-trigger.trigger', this.toggleDelegate);
        $('.js-toggle').on('click', '.js-toggle-trigger', this.toggleDelegate);
        $('.js-toggle-nested').on('click', '.js-toggle-nested-trigger', this.toggleDelegate);
        $('.documents-toggle').on('click', '.documents-toggle-trigger', this.toggleDelegate);
        $('.category-toggle').on('click', '.category-toggle-trigger', this.toggleDelegate);
        $('.inline-toggle').on('click', '.inline-toggle-trigger', this.toggleDelegate);
        $('.category-content').on('click', 'a.country', function(e){
            var selector = '.country-content[data-country="'+$(this).data('country')+'"]';
            if($(e.delegateTarget).find(selector).hasClass('open')){
                $(e.delegateTarget).find(selector).removeClass('open');
                $(this).removeClass('active');
            }else{
                // $('.category-content [data-country]').removeClass('open').removeClass('active');
                $(this).addClass('active');
                $(e.delegateTarget).find(selector).addClass('open')
            }
            var count = $(e.delegateTarget).find('.country-content.open').length;
            $(e.delegateTarget).attr('data-count', count)
        });

        $('.languages').on('click', '.lang-shortcode', this.toggleLanguage);

        $('.js-cart-document').on('click', '.js-cart-document-trigger', this.toggleDelegate);

        $('.js-toggle-dropdown').on('click', '.js-toggle-dropdown-trigger', this.toggleDelegateDropdown);

        $('.form-toggle-selection').on('click', '.selection-title .label', this.toggleFormSelection);

        $('.expand_block').on('click', '.info-list-trigger', this.toggleResultsTab);
        $('.info-list li').on('click', 'a.show-more, a.show-less', this.toggleResultsMore);

        $('.expand-collapse-all').on('click', '.expand', this.expandAll);
        $('.expand-collapse-all').on('click', '.collapse', this.collapseAll);

        $('.expand-collapse-all').on('keyup', '.expand', function (e){
            if (e.keyCode==13) {
                $(this).trigger("click");
            }
        })
        $('.expand-collapse-all').on('keyup', '.collapse', function (e){
            if (e.keyCode==13) {
                $(this).trigger("click");
            }
        })
        $('.js-toggle .js-toggle-trigger').keyup(  function (e){
            if (e.keyCode==13){
                $(this).trigger("click");
            }
        });

        $('ul.flags li.collapse.open').removeClass('open');
        $('ul.flags li.collapse').on('click', this.toggleDelegate);

        $('.collapse-title').on('click', '.expand-trigger', this.toggleDelegate);

        $('input[type="radio"][data-toggle][data-show]').on('change', this.dataToggle);

        $('input[type="radio"][data-toggle][data-show="checked"]').on('change', this.dataToggleChecked);

        $('.chapter-toggle').on('click', function(e){
            $(this).toggleClass('open')
        });

        $('.mobile .chapter-toggle+.chapter-content, .mobile .chapter-toggle+.chapter-documents+.chapter-content').on('click',function(e){
            if($(e.delegateTarget).prev().hasClass('chapter-documents')){
                $(e.delegateTarget).prev().prev().addClass('open')
            }else{
                $(e.delegateTarget).prev().addClass('open')
            }
        });

        $('.mobile-hover').on('click', function(e){
            if(window.innerWidth <= 768){
                e.preventDefault();
            }
        })
    },

    toggleDelegate: function (e) {
        // On tab or shift continue keyboard navigation
        if(e && (e.which === 9 || e.which === 16)){
            return;                                      
        }
        e.preventDefault();
        $(e.delegateTarget).toggleClass('open');

        Toggle.checkControlAllTriggers();
        e.stopPropagation();
    },
    toggleLanguage: function(e){
        $(e.delegateTarget).find('.lang-shortcode').removeClass('active');
        $(this).addClass('active');
        $(e.delegateTarget).find('.lang-content').removeClass('open');
        $(e.delegateTarget).find('.lang-content[data-lang="'+$(this).data('lang')+'"]').addClass('open');
    },
    toggleFormSelection: function(e){
        $(e.delegateTarget).toggleClass('open');
    },

    toggleDelegateDropdown: function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).closest('.select-item, .dropdown-select-wrapper').toggleClass('open');
    },

    toggleResultsTab: function(e){
        e.preventDefault();

        $(e.delegateTarget).find('.info-list-trigger').removeClass('active');
        $(this).addClass('active');
        $(e.delegateTarget).find('.info-list').hide();
        $(e.delegateTarget).find($(this).data('target')).show();
    },
    toggleResultsMore: function(e){
        e.preventDefault();
        $(e.delegateTarget).toggleClass('open');
    },

    expandAll: function(e){
        e.preventDefault();
        $('.expand-collapse-all a').addClass('active');
        $(this).removeClass('active');

        $('.expand-list li').addClass('open');

        if($('.js-toggle').length){
            $('.js-toggle').addClass('open');
        }

    },
    collapseAll: function(e){
        e.preventDefault();
        $('.expand-collapse-all a').addClass('active');
        $(this).removeClass('active');

        $('.expand-list li').removeClass('open');

        if($('.js-toggle').length){
            $('.js-toggle').removeClass('open');
        }

    },
    dataToggle: function(e){
        if($(this).data('show') == true){
            $($(this).data('toggle')).removeClass('hidden');
        }else{
            $($(this).data('toggle')).addClass('hidden');
        }
    },
    dataToggleChecked: function(e){
        console.warn('toggling?');
        if($(this).data('show') && this.checked){
            $($(this).data('toggle')).removeClass('hidden');
        }else{
            $($(this).data('toggle')).addClass('hidden');
        }
    },
    checkControlAllTriggers: function(){
        if($('.expand-collapse-all').length && $('.expand-collapse-all').length){
            if($('li.js-toggle').length == $('li.js-toggle.open').length){
                $('.expand-collapse-all .expand').removeClass('active');
                $('.expand-collapse-all .collapse').addClass('active');
            }else if ($('li.js-toggle.open').length == 0) {
                $('.expand-collapse-all .expand').addClass('active');
                $('.expand-collapse-all .collapse').removeClass('active');
            }else{
                $('.expand-collapse-all .expand').addClass('active');
                $('.expand-collapse-all .collapse').addClass('active');
            }
        }
    }
};
$(document).ready(function(){
    $(".ieborder input[name='dynformCMD_del_(CourtNameMode)']").hide();
    $("#menuButtonHeader").on('keypress', function(e) {
        if (e.which === 13) {
            $(this).trigger('click');
        }
    });
    $(".expandInsideList").on('keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            $(this).parent().trigger('click');
        }
    });
    $(".full-menu").keyup(function(e) {
        if (e.which == 27) {
            $(".menu-btn").focus();
            $(".menu-btn").trigger('click');
        }
    });

});

$(document).ready(function() {

    $('.button.big.dark.pull-right').keydown(function(event){
        if ($(this).is(':focus')){
            if (event.keyCode === 13){
                $(this).click();
            }
        }
    });
});



$(document).ready(function() {
    $('.button.big.outline.pull-left').keyup(function(event){
        if ($(this).is(':focus')){
            if (event.keyCode === 13){
                $(this).click();
            }
        }
    });

    $('input:checkbox').keypress(function(e){
        e.preventDefault();
        if((e.keyCode ? e.keyCode : e.which) == 13){
            $(this).trigger("click");
        }
    });

    $('#addModalListButton').focusout(function (e) {
        $('.close.js-close-modal.hide-text').focus();
    });
    $('#addModalListButton').keyup(function (e) {
        if (e.keyCode === 13){
            if (navigator.userAgent.search("Firefox") > 0){
                this.click();
            } else {
                $(this).trigger('click');
            }
        }
    });

    $('.container > .selection-items').find('a').on('keydown', function(e){
        if (e.which === 13) this.click();
    });

    $("[name='submitActiveLinkAdd0']").keyup(function(e){
        if (e.keyCode === 13){
            if (navigator.userAgent.search("Firefox") > 0){
                this.click();
            } else {
                $(this).trigger('click');
            }
        }
    })

});

$(document).ready(function() {
    $('.emailPdfLink .subtitle.borderless').keyup(function(e) {
        if (e.keyCode === 13){
            $(this).click();
        }
    });

});

$(document).ready(function() {
$('.close.js-close-modal.hide-text').on('click', function(e){
    if ($('.load-draft-modal-new').hasClass("active")  ){
        $('#modalCancelButton').focus();
        $('#modalCancelButton').on('focusout', function (e){
            $('.load-draft-close')[$('.load-draft-close').length-1].focus();
        })
        $('.load-draft-modal-new.active').on('keyup', function(e){
            if (e.keyCode == 27){
                $('.load-draft-close')[$('.load-draft-close').length-1].click();
                $('#buttonLoad').focus();
            }
        })
        $('.button.big.main.js-close-modal.hide-text.outline.cancelModalButton').on('click', function(e){
            $('#buttonLoad').focus();
        })
        $('.load-draft-close').on('click', function(e){
            $('#buttonLoad').focus();
        })
        $('.button.big.main.js-close-modal.hide-text.outline.cancelModalButton').on('keydown', function(e){
            if (e.keyCode ==13){
                $('#buttonLoad').focus();
            }
        })
        $('.load-draft-close').on('keydown', function(e){
            if (e.keyCode ==13){
                $('#buttonLoad').focus();
            }
        })
    }
})

    $('.close.js-close-modal.hide-text').on('keydown', function (e) {
        if (e.keyCode == 13) {
            $(this).trigger('click');
        }
    });

});

$(window).load(function() {
    if ($('.load-draft-modal-new').hasClass("active") && $('#modal-info-message').length == 0 ){
        $('#modalCancelButton').focus();
        $('#modalCancelButton').on('focusout', function (e){
            $('.load-draft-close')[$('.load-draft-close').length-1].focus();
        })
        $('.load-draft-modal-new.active').on('keyup', function(e){
            if (e.keyCode == 27){
                $('.load-draft-close')[$('.load-draft-close').length-1].click();
                $('#buttonLoad').focus();
            }
        })
        $('.button.big.main.js-close-modal.hide-text.outline.cancelModalButton').on('click', function(e){
                $('#buttonLoad').focus();
        })
        $('.load-draft-close').on('click', function(e){
                $('#buttonLoad').focus();
        })
        $('.button.big.main.js-close-modal.hide-text.outline.cancelModalButton').on('keydown', function(e){
            if (e.keyCode ==13){
                $('#buttonLoad').focus();
            }
        })
        $('.load-draft-close').on('keydown', function(e){
            if (e.keyCode ==13){
                $('#buttonLoad').focus();
            }
        })
    }
})

