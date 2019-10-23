$(function() {

    //BASE

    if ($('.main-menu').length > 0 && $('.main-menu').offset().top > 33) {
        $('.main-menu').addClass('main-menu_scrolled');
    }

    if ($('.nav-menu').length > 0 && $('.nav-menu').offset().top > 100) {
        $('.nav-menu').removeClass('nav-menu_hidden');
        $('.nav-menu').addClass('nav-menu_showed');
    } else {
        $('.nav-menu').removeClass('nav-menu_showed');
    }

    var scrollPos = 0;
    $(window).on('scroll', function(e) {
        var st = $(this).scrollTop();

        if (st > scrollPos) {
            $('.mobile-nav-menu').addClass('mobile-nav-menu_hidden');
            $('.nav-menu').addClass('nav-menu_hidden');
            $('.nav-menu').removeClass('nav-menu_showed');
            if (!$('.mobile-search').hasClass('mobile-search_hidden')) {
                $('.mobile-search').slideUp(300);
            }
        } else {
            $('.mobile-nav-menu').removeClass('mobile-nav-menu_hidden');
            if ($('.nav-menu').length > 0 && $('.nav-menu').offset().top > 66) {
                $('.nav-menu').removeClass('nav-menu_hidden');
                $('.nav-menu').addClass('nav-menu_showed');
            } else {
                $('.nav-menu').removeClass('nav-menu_showed');
            }

            if (!$('.mobile-search').hasClass('mobile-search_hidden')) {
                $('.mobile-search').slideDown(300);
            }
        }
        scrollPos = st;
    });

    $(window).on('scroll', function() {
        if ($('.main-menu').length > 0 && $('.main-menu').offset().top > 33) {
            $('.main-menu').addClass('main-menu_scrolled');
        } else {
            $('.main-menu').removeClass('main-menu_scrolled');
        }
    });

    $('.icons-section__item_events').on('click', function(e) {
        e.preventDefault();
        $('.popup_events').toggleClass('popup_disabled');
    })

    $('.mobile-nav-menu__burger').on('click', function() {
        $(this).addClass('mobile-nav-menu__burger_opened');
        $('.mobile-menu').removeClass('mobile-menu_disabled');
        $('.mobile-overlay').removeClass('overlay_disabled');
        // $('body').addClass('hidden');
    });

    $('.mobile-overlay').on('click', function() {
        $(this).addClass('overlay_disabled');
        $('.mobile-nav-menu__burger').removeClass('mobile-nav-menu__burger_opened');
        $('.mobile-menu').addClass('mobile-menu_disabled');
        $('body').removeClass('hidden');
    });

    $('.mobile-nav-menu__item_search').on('click', function(e) {
        e.preventDefault();
        $('.mobile-search').toggleClass('mobile-search_hidden');
    });

    $('.nav-menu__item').on('mouseover', function() {
        $(this).find('.child-list').addClass('enable');
    });

    $('.nav-menu__item').on('mouseout', function(e) {
        if ($(e.currentTarget) !== $(this)) {
            $(this).find('.child-list').removeClass('enable');
        }
    });

    if ($('.actions__add-friend').hasClass('actions__add-friend_sended')) {
        $('.actions__add-friend').text('Заявка отправлена');
    } else if ($('.actions__add-friend').hasClass('actions__add-friend_added')) {
        $('.actions__add-friend').text('Удалить из друзей');
    }

    $('.main-content').on('click', function(e) {
        if ($(e.target).closest('.likes-btn__icon').length > 0) {
            e.preventDefault();
            $(e.target).closest('.likes-btn').toggleClass('likes-btn_liked-anim');
            $(e.target).closest('.likes-btn').toggleClass('likes-btn_liked');
        }
    })

    //BASE END

    // MYPROFILE
    var username = $('.user-data__username');

    $('.user-data__text').on('click', function(e) {
        if ($(e.target).parent().is('.user-data__edit') || $(e.target).parent().is('.user-data__edit-svg')) {
            username.detach();
            var save = '<span class="user-data__text_save"><span class="svg user-data__text_save-svg" data-src="/templates/vosaduly/images/icons/uil-check-circle.svg"></span></span>'
            var close = '<span class="user-data__text_close"><span class="svg user-data__text_close-svg" data-src="/templates/vosaduly/images/icons/uil-check-circle2.svg"></span></span>'
            $('.user-data__edit').hide();
            $('<input class="user-data__text_edited" type="text" value="' + username.text() + '">').insertAfter($('.user-data__edit'));
            $('.user-data__text').append($(save));
            $('.user-data__text').append($(close));
            SVGrefresh();
        }

        if ($(e.target).parent().is($('.user-data__text_save')) || $(e.target).parent().is($('.user-data__text_save-svg'))) {
            var newUsername = $('.user-data__text_edited').val();

            if (newUsername.split(' ')[0] && newUsername.split(' ')[1]) {
                $('.user-data__text').prepend(username.html(newUsername.split(' ')[0] + ' ' + newUsername.split(' ')[1]));
                $('.user-data__text_edited').remove();
                $('.user-data__text_save, .user-data__text_close').remove();
                $('.user-data__edit').show();
                var data = {
                    name: newUsername.split(' ')[0],
                    surname: newUsername.split(' ')[1]
                }

                console.log(data)
                $.ajax({
                    type: "POST",
                    url: window.location.pathname,
                    data: data,
                    success: function(data) {
                        showNoOverlayModal($('.success-modal'));
                    },
                    error: function(error) {
                        showNoOverlayModal($('.error-modal'));
                    },
                    dataType: 'json'
                });
            }
        }

        if ($(e.target).parent().is($('.user-data__text_close')) || $(e.target).parent().is($('.user-data__text_close-svg'))) {
            $('.user-data__text').prepend(username)
            $('.user-data__text_edited').remove();
            $('.user-data__text_save, .user-data__text_close').remove();
            $('.user-data__edit').show();
        }
    });

    $('.user-data__avatar-changeavatar-input').on('focus', function() {
        $('.user-data__avatar-changephoto').addClass('user-data__avatar-changephoto_focus');
    });

    $('.user-data__avatar-changeavatar-input').on('blur', function() {
        $('.user-data__avatar-changephoto').removeClass('user-data__avatar-changephoto_focus');
    });

    $('.user-data__avatar-changebg-input').on('focus', function() {
        $('.user-data__avatar-changebg').addClass('user-data__avatar-changephoto_focus');
    });

    $('.user-data__avatar-changebg-input').on('blur', function() {
        $('.user-data__avatar-changebg').removeClass('user-data__avatar-changephoto_focus');
    });

    $('.profile-menu__item').on('click', function(e) {
        if ($(this).find('.profile-menu__submenu').length > 0) {
            $(this).toggleClass('profile-menu__item_expand');
            e.preventDefault();
        }
    });

    $('.myprofile__submenu-item').on('click', function(e) {
        e.preventDefault();
        if (!$(this).hasClass('myprofile__submenu-item_active')) {
            $(this).toggleClass('myprofile__submenu-item_active');
            $(this).siblings().removeClass('myprofile__submenu-item_active');
        }

        if ($(this).hasClass('myprofile__submenu-item_aboutme')) {
            $('.myprofile-content').removeClass('myprofile-section_disabled');
            $('.myprofile-soc, .myprofile-contacts').addClass('myprofile-section_disabled');
        } else if ($(this).hasClass('myprofile__submenu-item_soc')) {
            $('.myprofile-content, .myprofile-contacts').addClass('myprofile-section_disabled');
            $('.myprofile-soc').removeClass('myprofile-section_disabled');
        } else if ($(this).hasClass('myprofile__submenu-item_contacts')) {
            $('select').trigger('refresh');
            $('.myprofile-content, .myprofile-soc').addClass('myprofile-section_disabled');
            $('.myprofile-contacts').removeClass('myprofile-section_disabled');
        }
    });

    $('.edit-info__form').on('submit', function(e) {
        e.preventDefault();
        validationPersonalInfo($('.edit-info__form'));
    });

    $('.myprofile-contacts__form').on('submit', function(e) {
        e.preventDefault();
        sendForm($(this), window.location.pathname);
        $('.myprofile-contacts__contact-state_address').text($(this).find('.myprofile-contacts__form-input_address').val());
        $('.myprofile-contacts__contact-state_phone').text($(this).find('.myprofile-contacts__form-input_phone').val());
    });

    $('.edit-info__select').on('focus', function() {
        $(this).closest('.jq-selectbox').find('.jq-selectbox__select').addClass('select_focused');
    });

    $('.edit-info__select').on('blur', function() {
        $(this).closest('.jq-selectbox').find('.jq-selectbox__select').removeClass('select_focused');
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

    $('.myprofile-soc__trigger-trigger').on('click', function() {
        socTriggerChange($(this))
    });

    if ($('.header-menu__container').length > 0 && $(window).width() < 1050) {
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
                    items: 2.7,
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
    }

    //MYPROFILE END

    //FRIENDS

    $('.friends__menu-item').on('click', function(e) {
        $(this).addClass('friends__menu-item_active');
        $(this).siblings().removeClass('friends__menu-item_active');
        if ($(this).hasClass('friends__menu-item_friends')) {
            $('.friends__friends-list').removeClass('list_disabled');
            $('.friends__followers-list, .friends__follows-list').addClass('list_disabled');
        } else if ($(this).hasClass('friends__menu-item_followers')) {
            $('.friends__friends-list, .friends__follows-list').addClass('list_disabled');
            $('.friends__followers-list').removeClass('list_disabled');
        } else if ($(this).hasClass('friends__menu-item_follows')) {
            $('.friends__friends-list, .friends__followers-list').addClass('list_disabled');
            $('.friends__follows-list').removeClass('list_disabled');
        }
        e.preventDefault();
    });

    //FRIENDS END

    //JOURNAL

    if ($('.blogs-menu__item-text').length > 0) {
        cutText($('.blogs-menu__item-text'), 60);
    }

    if ($('.journal__article-text').length > 0) {
        cutText($('.journal__article-text'), 550);
    }

    $('.blogs-menu__next').on('click', function(e) {
        e.preventDefault();
        $('.blogs-menu__prev').removeClass('blogs-menu__prev_disabled');
        if ($('.blogs-menu__trigger_best').hasClass('trigger_active') &&
            $('.blogs-menu__best').find('.blogs-menu__item').length > 4) {
            SidebarScrollDown(
                $('.blogs-menu__best'),
                '.blogs-menu__item',
                600,
                $('.blogs-menu__best').attr('data-page'),
                4,
                $('.blogs-menu__prev'),
                $('.blogs-menu__next'),
                'blogs-menu__prev_disabled',
                'blogs-menu__next_disabled'
            );
        }

        if ($('.blogs-menu__trigger_new').hasClass('trigger_active') &&
            $('.blogs-menu__new').find('.blogs-menu__item').length > 4) {
            SidebarScrollDown(
                $('.blogs-menu__new'),
                '.blogs-menu__item',
                600,
                $('.blogs-menu__new').attr('data-page'),
                4,
                $('.blogs-menu__prev'),
                $('.blogs-menu__next'),
                'blogs-menu__prev_disabled',
                'blogs-menu__next_disabled'
            );
        }
    });

    $('.blogs-menu__prev').on('click', function(e) {
        e.preventDefault();
        $('.blogs-menu__next').removeClass('blogs-menu__next_disabled');
        if ($('.blogs-menu__trigger_best').hasClass('trigger_active') &&
            $('.blogs-menu__best').find('.blogs-menu__item').length > 4) {
            SidebarScrollUp(
                $('.blogs-menu__best'),
                '.blogs-menu__item',
                600,
                $('.blogs-menu__best').attr('data-page'),
                4,
                $('.blogs-menu__prev'),
                $('.blogs-menu__next'),
                'blogs-menu__prev_disabled',
                'blogs-menu__next_disabled'
            );
        }

        if ($('.blogs-menu__trigger_new').hasClass('trigger_active') &&
            $('.blogs-menu__new').find('.blogs-menu__item').length > 4) {
            SidebarScrollUp(
                $('.blogs-menu__new'),
                '.blogs-menu__item',
                600,
                $('.blogs-menu__new').attr('data-page'),
                4,
                $('.blogs-menu__prev'),
                $('.blogs-menu__next'),
                'blogs-menu__prev_disabled',
                'blogs-menu__next_disabled'
            );
        }
    });

    $('.blogs-menu__trigger').on('click', function(e) {
        e.preventDefault();
        onTriggerClick($(this));

        if ($('.blogs-menu__trigger_new').hasClass('trigger_active')) {
            refreshArrows(
                $('.blogs-menu__new'),
                '.blogs-menu__item',
                $('.blogs-menu__prev'),
                $('.blogs-menu__next'),
                'blogs-menu__prev_disabled',
                'blogs-menu__next_disabled',
                4,
                $('.blogs-menu__new').attr('data-page')
            );

            $('.blogs-menu__new').removeClass('blogs-menu_hidden');
            $('.blogs-menu__best').addClass('blogs-menu_hidden');
        } else {
            refreshArrows(
                $('.blogs-menu__best'),
                '.blogs-menu__item',
                $('.blogs-menu__prev'),
                $('.blogs-menu__next'),
                'blogs-menu__prev_disabled',
                'blogs-menu__next_disabled',
                4,
                $('.blogs-menu__best').attr('data-page')
            );
            $('.blogs-menu__new').addClass('blogs-menu_hidden');
            $('.blogs-menu__best').removeClass('blogs-menu_hidden');
        }
    });

    //MODERATION

    $('.moderation-header__tab').on('click', function() {
        if (!$(this).hasClass('tab_selected')) {
            $(this).toggleClass('tab_selected');
            $(this).siblings().removeClass('tab_selected');
        }
    });

    if ($('.moderation-articles__article-title').length > 0) {
        cutText($('.moderation-articles__article-title'), 76);
    };

    //MODERATION END

    // ADD ARTICLE

    setTimeout(function() {
        if ($('.pub-maininfo__selected-categories').length > 0) {
            $('.pub-maininfo__category-input_main-category option').each((i, item1) => {
                $('.pub-maininfo__category-secoundary-inputs-container').find('input[type="hidden"]').each((j, item2) => {
                    if ($(item1).val() == $(item2).val()) {
                        $('.pub-maininfo__category-input_additional-category li').each((k, item3) => {
                            if ($(item1).text() == $(item3).text()) {
                                $(item3).addClass('category_selected');
                                $('.pub-maininfo__selected-categories').append('<span class="pub-maininfo__selected-category">' + $(item1).text() + '</span>')
                            }
                        })
                    }
                });
            });

            $('.pub-maininfo__category-secoundary-inputs-container').find('input[type="hidden"]').each((i, item3) => {
                if ($(item3).val() != '') {
                    $('.pub-maininfo__selected-category').each((j, item4) => {
                        $(item4).attr('data-value', $(item3).val());
                        return false;
                    });
                }
            });
        }
    }, 100);

    var firstMonth = false;
    var secondMonth = false;

    if ($('input[name="periodmin"]').val() != 0 && $('input[name="periodmax"]').val() != 0) {
        var months = $('.period-modal__period-table-item');
        var start = +$('[data-order = first]').attr('data-month');
        var end = +$('[data-order = second]').attr('data-month');
        firstMonth = true;
        secondMonth = true;

        $('[data-order=first], [data-order=second]').addClass('period-modal__period-table-item_selected');
        for (var i = start - 1; i < 30; i++) {
            if ($(months[i]).attr('data-month') == end) {
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

    if ($('.addarticle-select').length > 0) {
        $('select').styler();
    }

    $('select.addarticle-select').on('focus', function() {
        $(this).closest('.jq-selectbox').find('.jq-selectbox__select').addClass('addarticle-select_focused');
    });

    $('select.addarticle-select').on('blur', function() {
        $(this).closest('.jq-selectbox').find('.jq-selectbox__select').removeClass('addarticle-select_focused');
    });

    $('.pub-rules__title').on('click', function() {
        if ($(window).width() < 576) {
            $(this).parent().toggleClass('pub-rules_showed');
        }
    });

    $('.pub-maininfo__category-input_main-category .jq-selectbox__dropdown li').on('click', function() {
        $('.pub-maininfo__category-input_additional-category .jq-selectbox__dropdown li').each((i, item) => {
            $(item).removeClass('category_selected');
            $(item).removeClass('category_disabled');

            if ($(item).text() == $(this).text()) {
                $(item).addClass('category_disabled');
            }
        });

        $('.pub-maininfo__selected-categories').empty();
        $('.pub-maininfo__category-secoundary-inputs-container input[type="hidden"]').val('')
    });

    $('.pub-maininfo__category-secoundary-inputs-container').on('click', function(e) {
        var selectedCount = 0;
        var ind = 0;
        if ($(e.target).is($('.pub-maininfo__category-input_additional-category .jq-selectbox__dropdown li'))) {
            $(e.target).parent().children().each((i, item) => {
                if ($(item).hasClass('category_selected')) {
                    ind = $('.pub-maininfo__category-input_additional-category option:eq(' + i + ')').val();
                    selectedCount++;
                }
            });

            if ($(e.target).hasClass('category_selected') && !$(e.target).hasClass('category_disabled')) {
                $('.pub-maininfo__selected-categories').find($('.pub-maininfo__selected-category')).each((i, item) => {
                    if ($(e.target).text() == $(item).text()) {
                        $(item).remove();
                    }
                });
                $(e.target).removeClass('category_selected');
                $('.pub-maininfo__category-secoundary-inputs-container').find('input[id="category' + String(selectedCount) + '"]').val('');
                selectedCount--;
            } else if (!$(e.target).hasClass('category_selected') && !$(e.target).hasClass('category_disabled') && selectedCount < 4) {


                $(e.target).addClass('category_selected');
                var $optionValue = $(e.target).closest('.pub-maininfo__category-input_additional-category').find('option:eq(' + String($(e.target).index() + ')')).attr('value');
                $('.pub-maininfo__category-secoundary-inputs-container').find('input[type="hidden"]').each((i, item) => {
                    if ($(item).val() == '') {
                        $('.pub-maininfo__selected-categories').append('<span class="pub-maininfo__selected-category" data-value="' + $optionValue + '">' + $(e.target).text() + '</span>');
                        // $('.pub-maininfo__selected-categories').attr('data-value', )
                        $(item).val($optionValue);
                        return false;
                    }
                });
            }
        } else if ($(e.target).is($('.pub-maininfo__selected-category'))) {
            $(e.target).closest($('.pub-maininfo__category-secoundary-inputs-container'))
                .find($('.jq-selectbox__dropdown li')).each((i, item) => {
                    if ($(item).hasClass('category_selected')) {
                        selectedCount++;
                    }

                    if ($(item).text() == $(e.target).text()) {
                        $(item).removeClass('category_selected');
                    }


                });
            $(e.target).remove();

            $('.pub-maininfo__category-secoundary-inputs-container input[type="hidden"]').each((k, item3) => {
                var res = false;
                if ($(item3).val() != '') {
                    $('.pub-maininfo__selected-category').each((j, item1) => {

                        if ($(item3).val() == $(item1).attr('data-value')) {
                            res = true;
                            return false;
                        }
                    });
                    if (!res) {
                        $(item3).val('');
                        selectedCount--;
                        return false;
                    }
                }
            })
        }
    });

    $('.addarticle-form').on('submit', function(e) {
        tinyMCE.triggerSave();
    });

    if ($('.pub-thumbnail__image img').attr('src')) {
        $('.pub-thumbnail__image-preview').addClass('pub-thumbnail__image-preview_loaded');
        $('.pub-thumbnail__image').addClass('pub-thumbnail__image_loaded');
        $('.pub-thumbnail__image').removeClass('pub-thumbnail__image_error');
    }

    //ADD ARTICLE END

    //FEED

    if ($('.feed__article-text').length > 0) {
        cutText($('.feed__article-text'), 280);
    };

    if ($('.questions__item-content').length > 0) {
        cutText($('.questions__item-content'), 70);
    }

    var href = '';

    $('.report-btn').on('click', function(e) {
        e.preventDefault();
        $(this).find($('.report-popup')).toggleClass('popup_disabled');
        href = $(this).attr('href');
    });

    $('.report-popup').on('click', function() {
        showModal($('.report-modal'))
    });

    $('.report-modal__form').on('submit', function(e) {
        e.preventDefault();
        $('.report-modal').addClass('modal_disabled');
        var formName = $(this).attr('name');
        var $data = $(this).serialize() + '&' + 'href=' + href + '&'+ formName + '=1';
        console.log($data);
        $.ajax({
            type: "POST",
            url: window.location.pathname,
            data: $data,
            success: function(data) {
                showNoOverlayModal($('.success-modal'));
                console.log(data);
            },
            error: function(error) {
                showNoOverlayModal($('.error-modal'));
                console.log(error);
            },
            dataType: 'json'
        });
    })

    $('.questions__trigger').on('click', function(e) {
        e.preventDefault();
        onTriggerClick($(this));

        if ($('.questions__trigger_new').hasClass('trigger_active')) {
            refreshArrows(
                $('.questions__items_new'),
                '.questions__item',
                $('.questions__prev'),
                $('.questions__next'),
                'questions__prev_disabled',
                'questions__next_disabled',
                5,
                $('.questions__items_new').attr('data-page')
            );
            $('.questions__items_new').removeClass('questions__items_hidden');
            $('.questions__items_best, .questions__items_noanswer').addClass('questions__items_hidden');
        } else if ($('.questions__trigger_best').hasClass('trigger_active')) {
            refreshArrows(
                $('.questions__items_best'),
                '.questions__item',
                $('.questions__prev'),
                $('.questions__next'),
                'questions__prev_disabled',
                'questions__next_disabled',
                5,
                $('.questions__items_best').attr('data-page')
            );
            $('.questions__items_new, .questions__items_noanswer').addClass('questions__items_hidden');
            $('.questions__items_best').removeClass('questions__items_hidden');
        } else {
            refreshArrows(
                $('.questions__items_noanswer'),
                '.questions__item',
                $('.questions__prev'),
                $('.questions__next'),
                'questions__prev_disabled',
                'questions__next_disabled',
                5,
                $('.questions__items_noanswer').attr('data-page')
            );
            $('.questions__items_new, .questions__items_best').addClass('questions__items_hidden');
            $('.questions__items_noanswer').removeClass('questions__items_hidden');
        }
    });

    $('.questions__next').on('click', function(e) {
        e.preventDefault();
        $('.questions__prev').removeClass('questions__prev_disabled');
        if ($('.questions__trigger_new').hasClass('trigger_active') &&
            $('.questions__items_new').find('.questions__item').length > 5) {
            SidebarScrollDown(
                $('.questions__items_new'),
                '.questions__item',
                660,
                $('.questions__items_new').attr('data-page'),
                5,
                $('.questions__prev'),
                $('.questions__next'),
                'questions__prev_disabled',
                'questions__next_disabled'
            );
        }

        if ($('.questions__trigger_best').hasClass('trigger_active') &&
            $('.questions__items_best').find('.questions__item').length > 5) {
            SidebarScrollDown(
                $('.questions__items_best'),
                '.questions__item',
                660,
                $('.questions__items_best').attr('data-page'),
                5,
                $('.questions__prev'),
                $('.questions__next'),
                'questions__prev_disabled',
                'questions__next_disabled'
            );
        }

        if ($('.questions__trigger_noanswer').hasClass('trigger_active') &&
            $('.questions__items_noanswer').find('.questions__item').length > 5) {
            SidebarScrollDown(
                $('.questions__items_noanswer'),
                '.questions__item',
                660,
                $('.questions__items_noanswer').attr('data-page'),
                5,
                $('.questions__prev'),
                $('.questions__next'),
                'questions__prev_disabled',
                'questions__next_disabled'
            );
        }
    });

    $('.questions__prev').on('click', function(e) {
        e.preventDefault();
        $('.questions__next').removeClass('questions__next_disabled');
        if ($('.questions__trigger_new').hasClass('trigger_active') &&
            $('.questions__items_new').find('.questions__item').length > 5) {
            SidebarScrollUp(
                $('.questions__items_new'),
                '.questions__item',
                660,
                $('.questions__items_new').attr('data-page'),
                5,
                $('.questions__prev'),
                $('.questions__next'),
                'questions__prev_disabled',
                'questions__next_disabled'
            );
        }

        if ($('.questions__trigger_best').hasClass('trigger_active') &&
            $('.questions__items_best').find('.questions__item').length > 5) {
            SidebarScrollUp(
                $('.questions__items_best'),
                '.questions__item',
                660,
                $('.questions__items_best').attr('data-page'),
                5,
                $('.questions__prev'),
                $('.questions__next'),
                'questions__prev_disabled',
                'questions__next_disabled'
            );
        }

        if ($('.questions__trigger_noanswer').hasClass('trigger_active') &&
            $('.questions__items_noanswer').find('.questions__item').length > 5) {
            SidebarScrollUp(
                $('.questions__items_noanswer'),
                '.questions__item',
                660,
                $('.questions__items_noanswer').attr('data-page'),
                5,
                $('.questions__prev'),
                $('.questions__next'),
                'questions__prev_disabled',
                'questions__next_disabled'
            );
        }
    });

    $('.authors__trigger').on('click', function(e) {
        e.preventDefault();
        onTriggerClick($(this));

        if ($('.authors__trigger_articles').hasClass('trigger_active')) {
            refreshArrows(
                $('.authors__items_articles'),
                '.authors__item',
                $('.authors__prev'),
                $('.authors__next'),
                'authors__prev_disabled',
                'authors__next_disabled',
                5,
                $('.authors__items_articles').attr('data-page')
            );
            $('.authors__items_articles').removeClass('authors__items_hidden');
            $('.authors__items_comments').addClass('authors__items_hidden');
        } else {
            refreshArrows(
                $('.authors__items_comments'),
                '.authors__item',
                $('.authors__prev'),
                $('.authors__next'),
                'authors__prev_disabled',
                'authors__next_disabled',
                5,
                $('.authors__items_comments').attr('data-page')
            );
            $('.authors__items_articles').addClass('authors__items_hidden');
            $('.authors__items_comments').removeClass('authors__items_hidden');
        }
    });

    $('.authors__next').on('click', function(e) {
        e.preventDefault();
        $('.authors__prev').removeClass('authors__prev_disabled');
        if ($('.authors__trigger_articles').hasClass('trigger_active') &&
            $('.authors__items_articles').find('.authors__item').length > 5) {
            SidebarScrollDown(
                $('.authors__items_articles'),
                '.authors__item',
                480,
                $('.authors__items_articles').attr('data-page'),
                5,
                $('.authors__prev'),
                $('.authors__next'),
                'authors__prev_disabled',
                'authors__next_disabled'
            );
        }

        if ($('.authors__trigger_comments').hasClass('trigger_active') &&
            $('.authors__items_comments').find('.authors__item').length > 5) {
            SidebarScrollDown(
                $('.authors__items_comments'),
                '.authors__item',
                480,
                $('.authors__items_comments').attr('data-page'),
                5,
                $('.authors__prev'),
                $('.authors__next'),
                'authors__prev_disabled',
                'authors__next_disabled'
            );
        }
    });

    $('.authors__prev').on('click', function(e) {
        e.preventDefault();
        $('.authors__next').removeClass('authors__next_disabled');
        if ($('.authors__trigger_articles').hasClass('trigger_active') &&
            $('.authors__items_articles').find('.authors__item').length > 5) {
            SidebarScrollUp(
                $('.authors__items_articles'),
                '.authors__item',
                480,
                $('.authors__items_articles').attr('data-page'),
                5,
                $('.authors__prev'),
                $('.authors__next'),
                'authors__prev_disabled',
                'authors__next_disabled'
            );
        }

        if ($('.authors__trigger_comments').hasClass('trigger_active') &&
            $('.authors__items_comments').find('.authors__item').length > 5) {
            SidebarScrollUp(
                $('.authors__items_comments'),
                '.authors__item',
                480,
                $('.authors__items_comments').attr('data-page'),
                5,
                $('.authors__prev'),
                $('.authors__next'),
                'authors__prev_disabled',
                'authors__next_disabled'
            );
        }
    });

    $('.experience__next').on('click', function(e) {

        e.preventDefault();
        $('.experience__prev').removeClass('experience__prev_disabled');
        if ($('.experience__items').find('.experience__item').length > 6) {
            SidebarScrollDown(
                $('.experience__items'),
                '.experience__item',
                670,
                $('.experience__items').attr('data-page'),
                6,
                $('.experience__prev'),
                $('.experience__next'),
                'experience__prev_disabled',
                'experience__next_disabled'
            );
        }
    });

    $('.experience__prev').on('click', function(e) {
        e.preventDefault();
        $('.experience__next').removeClass('experience__next_disabled');
        if ($('.experience__items').find('.experience__item').length > 6) {
            SidebarScrollUp(
                $('.experience__items'),
                '.experience__item',
                670,
                $('.experience__items').attr('data-page'),
                6,
                $('.experience__prev'),
                $('.experience__next'),
                'experience__prev_disabled',
                'experience__next_disabled'
            );
        }
    });

    $('.myprofile__tabs-tab').on('click', function(e) {
        e.preventDefault();
        if (!$(this).hasClass('myprofile__tabs-tab_active')) {
            $(this).addClass('myprofile__tabs-tab_active');
            $(this).siblings().removeClass('myprofile__tabs-tab_active');

            if ($(this).hasClass('feed__tabs-tab_allfeed')) {
                $('.myprofile__submenu_myfeed').addClass('myprofile__submenu_hidden');
                $('.myprofile__submenu_allfeed').removeClass('myprofile__submenu_hidden');
                $('.feed_allfeed').removeClass('feed_hidden');
                $('.feed_myfeed').addClass('feed_hidden');
            } else {
                $('.myprofile__submenu_myfeed').removeClass('myprofile__submenu_hidden');
                $('.myprofile__submenu_allfeed').addClass('myprofile__submenu_hidden');
                $('.feed_allfeed').addClass('feed_hidden');
                $('.feed_myfeed').removeClass('feed_hidden');
            }
        }
    })

    //FEED END

    //MODALS

    $('.sign-in-modal__show-pass, .sign-up-modal__show-pass').on('click', function() {
        $(this).prev().attr('type') === 'password' ?
            $(this).prev().attr('type', 'text').addClass('sign-in-modal__show-pass_showed') :
            $(this).prev().attr('type', 'password').removeClass('sign-in-modal__show-pass_showed');
    });

    $('.sign-buttons__sign-in, .mobile-menu__sign-in').on('click', function(e) {
        e.preventDefault();
        showModal($('.sign-in-modal'));
    });

    $('.sign-buttons__sign-up, .mobile-menu__sign-up').on('click', function(e) {
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
            $('[data-order = first]').attr('data-month').length == 1 ?
                $('input[name="periodmin"]').attr('value', 0 + $('[data-order = first]').attr('data-month')) :
                $('input[name="periodmin"]').attr('value', $('[data-order = first]').attr('data-month'));
            $('[data-order = second]').attr('data-month').length == 1 ?
                $('input[name="periodmax"]').attr('value', 0 + $('[data-order = second]').attr('data-month')) :
                $('input[name="periodmax"]').attr('value', $('[data-order = second]').attr('data-month'));
        }

        hideModal();
    });

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
                $('input[name="periodmin"]').attr('value', '');
                $('input[name="periodmax"]').attr('value', '');
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
                $('input[name="periodmin"]').attr('value', '');
                $('input[name="periodmax"]').attr('value', '');
            }
        }
    });

    $('.error-modal-btn, .success-modal-btn').on('click', function(e) {
        e.preventDefault();
        hideNoOverlayModal($('.modal'));
    })

    //MODALS END

    // ANOTHER PROFILE

    if ($(window).width() < 1035) {
        replaceContacts();
    } else {
        replaceContactsBack();
    }

    $(window).on('resize', function() {
        if ($(window).width() < 1035) {
            replaceContacts();
        } else {
            replaceContactsBack();
        }
    })

    // ANOTHER PROFILE END
});

