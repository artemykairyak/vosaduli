$(function() {

    //BASE

    var scrollPos = 0;
    $(window).on('scroll', function() {
        var st = $(this).scrollTop();
        if (st > scrollPos) {
            $('.mobile-nav-menu').addClass('mobile-nav-menu_hidden');
        } else {
             $('.mobile-nav-menu').removeClass('mobile-nav-menu_hidden');
        }
        scrollPos = st;
    });

    // $(window).on('scroll', function(e) {
    //     console.log(e);
    // });


    //BASE END

    // MYPROFILE

    $('.profile-menu__item').on('click', function(e) {
        if ($(this).find('.profile-menu__submenu').length > 0) {
            $(this).toggleClass('profile-menu__item_expand');
            $(this).siblings().find('.profile-menu__link').removeClass('profile-menu__link_active');
            $(this).find('.profile-menu__link').addClass('profile-menu__link_active');

        } else {
            $(this).find('.profile-menu__link').addClass('profile-menu__link_active');
            $(this).siblings().find('.profile-menu__link').removeClass('profile-menu__link_active');
        }
        e.preventDefault();
    });

    $('.myprofile__submenu-item').on('click', function(e) {
        e.preventDefault();
        if (!$(this).hasClass('myprofile__submenu-item_active')) {
            $(this).toggleClass('myprofile__submenu-item_active');
            $(this).siblings().removeClass('myprofile__submenu-item_active');
        }

        if ($(this).hasClass('myprofile__submenu-item_aboutme')) {
            $('.myprofile-content').removeClass('myprofile-section_disabled');
            $('.myprofile-soc').addClass('myprofile-section_disabled');
            $('.myprofile-contacts').addClass('myprofile-section_disabled')
        } else if ($(this).hasClass('myprofile__submenu-item_soc')) {
            $('.myprofile-content').addClass('myprofile-section_disabled');
            $('.myprofile-soc').removeClass('myprofile-section_disabled');
            $('.myprofile-contacts').addClass('myprofile-section_disabled')
        } else if ($(this).hasClass('myprofile__submenu-item_contacts')) {
            $('select').trigger('refresh');
            $('.myprofile-content').addClass('myprofile-section_disabled');
            $('.myprofile-soc').addClass('myprofile-section_disabled');
            $('.myprofile-contacts').removeClass('myprofile-section_disabled')
        }
    });

    $('.edit-info__form').on('submit', function(e) {
        e.preventDefault();
        validationPersonalInfo($('.edit-info__form'));
    });

    $('.myprofile-contacts__form').on('submit', function(e) {
        e.preventDefault();
        sendForm($(this), 'https://cors-anywhere.herokuapp.com/http://moduli-opencart.ru/users/145');
        $('.myprofile-contacts__contact-state_address').text($(this).find('.myprofile-contacts__form-input_address').val());
        $('.myprofile-contacts__contact-state_phone').text($(this).find('.myprofile-contacts__form-input_phone').val());

    });

    if ($('.edit-info__form').length > 0) {
        $('select').styler();
    }

    $('select[name="country"]').on('change', function(e) {
        $('select[name="region"]').removeAttr('disabled').parent().removeClass('edit-select_disabled');
        $('select').trigger('refresh');
        let oldLength = $('select[name="region"]').children('option').length;
        let timerId = setInterval(() => {
            if ($('select[name="region"]').children('option').length !== oldLength) {
                clearInterval(timerId);
                $('select').trigger('refresh');
            }
        }, 100);

    });

    $('select[name="region"]').on('change', function(e) {
        $('select[name="city"]').removeAttr('disabled').parent().removeClass('edit-select_disabled');
        $('select').trigger('refresh');
        let oldLength = $('select[name="city"]').children('option').length;
        let timerId = setInterval(() => {
            if ($('select[name="city"]').children('option').length !== oldLength) {
                clearInterval(timerId);
                $('select').trigger('refresh');
            }
        }, 100);
    });

    //MYPROFILE

    $('.actions__add-friend').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('actions__add-friend_sended');
        $(this).hasClass('actions__add-friend_sended') ?
            $(this).text('Заявка отправлена') : $(this).text('Добавить в друзья');
    });

    $('.groups-menu__trigger').on('click', function(e) {
        e.preventDefault();
        onTriggerClick($(this));

        if ($(this).hasClass('groups-menu__trigger_new')) {
            $('.groups-menu__new-items').removeClass('groups-menu__items_disabled');
            $('.groups-menu__best-items').addClass('groups-menu__items_disabled');
        } else if ($(this).hasClass('groups-menu__trigger_best')) {
            $('.groups-menu__best-items').removeClass('groups-menu__items_disabled');
            $('.groups-menu__new-items').addClass('groups-menu__items_disabled');
        }
    });

    $('.online-report__trigger').on('click', function(e) {
        e.preventDefault();
        onTriggerClick($(this));

        if ($(this).hasClass('online-report__trigger_events')) {
            $('.online-report__events-items').removeClass('online-report__items_disabled');
            $('.online-report__news-items').addClass('online-report__items_disabled');
        } else if ($(this).hasClass('online-report__trigger_news')) {
            $('.online-report__news-items').removeClass('online-report__items_disabled');
            $('.online-report__events-items').addClass('online-report__items_disabled');
        }
    });

    $('.friends__menu-item').on('click', function(e) {
        $(this).addClass('friends__menu-item_active');
        $(this).siblings().removeClass('friends__menu-item_active');
        e.preventDefault();
    });

    $('.myprofile-soc__trigger-trigger').on('click', function() {
        socTriggerChange($(this))
    });

    // if($('.myprofile-contacts__form').length > 0) {
    // 	$('myprofile-contacts__form-input').val($('myprofile-contacts__form-input').val)
    // }

    if ($('.header-menu__container').length > 0 && $(window).width() < 1050) {
        $('.header-menu__item').on('click', function(e) {
            e.preventDefault();
            $(this).parent().siblings().find('.header-menu__item').removeClass('header-menu__item_active');
            $(this).addClass('header-menu__item_active');
        });
        $('.header-menu__container').owlCarousel({
            navText: [$('.header-menu__nav-arrow_prev'), $('.header-menu__nav-arrow_next')],
            items: 4,
            margin: 10,
            nav: true,
            dots: false,
            loop: false,
            mouseDrag: false,
            touchDrag: false,
            pullDrag: false,
            responsive: {
                0: {
                    items: 2.8,
                    nav: false,
                    margin: 10,
                    mouseDrag: true,
                    touchDrag: true,
                    pullDrag: true
                },
                690: {
                    items: 4
                }
            }
        });
    } else if ($('.header-menu__container').length > 0 && $(window).width() >= 1050) {
        $('.header-menu__container').trigger('destroy.owl.carousel');
        $('.header-menu__item').on('click', function(e) {
            $(this).siblings().removeClass('header-menu__item_active');
            $(this).addClass('header-menu__item_active');
        });
    }

    // if($('.myprofile-contacts__form-input_phone').length > 0) {
    // 	$('.myprofile-contacts__form-input_phone').val('+7');
    // 	$('.myprofile-contacts__form-input_phone').on('keyup', function() {
    // 		if($(this).val().length < 2 || !$(this).val().startsWith('+7')) {
    // 			$(this).val('+7');
    // 		}
    // 	})
    // }

    $('.blogs-menu__trigger').on('click', function(e) {
        e.preventDefault();
        onTriggerClick($(this));
    });

    //MODERATION

    $('.moderation-header__tab').on('click', function() {
        if (!$(this).hasClass('tab_selected')) {
            $(this).toggleClass('tab_selected');
            $(this).siblings().removeClass('tab_selected');
        }
    });

    cutText($('.moderation-articles__article-title'), 76);

    //MODERATION

    // ADD ARTICLE

    $('.pub-format__format').on('mouseenter', function() {
        $(this).addClass('pub-format__format_hover');
    });

    $('.pub-format__format').on('mouseleave', function() {
        $(this).removeClass('pub-format__format_hover');
    });

    $('.pub-format__format').on('click', function() {
        $(this).siblings().removeClass('pub-format__format_selected');
        $(this).addClass('pub-format__format_selected');
        $(this).siblings().find('.pub-format__format-radio').removeAttr('checked');
        $(this).find('.pub-format__format-radio').attr('checked', 'checked');
    });

    $('.pub-format__format-radio').on('focus', function() {
        $(this).parent().addClass().addClass('pub-format__format_hover');
    });

    $('.pub-format__format-radio').on('blur', function() {
        $(this).parent().addClass().removeClass('pub-format__format_hover');
    });

    $('input[name="thumbnail"]').on('focus', function() {
        $(this).parent().addClass('pub-thumbnail__image_hover');
    });

    $('input[name="thumbnail"]').on('blur', function() {
        $(this).parent().removeClass('pub-thumbnail__image_hover');
    });

    $('input[name="period"]').on('focus', function() {
        $(this).parent().addClass('pub-period__period-btn_hover');
    });

    $('input[name="period"]').on('blur', function() {
        $(this).parent().removeClass('pub-period__period-btn_hover');
    });

    if ($('.pub-thumbnail__image').length > 0) {
        $('input[type="file"]').on('change', function() {
            let file = this.files[0];
            loadThumbnail(file);
        });

        var dropZone = $('.pub-thumbnail__image');

        dropZone[0].ondragover = function() {
            dropZone.addClass('pub-thumbnail__image_onDrag');
            return false;
        };

        dropZone[0].ondragleave = function() {
            dropZone.removeClass('pub-thumbnail__image_onDrag');
            return false;
        };

        dropZone[0].ondrop = function(e) {
            e.preventDefault();
            var file = e.dataTransfer.files[0];
            e.stopPropagation();
            dropZone.removeClass('pub-thumbnail__image_onDrag');
            loadThumbnail(file);
        };
    }



    // var config = {};
    // config.toolbarGroups = [
    // { name: 'styles', groups: [ 'styles' ] },
    // { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    // { name: 'paragraph', groups: [ 'list', 'blocks', 'indent', 'align', 'bidi', 'paragraph' ] },
    // { name: 'insert', groups: [ 'insert' ] },
    // { name: 'links', groups: [ 'links' ] },
    // { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
    // { name: 'tools', groups: [ 'tools' ] },
    // { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
    // { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
    // { name: 'forms', groups: [ 'forms' ] },
    // { name: 'others', groups: [ 'others' ] },
    // '/',
    // { name: 'colors', groups: [ 'colors' ] },
    // { name: 'about', groups: [ 'about' ] }
    // ];
    // config.placeholder = 'some value'; 
    // config.removeButtons = 'Underline,Subscript,Superscript,Cut,Copy,PasteText,PasteFromWord,Outdent,Indent,Strike,HorizontalRule,SpecialChar,Scayt,Undo,Redo,RemoveFormat,About,Anchor,Unlink,Format';
    // config.extraPlugins = 'cloudservices';
    // config.extraPlugins = 'confighelper';
    // config.resize_enabled = false;
    // config.uiColor = '#fafafa';
    // CKEDITOR.replace('article-content', config);



    $('.pub-theme__input').on('keyup', function(e) {
        if (e.code === 'Slash' || e.code === 'Comma') {
            var propText = $(this).val().slice(0, ($(this).val().length));
            $(this).val(propText + ' ');
            $(this).css('color', '#2e2e2e');
        } else {
            $(this).css('color', '#9b9b9b');
        }
    });

    $('.pub-theme__input').on('blur', function(e) {
        $(this).css('color', '#2e2e2e');
    });

    $('.pub-maininfo__content-input').val('');

    //ADD ARTICLE

    //FEED

    if ($('.feed__article-text').length > 0) {
        console.log($('.feed__article-text').text().length);
        cutText($('.feed__article-text'), 280);
    }


    //FEED

    //MODALS

    $('.sign-in-modal__show-pass, .sign-up-modal__show-pass').on('click', function() {
        $(this).prev().attr('type') === 'password' ?
            $(this).prev().attr('type', 'text').addClass('sign-in-modal__show-pass_showed') :
            $(this).prev().attr('type', 'password').removeClass('sign-in-modal__show-pass_showed');
    });

    $('.sign-buttons__sign-in').on('click', function(e) {
        e.preventDefault();
        showModal($('.sign-in-modal'));
    });

    $('.sign-buttons__sign-up').on('click', function(e) {
        e.preventDefault();
        showModal($('.sign-up-modal'));
    });

    $('.overlay, .modal__close').on('click', function() {
        hideModal();
    });

    $('.pub-period__period-btn').on('click', function() {
        showModal($('.period-modal'));
    });

    $('.period-modal__enter-btn').on('click', function(e) {
        e.preventDefault();
        if (firstMonth && secondMonth) {
            $('.pub-period__period-input').attr('min', $('[data-order = first]').attr('data-month'));
            $('.pub-period__period-input').attr('max', $('[data-order = second]').attr('data-month'));
        }

        hideModal();
    })

    var firstMonth = false;
    var secondMonth = false;

    $('.period-modal__period-table-item').on('click', function() {
        if (!$(this).hasClass('period-modal__period-table-item_selected')) {
            if (!$(this).hasClass('period-modal__period-table-item_disabled')) {
                $(this).addClass('period-modal__period-table-item_selected');
                if (!firstMonth) {
                    $(this).attr('data-order', 'first');
                    firstMonth = true;
                } else if (!secondMonth) {
                    $(this).attr('data-order', 'second');
                    secondMonth = true;
                    selectPeriod($(this), firstMonth, secondMonth);
                } else {
                    $(this).removeClass('period-modal__period-table-item_selected')
                }
            }

        } else if ($(this).hasClass('period-modal__period-table-item_selected')) {
            $(this).removeClass('period-modal__period-table-item_selected');
            var months = $('.period-modal__period-table-item');

            for (var i = 0; i < months.length; i++) {
                $(months[i]).removeClass('period-modal__period-table-item_filled');
            }

            if ($(this).attr('data-order') === 'first') {
                $(this).removeAttr('data-order');
                firstMonth = false;
                $('.pub-period__period-input').attr('min', '');
                $('.pub-period__period-input').attr('max', '');
                for (var i = 0; i < months.length; i++) {
                    $(months[i]).removeClass('period-modal__period-table-item_selected');
                    $(months[i]).removeAttr('data-order');
                    secondMonth = false;
                    $('.pub-period__btn-label').text('Выбрать период');

                }
            } else if ($(this).attr('data-order') === 'second') {
                $(this).removeAttr('data-order');
                secondMonth = false;
                $('.pub-period__btn-label').text('Выбрать период');
                $('.pub-period__period-input').attr('min', '');
                $('.pub-period__period-input').attr('max', '');
            }
        }
    })

    //MODALS
});

