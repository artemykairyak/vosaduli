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

	$(window).on('resize', function() {

	})

	$('.header-menu__item').on('click', function(e) {
		e.preventDefault();
		$(this).parent().siblings().find('.header-menu__item').removeClass('header-menu__item_active');
		$(this).addClass('header-menu__item_active');

	})

	
	if($(window).width() < 1050) {
		$('.header-menu__container').owlCarousel({
			navText: [$('.header-menu__nav-arrow_prev'), $('.header-menu__nav-arrow_next')],
			items: 4,
			margin: 10,
			nav: true,
			dots: false,
			loop: false
			// autoWidth: true
			// responsive: {
			// 	0: {
			// 		items: 1.3,
			// 		margin: 30
			// 	},
			// 	834: {
			// 		items: 2,
			// 		margin: 30
			// 	},

			// 	1240: {
			// 		items: 3,
			// 		margin: 30
			// 	}
			// }

		});
	}
	
})

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