function replaceContactsBack() {
    var contacts = $('.profile-menu__contacts');
    contacts.detach();
    $('.left-sidebar').append(contacts);
    $('.actions').removeClass('actions_withcontacts');
}

function replaceContacts() {
    var contacts = $('.profile-menu__contacts');
    contacts.detach();
    $('.actions').prepend(contacts);
    $('.actions').addClass('actions_withcontacts');
}

function sendForm(form, url) {
    var formName = form.attr('name');
    var $data = $(form).serialize() + '&' + formName + '=1';
    console.log($data);
    $.ajax({
        type: "POST",
        url: url,
        data: $data,
        success: function(data) {
            showNoOverlayModal($('.success-modal'));
            console.log(data);
        },
        error: function(error) {
            showNoOverlayModal($('.error-modal'));
            console.log(error);
        },
        dataType: 'json'
    });
}

function showNoOverlayModal(modal) {
    $('.overlay').addClass('overlay_transparent');
    $('.overlay').removeClass('overlay_disabled');
    modal.removeClass('modal_disabled');
    modal.animate({ 'opacity': '1' }, 300);
    setTimeout(() => {
        hideNoOverlayModal(modal);
    }, 3000)
}

function hideNoOverlayModal(modal) {
    $('.overlay').addClass('overlay_disabled');
    $('.overlay').removeClass('overlay_transparent');
    modal.animate({ 'opacity': '0' }, 300, function() {
        modal.addClass('modal_disabled');
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
        sendForm(form, window.location.pathname);
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
    });
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

function SidebarScrollDown(container, itemSelector, trackHeight, page, pageSize, arrowPrev, arrowNext, arrowPrevDisabledClass, arrowNextDisabledClass) {
    if (+page <= 2) {
        container.find(itemSelector)
            .css({ 'transform': 'translateY(-' + String(+trackHeight * +page) + 'px)' });
        container.attr('data-page', +page + 1);
        if (+page === 2) {
            arrowNext.addClass(arrowNextDisabledClass);
        }
    }

    refreshArrows(
        container,
        itemSelector,
        arrowPrev,
        arrowNext,
        arrowPrevDisabledClass,
        arrowNextDisabledClass,
        pageSize,
        container.attr('data-page')
    );
}

function SidebarScrollUp(container, itemSelector, trackHeight, page, pageSize, arrowPrev, arrowNext, arrowPrevDisabledClass, arrowNextDisabledClass) {
    if (page > 1) {
        let translateMatrix = container.find(itemSelector).first().css('transform');
        let translateNum = +translateMatrix.slice(translateMatrix.lastIndexOf(' ') + 1, -1);
        container.find(itemSelector)
            .css({ 'transform': 'translateY(' + String(translateNum + +trackHeight) + 'px)' });
        translateNum = +translateNum + +trackHeight;
        container.attr('data-page', page - 1);
        if (+container.attr('data-page') === 1) {
            arrowPrev.addClass(arrowPrevDisabledClass);
        }
    }

    refreshArrows(
        container,
        itemSelector,
        arrowPrev,
        arrowNext,
        arrowPrevDisabledClass,
        arrowNextDisabledClass,
        pageSize,
        container.attr('data-page')
    );
}

function refreshArrows(
    container,
    itemSelector,
    arrowPrev,
    arrowNext,
    arrowPrewDisabledClass,
    arrowNextDisabledClass,
    pageSize,
    currPage) {
    if (container.find(itemSelector).length <= pageSize) {
        arrowPrev.addClass(arrowPrewDisabledClass);
        arrowNext.addClass(arrowNextDisabledClass);
    } else if (+currPage === 1) {
        arrowPrev.addClass(arrowPrewDisabledClass);
        arrowNext.removeClass(arrowNextDisabledClass);
    } else if (+currPage === 2) {
        arrowPrev.removeClass(arrowPrewDisabledClass);
        arrowNext.removeClass(arrowNextDisabledClass);
    } else {
        arrowPrev.removeClass(arrowPrewDisabledClass);
        arrowNext.addClass(arrowNextDisabledClass);
    }
}