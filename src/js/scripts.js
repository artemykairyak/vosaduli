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
	})

	$('.trigger').on('click', function(e) {
		$(this).toggleClass('trigger_active');
		$(this).siblings().removeClass('trigger_active');
		e.preventDefault();
	});

	$('.friends__menu-item').on('click', function(e) {
		$(this).addClass('friends__menu-item_active');
		$(this).siblings().removeClass('friends__menu-item_active');
		e.preventDefault();
	})
})