function sendForm(form, url) {
    var formName = form.attr('name');
    var $data = $(form).serialize() + '&' + formName + '=1';
    console.log($data);
    $.ajax({
        type: "POST",
        url: url,
        data: $data,
        dataType: 'json',
        success: function(msg) {
            console.log('SUCCESS');
            console.log(msg);
        },
        error: function(msg) {
            console.log('ERROR');
            console.log(msg);
        }
    });
}

function validationPersonalInfo(form) {
    let selects = $(form).find('select');
    let ok = true;
    selects.each(function(i, elem) {
        if (!$(elem).val()) {
            $(elem).closest('.edit-info__input-container').addClass('edit-info__input-container_error');
            ok = false;
        } else {
            $(elem).closest('.edit-info__input-container').removeClass('edit-info__input-container_error');
        }
    });
    if (ok) {
        sendForm(form, 'https://cors-anywhere.herokuapp.com/http://moduli-opencart.ru/users/145');
    }
}


function selectPeriod(month, firstMonth, secondMonth) {
    if (firstMonth && secondMonth) {
        var months = $('.period-modal__period-table-item');
        var start = $('[data-order = first]').attr('data-month');
        var end = $('[data-order = second]').attr('data-month');

        for (var i = start - 1; i < 30; i++) {
            if ($(months[i]).attr('data-month') === end) {
                break;
            } else {
                if (!$(months[i]).hasClass('period-modal__period-table-item_selected')) {
                    $(months[i]).addClass('period-modal__period-table-item_filled');
                }
            }

            if (i > months.length - 1) {
                i = 0;
                if (!$(months[i]).hasClass('period-modal__period-table-item_selected')) {
                    $(months[i]).addClass('period-modal__period-table-item_filled');
                }
            }
        }
        $('.pub-period__btn-label').text($('[data-order = first]').attr('data-alias') +
            ' - ' + $('[data-order = second]').attr('data-alias'));
    }
}

