$(function(){
	$('.profile-menu__item').on('click', function(e) {
		if($(this).find('.profile-menu__submenu').length > 0) {
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

		if($(this).hasClass('myprofile__submenu-item_aboutme')) {
			$('.myprofile-content').removeClass('myprofile-section_disabled');
			$('.myprofile-soc').addClass('myprofile-section_disabled');
			$('.myprofile-contacts').addClass('myprofile-section_disabled')
		} else if($(this).hasClass('myprofile__submenu-item_soc')) {
			$('.myprofile-content').addClass('myprofile-section_disabled');
			$('.myprofile-soc').removeClass('myprofile-section_disabled');
			$('.myprofile-contacts').addClass('myprofile-section_disabled')
		} else if($(this).hasClass('myprofile__submenu-item_contacts')) {
			$('.myprofile-content').addClass('myprofile-section_disabled');
			$('.myprofile-soc').addClass('myprofile-section_disabled');
			$('.myprofile-contacts').removeClass('myprofile-section_disabled')
		}
	});

	$('.actions__add-friend').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('actions__add-friend_sended');
		$(this).hasClass('actions__add-friend_sended') ? 
		$(this).text('Заявка отправлена') : $(this).text('Добавить в друзья');
	})

	$('.groups-menu__trigger').on('click', function(e) {
		e.preventDefault();
		onTriggerClick($(this));

		if($(this).hasClass('groups-menu__trigger_new')) {
			$('.groups-menu__new-items').removeClass('groups-menu__items_disabled');
			$('.groups-menu__best-items').addClass('groups-menu__items_disabled');
		} else if ($(this).hasClass('groups-menu__trigger_best')){
			$('.groups-menu__best-items').removeClass('groups-menu__items_disabled');
			$('.groups-menu__new-items').addClass('groups-menu__items_disabled');
		}	
	});

	$('.online-report__trigger').on('click', function(e) {
		e.preventDefault();
		onTriggerClick($(this));

		if($(this).hasClass('online-report__trigger_events')) {
			$('.online-report__events-items').removeClass('online-report__items_disabled');
			$('.online-report__news-items').addClass('online-report__items_disabled');
		} else if ($(this).hasClass('online-report__trigger_news')){
			$('.online-report__news-items').removeClass('online-report__items_disabled');
			$('.online-report__events-items').addClass('online-report__items_disabled');
		}	
	});

	$('.friends__menu-item').on('click', function(e) {
		$(this).addClass('friends__menu-item_active');
		$(this).siblings().removeClass('friends__menu-item_active');
		e.preventDefault();
	});

	$('select[name="country"]').on('change', function (e) {
		$('select[name="region"]').removeAttr('disabled').parent().removeClass('edit-select_disabled');
	});

	$('select[name="region"]').on('change', function (e) {
		$('select[name="city"]').removeAttr('disabled').parent().removeClass('edit-select_disabled');
	});

	$('.myprofile-soc__trigger-trigger').on('click', function() {
		socTriggerChange($(this))
	})
	
	if($('.header-menu__container').length > 0 && $(window).width() < 1050) {
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
	} else if($('.header-menu__container').length > 0 && $(window).width() >= 1050){
		$('.header-menu__container').trigger('destroy.owl.carousel');
		$('.header-menu__item').on('click', function(e) {
			e.preventDefault();
			$(this).siblings().removeClass('header-menu__item_active');
			$(this).addClass('header-menu__item_active');
		});
	}

	if($('.myprofile-contacts__form-input_phone').length > 0) {
		$('.myprofile-contacts__form-input_phone').val('+7');
		$('.myprofile-contacts__form-input_phone').on('keyup', function() {
			if($(this).val().length < 2 || !$(this).val().startsWith('+7')) {
				$(this).val('+7');
			}
		})
	}	

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

	// console.log($('.moderation-articles__article-title:first').text().length);

	// truncText('.moderation-articles__article-title', 77);

	//MODERATION

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

	//MODALS
});

String.prototype.trunc = function(n){
	return this.substr(0,n-1)+(this.length>n?'...':'');
};

function truncText(selector, substr){
	if($(selector).length > 0){
		$(selector).each(function(i, item){
			$(this).text($(this).text().trunc(substr))
		});
	}
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
	if(trigger.parent().hasClass('myprofile-soc__trigger_disabled')) {
		trigger.parent().removeClass('myprofile-soc__trigger_disabled');
		if(trigger.parent().hasClass('myprofile-soc__trigger_ok')) {
			trigger.parent().find('.myprofile-soc__trigger-state').text('работают');
		} else {		
			trigger.parent().find('.myprofile-soc__trigger-state').text('работает');
		}
	} else {
		trigger.parent().addClass('myprofile-soc__trigger_disabled');
		if(trigger.parent().hasClass('myprofile-soc__trigger_ok')) {
			trigger.parent().find('.myprofile-soc__trigger-state').text('не подключены');
		} else {
			trigger.parent().find('.myprofile-soc__trigger-state').text('не подключен');
		}
	}
}