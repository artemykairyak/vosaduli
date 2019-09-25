"use strict";function sendForm(e,t){var i=e.attr("name"),a=$(e).serialize()+"&"+i+"=1";$.ajax({type:"POST",url:t,data:a,dataType:"json"})}function validationPersonalInfo(e){var t=$(e).find("select"),i=!0;t.each(function(e,t){$(t).val()?$(t).closest(".edit-info__input-container").removeClass("edit-info__input-container_error"):($(t).closest(".edit-info__input-container").addClass("edit-info__input-container_error"),i=!1)}),i&&sendForm(e,"https://cors-anywhere.herokuapp.com/http://moduli-opencart.ru/users/145")}function selectPeriod(e,t,i){if(t&&i){for(var a=$(".period-modal__period-table-item"),s=$("[data-order = first]").attr("data-month"),n=$("[data-order = second]").attr("data-month"),o=s-1;30>o&&$(a[o]).attr("data-month")!==n;o++)$(a[o]).hasClass("period-modal__period-table-item_selected")||$(a[o]).addClass("period-modal__period-table-item_filled"),o>a.length-1&&(o=0,$(a[o]).hasClass("period-modal__period-table-item_selected")||$(a[o]).addClass("period-modal__period-table-item_filled"));$(".pub-period__btn-label").text($("[data-order = first]").attr("data-alias")+" - "+$("[data-order = second]").attr("data-alias"))}}function loadThumbnail(e){if(-1!==e.type.indexOf("image",0)){var t=new FileReader;t.onprogress=function(){$(".pub-thumbnail__image-label").text("Загрузка...")},t.onload=function(e){var t=e.target.result;$(".pub-thumbnail__image-label").text(""),$(".pub-thumbnail__image-preview").attr("src",t),$(".pub-thumbnail__image-preview").addClass("pub-thumbnail__image-preview_loaded"),$(".pub-thumbnail__image").addClass("pub-thumbnail__image_loaded"),$(".pub-thumbnail__image").removeClass("pub-thumbnail__image_error")},t.onerror=function(){$(".pub-thumbnail__image").addClass("pub-thumbnail__image_error")},t.readAsDataURL(e),sendFile(e)}else $(".pub-thumbnail__image").addClass("pub-thumbnail__image_error"),$(".pub-thumbnail__image").removeClass("pub-thumbnail__image_loaded"),$(".pub-thumbnail__image-preview").removeClass("pub-thumbnail__image-preview_loaded")}function sendFile(){var e=new FormData;$.ajax({url:"test.html",type:"post",data:e,contentType:!1,processData:!1,success:function(){alert("Файлы были успешно загружены")}})}function cutText(e,t){e.each(function(e,i){var a=$(i).text();if(a.length>t){var s=a.slice(0,t),n=s.slice(0,s.lastIndexOf(" "))+"...";$(i).text(n)}})}function showModal(e){$(".overlay").removeClass("overlay_disabled"),e.removeClass("modal_disabled")}function hideModal(){$(".overlay").addClass("overlay_disabled"),$(".modal").addClass("modal_disabled")}function onTriggerClick(e){e.hasClass("trigger_active")||(e.toggleClass("trigger_active"),e.siblings().removeClass("trigger_active"))}function socTriggerChange(e){e.parent().hasClass("myprofile-soc__trigger_disabled")?(e.parent().removeClass("myprofile-soc__trigger_disabled"),e.parent().find(".myprofile-soc__trigger-state").text(e.parent().hasClass("myprofile-soc__trigger_ok")?"работают":"работает")):(e.parent().addClass("myprofile-soc__trigger_disabled"),e.parent().find(".myprofile-soc__trigger-state").text(e.parent().hasClass("myprofile-soc__trigger_ok")?"не подключены":"не подключен"))}$(function(){var e=0;if($(window).on("scroll",function(){var t=$(this).scrollTop();t>e?($(".mobile-nav-menu").addClass("mobile-nav-menu_hidden"),$(".nav-menu").addClass("nav-menu_hidden"),$(".nav-menu").removeClass("nav-menu_showed")):($(".mobile-nav-menu").removeClass("mobile-nav-menu_hidden"),$(".nav-menu").offset().top>66?($(".nav-menu").removeClass("nav-menu_hidden"),$(".nav-menu").addClass("nav-menu_showed")):$(".nav-menu").removeClass("nav-menu_showed")),e=t}),$(window).on("scroll",function(){$(".main-menu").offset().top>33?$(".main-menu").addClass("main-menu_scrolled"):$(".main-menu").removeClass("main-menu_scrolled")}),$(".nav-menu__item").on("mouseover",function(){$(this).find(".child-list").addClass("enable")}),$(".nav-menu__item").on("mouseout",function(e){$(e.currentTarget)!==$(this)&&$(this).find(".child-list").removeClass("enable")}),$(".likes-btn").on("click",function(e){e.preventDefault(),$(this).toggleClass("likes-btn_liked-anim"),$(this).toggleClass("likes-btn_liked")}),$(".profile-menu__item").on("click",function(e){$(this).find(".profile-menu__submenu").length>0?($(this).toggleClass("profile-menu__item_expand"),$(this).siblings().find(".profile-menu__link").removeClass("profile-menu__link_active"),$(this).find(".profile-menu__link").addClass("profile-menu__link_active")):($(this).find(".profile-menu__link").addClass("profile-menu__link_active"),$(this).siblings().find(".profile-menu__link").removeClass("profile-menu__link_active")),e.preventDefault()}),$(".myprofile__submenu-item").on("click",function(e){e.preventDefault(),$(this).hasClass("myprofile__submenu-item_active")||($(this).toggleClass("myprofile__submenu-item_active"),$(this).siblings().removeClass("myprofile__submenu-item_active")),$(this).hasClass("myprofile__submenu-item_aboutme")?($(".myprofile-content").removeClass("myprofile-section_disabled"),$(".myprofile-soc").addClass("myprofile-section_disabled"),$(".myprofile-contacts").addClass("myprofile-section_disabled")):$(this).hasClass("myprofile__submenu-item_soc")?($(".myprofile-content").addClass("myprofile-section_disabled"),$(".myprofile-soc").removeClass("myprofile-section_disabled"),$(".myprofile-contacts").addClass("myprofile-section_disabled")):$(this).hasClass("myprofile__submenu-item_contacts")&&($("select").trigger("refresh"),$(".myprofile-content").addClass("myprofile-section_disabled"),$(".myprofile-soc").addClass("myprofile-section_disabled"),$(".myprofile-contacts").removeClass("myprofile-section_disabled"))}),$(".edit-info__form").on("submit",function(e){e.preventDefault(),validationPersonalInfo($(".edit-info__form"))}),$(".myprofile-contacts__form").on("submit",function(e){e.preventDefault(),sendForm($(this),"https://cors-anywhere.herokuapp.com/http://moduli-opencart.ru/users/145"),$(".myprofile-contacts__contact-state_address").text($(this).find(".myprofile-contacts__form-input_address").val()),$(".myprofile-contacts__contact-state_phone").text($(this).find(".myprofile-contacts__form-input_phone").val())}),$(".edit-info__form").length>0&&$("select").styler(),$('select[name="country"]').on("change",function(){$('select[name="region"]').removeAttr("disabled").parent().removeClass("edit-select_disabled"),$("select").trigger("refresh");var e=$('select[name="region"]').children("option").length,t=setInterval(function(){$('select[name="region"]').children("option").length!==e&&(clearInterval(t),$("select").trigger("refresh"))},100)}),$('select[name="region"]').on("change",function(){$('select[name="city"]').removeAttr("disabled").parent().removeClass("edit-select_disabled"),$("select").trigger("refresh");var e=$('select[name="city"]').children("option").length,t=setInterval(function(){$('select[name="city"]').children("option").length!==e&&(clearInterval(t),$("select").trigger("refresh"))},100)}),$(".actions__add-friend").hasClass("actions__add-friend_sended")?$(".actions__add-friend").text("Заявка отправлена"):$(".actions__add-friend").hasClass("actions__add-friend_added")&&$(".actions__add-friend").text("Удалить из друзей"),$(".groups-menu__trigger").on("click",function(e){e.preventDefault(),onTriggerClick($(this)),$(this).hasClass("groups-menu__trigger_new")?($(".groups-menu__new-items").removeClass("groups-menu__items_disabled"),$(".groups-menu__best-items").addClass("groups-menu__items_disabled")):$(this).hasClass("groups-menu__trigger_best")&&($(".groups-menu__best-items").removeClass("groups-menu__items_disabled"),$(".groups-menu__new-items").addClass("groups-menu__items_disabled"))}),$(".online-report__trigger").on("click",function(e){e.preventDefault(),onTriggerClick($(this)),$(this).hasClass("online-report__trigger_events")?($(".online-report__events-items").removeClass("online-report__items_disabled"),$(".online-report__news-items").addClass("online-report__items_disabled")):$(this).hasClass("online-report__trigger_news")&&($(".online-report__news-items").removeClass("online-report__items_disabled"),$(".online-report__events-items").addClass("online-report__items_disabled"))}),$(".friends__menu-item").on("click",function(e){$(this).addClass("friends__menu-item_active"),$(this).siblings().removeClass("friends__menu-item_active"),$(this).hasClass("friends__menu-item_friends")?($(".friends__friends-list").removeClass("list_disabled"),$(".friends__followers-list, .friends__follows-list").addClass("list_disabled")):$(this).hasClass("friends__menu-item_followers")?($(".friends__friends-list, .friends__follows-list").addClass("list_disabled"),$(".friends__followers-list").removeClass("list_disabled")):$(this).hasClass("friends__menu-item_follows")&&($(".friends__friends-list, .friends__followers-list").addClass("list_disabled"),$(".friends__follows-list").removeClass("list_disabled")),e.preventDefault()}),$(".myprofile-soc__trigger-trigger").on("click",function(){socTriggerChange($(this))}),$(".header-menu__container").length>0&&$(window).width()<1050?($(".header-menu__item").on("click",function(e){e.preventDefault(),$(this).parent().siblings().find(".header-menu__item").removeClass("header-menu__item_active"),$(this).addClass("header-menu__item_active")}),$(".header-menu__container").owlCarousel({navText:[$(".header-menu__nav-arrow_prev"),$(".header-menu__nav-arrow_next")],items:4,margin:10,nav:!0,dots:!1,loop:!1,mouseDrag:!1,touchDrag:!1,pullDrag:!1,responsive:{0:{items:2.8,nav:!1,margin:10,mouseDrag:!0,touchDrag:!0,pullDrag:!0},690:{items:4}}})):$(".header-menu__container").length>0&&$(window).width()>=1050&&($(".header-menu__container").trigger("destroy.owl.carousel"),$(".header-menu__item").on("click",function(){$(this).siblings().removeClass("header-menu__item_active"),$(this).addClass("header-menu__item_active")})),$(".blogs-menu__trigger").on("click",function(e){e.preventDefault(),onTriggerClick($(this))}),cutText($(".journal__article-text"),550),$(".moderation-header__tab").on("click",function(){$(this).hasClass("tab_selected")||($(this).toggleClass("tab_selected"),$(this).siblings().removeClass("tab_selected"))}),cutText($(".moderation-articles__article-title"),76),$(".pub-format__format").on("mouseenter",function(){$(this).addClass("pub-format__format_hover")}),$(".pub-format__format").on("mouseleave",function(){$(this).removeClass("pub-format__format_hover")}),$(".pub-format__format").on("click",function(){$(this).siblings().removeClass("pub-format__format_selected"),$(this).addClass("pub-format__format_selected"),$(this).siblings().find(".pub-format__format-radio").removeAttr("checked"),$(this).find(".pub-format__format-radio").attr("checked","checked")}),$(".pub-format__format-radio").on("focus",function(){$(this).parent().addClass().addClass("pub-format__format_hover")}),$(".pub-format__format-radio").on("blur",function(){$(this).parent().addClass().removeClass("pub-format__format_hover")}),$('input[name="thumbnail"]').on("focus",function(){$(this).parent().addClass("pub-thumbnail__image_hover")}),$('input[name="thumbnail"]').on("blur",function(){$(this).parent().removeClass("pub-thumbnail__image_hover")}),$('input[name="period"]').on("focus",function(){$(this).parent().addClass("pub-period__period-btn_hover")}),$('input[name="period"]').on("blur",function(){$(this).parent().removeClass("pub-period__period-btn_hover")}),$(".pub-thumbnail__image").length>0){$('input[type="file"]').on("change",function(){var e=this.files[0];loadThumbnail(e)});var t=$(".pub-thumbnail__image");t[0].ondragover=function(){return t.addClass("pub-thumbnail__image_onDrag"),!1},t[0].ondragleave=function(){return t.removeClass("pub-thumbnail__image_onDrag"),!1},t[0].ondrop=function(e){e.preventDefault();var i=e.dataTransfer.files[0];e.stopPropagation(),t.removeClass("pub-thumbnail__image_onDrag"),loadThumbnail(i)}}$(".pub-theme__input").on("keyup",function(e){if("Slash"===e.code||"Comma"===e.code){var t=$(this).val().slice(0,$(this).val().length);$(this).val(t+" "),$(this).css("color","#2e2e2e")}else $(this).css("color","#9b9b9b")}),$(".pub-theme__input").on("blur",function(){$(this).css("color","#2e2e2e")}),$(".pub-maininfo__content-input").val(""),$(".feed__article-text").length>0&&cutText($(".feed__article-text"),280),$(".sign-in-modal__show-pass, .sign-up-modal__show-pass").on("click",function(){"password"===$(this).prev().attr("type")?$(this).prev().attr("type","text").addClass("sign-in-modal__show-pass_showed"):$(this).prev().attr("type","password").removeClass("sign-in-modal__show-pass_showed")}),$(".sign-buttons__sign-in").on("click",function(e){e.preventDefault(),showModal($(".sign-in-modal"))}),$(".sign-buttons__sign-up").on("click",function(e){e.preventDefault(),showModal($(".sign-up-modal"))}),$(".overlay, .modal__close").on("click",function(){hideModal()}),$(".pub-period__period-btn").on("click",function(){showModal($(".period-modal"))}),$(".period-modal__enter-btn").on("click",function(e){e.preventDefault(),i&&a&&($(".pub-period__period-input").attr("min",$("[data-order = first]").attr("data-month")),$(".pub-period__period-input").attr("max",$("[data-order = second]").attr("data-month"))),hideModal()});var i=!1,a=!1;$(".period-modal__period-table-item").on("click",function(){if($(this).hasClass("period-modal__period-table-item_selected")){if($(this).hasClass("period-modal__period-table-item_selected")){$(this).removeClass("period-modal__period-table-item_selected");for(var e=$(".period-modal__period-table-item"),t=0;t<e.length;t++)$(e[t]).removeClass("period-modal__period-table-item_filled");if("first"===$(this).attr("data-order")){$(this).removeAttr("data-order"),i=!1,$(".pub-period__period-input").attr("min",""),$(".pub-period__period-input").attr("max","");for(var t=0;t<e.length;t++)$(e[t]).removeClass("period-modal__period-table-item_selected"),$(e[t]).removeAttr("data-order"),a=!1,$(".pub-period__btn-label").text("Выбрать период")}else"second"===$(this).attr("data-order")&&($(this).removeAttr("data-order"),a=!1,$(".pub-period__btn-label").text("Выбрать период"),$(".pub-period__period-input").attr("min",""),$(".pub-period__period-input").attr("max",""))}}else $(this).hasClass("period-modal__period-table-item_disabled")||($(this).addClass("period-modal__period-table-item_selected"),i?a?$(this).removeClass("period-modal__period-table-item_selected"):($(this).attr("data-order","second"),a=!0,selectPeriod($(this),i,a)):($(this).attr("data-order","first"),i=!0))})});