function loadThumbnail(file) {
    if (file.type.indexOf('image', 0) !== -1) {
        var reader = new FileReader();
        reader.onprogress = function() {
            $('.pub-thumbnail__image-label').text('Загрузка...');
        }
        reader.onload = function(event) {
            let dataUri = event.target.result;
            $('.pub-thumbnail__image-label').text('');
            $('.pub-thumbnail__image-preview').attr('src', dataUri);
            $('.pub-thumbnail__image-preview').addClass('pub-thumbnail__image-preview_loaded');
            $('.pub-thumbnail__image').addClass('pub-thumbnail__image_loaded');
            $('.pub-thumbnail__image').removeClass('pub-thumbnail__image_error');
        };

        reader.onerror = function(event) {
            $('.pub-thumbnail__image').addClass('pub-thumbnail__image_error');
        };

        reader.readAsDataURL(file);
        sendFile(file);
    } else {
        $('.pub-thumbnail__image').addClass('pub-thumbnail__image_error');
        $('.pub-thumbnail__image').removeClass('pub-thumbnail__image_loaded');
        $('.pub-thumbnail__image-preview').removeClass('pub-thumbnail__image-preview_loaded');
    }
}

function sendFile(file) {
    let Data = new FormData();

    $.ajax({
        url: 'test.html',
        type: 'post',
        data: Data,
        contentType: false,
        processData: false,
        success: function(data) {
            alert('Файлы были успешно загружены');
        }
    });
};

