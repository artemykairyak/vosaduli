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

	cutText($('.moderation-articles__article-title'), 76);

	//MODERATION

	// ADD ARTICLE

	$('.pub-format__format').on('click', function() {
		$(this).siblings().removeClass('pub-format__format_selected');
		$(this).addClass('pub-format__format_selected');
		$(this).siblings().find('.pub-format__format-radio').removeAttr('checked');
		$(this).find('.pub-format__format-radio').attr('checked', 'checked');
	});

	$('input[type="file"]').on('change', function() {
		let file = this.files;
		sendFile(file);
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
		dropZone.addClass('pub-thumbnail__image_dragged');
		sendFile(file);
	};

	var config = {};
	config.toolbarGroups = [
	{ name: 'styles', groups: [ 'styles' ] },
	{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
	{ name: 'paragraph', groups: [ 'list', 'blocks', 'indent', 'align', 'bidi', 'paragraph' ] },
	{ name: 'insert', groups: [ 'insert' ] },
	{ name: 'links', groups: [ 'links' ] },
	{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
	{ name: 'tools', groups: [ 'tools' ] },
	{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
	{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
	{ name: 'forms', groups: [ 'forms' ] },
	{ name: 'others', groups: [ 'others' ] },
	'/',
	{ name: 'colors', groups: [ 'colors' ] },
	{ name: 'about', groups: [ 'about' ] }
	];
	config.placeholder = 'some value'; 
	config.removeButtons = 'Underline,Subscript,Superscript,Cut,Copy,PasteText,PasteFromWord,Outdent,Indent,Strike,HorizontalRule,SpecialChar,Scayt,Undo,Redo,RemoveFormat,About,Anchor,Unlink,Format';
	config.extraPlugins = 'cloudservices';
	config.extraPlugins = 'confighelper';
	config.resize_enabled = false;
	config.uiColor = '#fafafa';
	CKEDITOR.replace('article-content', config);

	$('.pub-theme__input').on('keyup', function(e) {
		if(e.key === ',') {
			var propText = $(this).val().slice(0, $(this).val().length);
			$(this).val(propText + ' ');
			$(this).css('color', '#2e2e2e');
		} else {
			$(this).css('color', '#9b9b9b');
		}
	});

	$('.pub-theme__input').on('blur', function(e) {
		$(this).css('color', '#2e2e2e');
	});


	//ADD ARTICLE

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


	function sendFile(file) {
		let maxFileSize = 5242880;
		let Data = new FormData();
		if ((file.size <= maxFileSize) && ((file.type == 'image/png') || (file.type == 'image/jpeg'))) {
			Data.append('images[]', file);
		}

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

	function stateChange(e) {
		if (e.target.readyState == 4) {
			if (e.target.status == 200) {
				dropZone.text('Загрузка успешно завершена!');
			} else {
				dropZone.text('Произошла ошибка!');
				dropZone.addClass('error');
			}
		}
	}

	function cutText(element, len) {
		element.each(function(index, elem) {
			let elemText = $(elem).text();
			if( elemText.length > len) {
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