function cutText(element, len) {
    element.each(function(index, elem) {
        let elemText = $(elem).text();
        if (elemText.length > len) {
            let cutText = elemText.slice(0, len);
            let resultText = cutText.slice(0, cutText.lastIndexOf(' ')) + '...';
            $(elem).text(resultText);
        }
    })
}

function showModal(modal) {
    $('.overlay').removeClass('overlay_disabled');
    modal.removeClass('modal_disabled');
}

function hideModal() {
    $('.overlay').addClass('overlay_disabled');
    $('.modal').addClass('modal_disabled');
}

function onTriggerClick(trigger) {
    if (!trigger.hasClass('trigger_active')) {
        trigger.toggleClass('trigger_active');
        trigger.siblings().removeClass('trigger_active');
    }
}

function socTriggerChange(trigger) {
    if (trigger.parent().hasClass('myprofile-soc__trigger_disabled')) {
        trigger.parent().removeClass('myprofile-soc__trigger_disabled');
        if (trigger.parent().hasClass('myprofile-soc__trigger_ok')) {
            trigger.parent().find('.myprofile-soc__trigger-state').text('работают');
        } else {
            trigger.parent().find('.myprofile-soc__trigger-state').text('работает');
        }
    } else {
        trigger.parent().addClass('myprofile-soc__trigger_disabled');
        if (trigger.parent().hasClass('myprofile-soc__trigger_ok')) {
            trigger.parent().find('.myprofile-soc__trigger-state').text('не подключены');
        } else {
            trigger.parent().find('.myprofile-soc__trigger-state').text('не подключен');
        }
    }
}