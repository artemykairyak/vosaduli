"use strict";function sendForm(e,t){var s=e.attr("name"),a=$(e).serialize()+"&"+s+"=1";$.ajax({type:"POST",url:t,data:a,success:function(e){console.log(e)},error:function(e){console.log(e)},dataType:"json"})}function validationPersonalInfo(e){var t=$(e).find("select"),s=!0;t.each(function(e,t){$(t).val()?$(t).closest(".edit-info__input-container").removeClass("edit-info__input-container_error"):($(t).closest(".edit-info__input-container").addClass("edit-info__input-container_error"),s=!1)}),s&&sendForm(e,window.location.pathname)}function selectPeriod(e,t,s){if(t&&s){for(var a=$(".period-modal__period-table-item"),i=$("[data-order = first]").attr("data-month"),n=$("[data-order = second]").attr("data-month"),_=i-1;30>_&&$(a[_]).attr("data-month")!==n;_++)$(a[_]).hasClass("period-modal__period-table-item_selected")||$(a[_]).addClass("period-modal__period-table-item_filled"),_>a.length-1&&(_=0,$(a[_]).hasClass("period-modal__period-table-item_selected")||$(a[_]).addClass("period-modal__period-table-item_filled"));$(".pub-period__btn-label").text($("[data-order = first]").attr("data-alias")+" - "+$("[data-order = second]").attr("data-alias"))}}function loadThumbnail(e){if(-1!==e.type.indexOf("image",0)){var t=new FileReader;t.onprogress=function(){$(".pub-thumbnail__image-label").text("Загрузка...")},t.onload=function(e){var t=e.target.result;$(".pub-thumbnail__image-label").text(""),$(".pub-thumbnail__image-preview").attr("src",t),$(".pub-thumbnail__image-preview").addClass("pub-thumbnail__image-preview_loaded"),$(".pub-thumbnail__image").addClass("pub-thumbnail__image_loaded"),$(".pub-thumbnail__image").removeClass("pub-thumbnail__image_error")},t.onerror=function(){$(".pub-thumbnail__image").addClass("pub-thumbnail__image_error")},t.readAsDataURL(e),sendFile(e)}else $(".pub-thumbnail__image").addClass("pub-thumbnail__image_error"),$(".pub-thumbnail__image").removeClass("pub-thumbnail__image_loaded"),$(".pub-thumbnail__image-preview").removeClass("pub-thumbnail__image-preview_loaded")}function sendFile(){var e=new FormData;$.ajax({url:"test.html",type:"post",data:e,contentType:!1,processData:!1,success:function(){alert("Файлы были успешно загружены")}})}function cutText(e,t){e.each(function(e,s){var a=$(s).text();if(a.length>t){var i=a.slice(0,t),n=i.slice(0,i.lastIndexOf(" "))+"...";$(s).text(n)}})}function showModal(e){$(".overlay").removeClass("overlay_disabled"),e.removeClass("modal_disabled")}function hideModal(){$(".overlay").addClass("overlay_disabled"),$(".modal").addClass("modal_disabled")}function onTriggerClick(e){e.hasClass("trigger_active")||(e.toggleClass("trigger_active"),e.siblings().removeClass("trigger_active"))}function socTriggerChange(e){e.parent().hasClass("myprofile-soc__trigger_disabled")?(e.parent().removeClass("myprofile-soc__trigger_disabled"),e.parent().find(".myprofile-soc__trigger-state").text(e.parent().hasClass("myprofile-soc__trigger_ok")?"работают":"работает")):(e.parent().addClass("myprofile-soc__trigger_disabled"),e.parent().find(".myprofile-soc__trigger-state").text(e.parent().hasClass("myprofile-soc__trigger_ok")?"не подключены":"не подключен"))}function SidebarScrollDown(e,t,s,a,i,n,_,o,r){2>=+a&&(e.find(t).css({transform:"translateY(-"+String(+s*+a)+"px)"}),e.attr("data-page",+a+1),2===+a&&_.addClass(r)),refreshArrows(e,t,n,_,o,r,i,e.attr("data-page"))}function SidebarScrollUp(e,t,s,a,i,n,_,o,r){if(a>1){var l=e.find(t).first().css("transform"),d=+l.slice(l.lastIndexOf(" ")+1,-1);e.find(t).css({transform:"translateY("+String(d+ +s)+"px)"}),d=+d+ +s,e.attr("data-page",a-1),1===+e.attr("data-page")&&n.addClass(o)}refreshArrows(e,t,n,_,o,r,i,e.attr("data-page"))}function refreshArrows(e,t,s,a,i,n,_,o){e.find(t).length<=_?(s.addClass(i),a.addClass(n)):1===+o?(s.addClass(i),a.removeClass(n)):2===+o?(s.removeClass(i),a.removeClass(n)):(s.removeClass(i),a.addClass(n))}$(function(){function e(){{var e=new google.maps.LatLng(55.014048,82.913005),t={zoom:8,center:e};new google.maps.Map(document.getElementById("map"),t)}}var t=0;if($(window).on("scroll",function(){var e=$(this).scrollTop();e>t?($(".mobile-nav-menu").addClass("mobile-nav-menu_hidden"),$(".nav-menu").addClass("nav-menu_hidden"),$(".nav-menu").removeClass("nav-menu_showed"),$(".mobile-search").hasClass("mobile-search_hidden")||$(".mobile-search").slideUp(300)):($(".mobile-nav-menu").removeClass("mobile-nav-menu_hidden"),$(".nav-menu").offset().top>66?($(".nav-menu").removeClass("nav-menu_hidden"),$(".nav-menu").addClass("nav-menu_showed")):$(".nav-menu").removeClass("nav-menu_showed"),$(".mobile-search").hasClass("mobile-search_hidden")||$(".mobile-search").slideDown(300)),t=e}),$(window).on("scroll",function(){$(".main-menu").offset().top>33?$(".main-menu").addClass("main-menu_scrolled"):$(".main-menu").removeClass("main-menu_scrolled")}),$(".mobile-nav-menu__burger").on("click",function(){$(this).addClass("mobile-nav-menu__burger_opened"),$(".mobile-menu").removeClass("mobile-menu_disabled"),$(".mobile-overlay").removeClass("overlay_disabled"),$("body").addClass("hidden")}),$(".mobile-overlay").on("click",function(){$(this).addClass("overlay_disabled"),$(".mobile-nav-menu__burger").removeClass("mobile-nav-menu__burger_opened"),$(".mobile-menu").addClass("mobile-menu_disabled"),$("body").removeClass("hidden")}),$(".mobile-nav-menu__item_search").on("click",function(e){e.preventDefault(),$(".mobile-search").toggleClass("mobile-search_hidden")}),$(".nav-menu__item").on("mouseover",function(){$(this).find(".child-list").addClass("enable")}),$(".nav-menu__item").on("mouseout",function(e){$(e.currentTarget)!==$(this)&&$(this).find(".child-list").removeClass("enable")}),$(".likes-btn").on("click",function(e){e.preventDefault(),$(this).toggleClass("likes-btn_liked-anim"),$(this).toggleClass("likes-btn_liked")}),$(".actions__add-friend").hasClass("actions__add-friend_sended")?$(".actions__add-friend").text("Заявка отправлена"):$(".actions__add-friend").hasClass("actions__add-friend_added")&&$(".actions__add-friend").text("Удалить из друзей"),$(".user-data__avatar-changeavatar-input").on("focus",function(){$(".user-data__avatar-changephoto").addClass("user-data__avatar-changephoto_focus")}),$(".user-data__avatar-changeavatar-input").on("blur",function(){$(".user-data__avatar-changephoto").removeClass("user-data__avatar-changephoto_focus")}),$(".user-data__avatar-changebg-input").on("focus",function(){$(".user-data__avatar-changebg").addClass("user-data__avatar-changephoto_focus")}),$(".user-data__avatar-changebg-input").on("blur",function(){$(".user-data__avatar-changebg").removeClass("user-data__avatar-changephoto_focus")}),$(".profile-menu__item").on("click",function(e){$(this).find(".profile-menu__submenu").length>0&&($(this).toggleClass("profile-menu__item_expand"),e.preventDefault())}),$(".myprofile__submenu-item").on("click",function(e){e.preventDefault(),$(this).hasClass("myprofile__submenu-item_active")||($(this).toggleClass("myprofile__submenu-item_active"),$(this).siblings().removeClass("myprofile__submenu-item_active")),$(this).hasClass("myprofile__submenu-item_aboutme")?($(".myprofile-content").removeClass("myprofile-section_disabled"),$(".myprofile-soc, .myprofile-contacts").addClass("myprofile-section_disabled")):$(this).hasClass("myprofile__submenu-item_soc")?($(".myprofile-content, .myprofile-contacts").addClass("myprofile-section_disabled"),$(".myprofile-soc").removeClass("myprofile-section_disabled")):$(this).hasClass("myprofile__submenu-item_contacts")&&($("select").trigger("refresh"),$(".myprofile-content, .myprofile-soc").addClass("myprofile-section_disabled"),$(".myprofile-contacts").removeClass("myprofile-section_disabled"))}),$(".edit-info__form").on("submit",function(e){e.preventDefault(),validationPersonalInfo($(".edit-info__form"))}),$(".myprofile-contacts__form").on("submit",function(e){e.preventDefault(),sendForm($(this),window.location.pathname),$(".myprofile-contacts__contact-state_address").text($(this).find(".myprofile-contacts__form-input_address").val()),$(".myprofile-contacts__contact-state_phone").text($(this).find(".myprofile-contacts__form-input_phone").val())}),$(".edit-info__select").on("focus",function(){$(this).closest(".jq-selectbox").find(".jq-selectbox__select").addClass("select_focused")}),$(".edit-info__select").on("blur",function(){$(this).closest(".jq-selectbox").find(".jq-selectbox__select").removeClass("select_focused")}),$(".edit-info__form").length>0&&$("select").styler(),$('select[name="country"]').on("change",function(){$('select[name="region"]').removeAttr("disabled").parent().removeClass("edit-select_disabled"),$("select").trigger("refresh");var e=$('select[name="region"]').children("option").length,t=setInterval(function(){$('select[name="region"]').children("option").length!==e&&(clearInterval(t),$("select").trigger("refresh"))},100)}),$('select[name="region"]').on("change",function(){$('select[name="city"]').removeAttr("disabled").parent().removeClass("edit-select_disabled"),$("select").trigger("refresh");var e=$('select[name="city"]').children("option").length,t=setInterval(function(){$('select[name="city"]').children("option").length!==e&&(clearInterval(t),$("select").trigger("refresh"))},100)}),$(".groups-menu__trigger").on("click",function(e){e.preventDefault(),onTriggerClick($(this)),$(this).hasClass("groups-menu__trigger_new")?($(".groups-menu__new-items").removeClass("groups-menu__items_disabled"),$(".groups-menu__best-items").addClass("groups-menu__items_disabled")):$(this).hasClass("groups-menu__trigger_best")&&($(".groups-menu__best-items").removeClass("groups-menu__items_disabled"),$(".groups-menu__new-items").addClass("groups-menu__items_disabled"))}),$(".online-report__trigger").on("click",function(e){e.preventDefault(),onTriggerClick($(this)),$(this).hasClass("online-report__trigger_events")?($(".online-report__events-items").removeClass("online-report__items_disabled"),$(".online-report__news-items").addClass("online-report__items_disabled")):$(this).hasClass("online-report__trigger_news")&&($(".online-report__news-items").removeClass("online-report__items_disabled"),$(".online-report__events-items").addClass("online-report__items_disabled"))}),$(".myprofile-soc__trigger-trigger").on("click",function(){socTriggerChange($(this))}),$(".header-menu__container").length>0&&$(window).width()<1050?$(".header-menu__container").owlCarousel({navText:[$(".header-menu__nav-arrow_prev"),$(".header-menu__nav-arrow_next")],items:4,margin:10,nav:!0,dots:!1,loop:!1,mouseDrag:!1,touchDrag:!1,pullDrag:!1,responsive:{0:{items:2.7,nav:!1,margin:10,mouseDrag:!0,touchDrag:!0,pullDrag:!0},690:{items:4}}}):$(".header-menu__container").length>0&&$(window).width()>=1050&&$(".header-menu__container").trigger("destroy.owl.carousel"),$(".friends__menu-item").on("click",function(e){$(this).addClass("friends__menu-item_active"),$(this).siblings().removeClass("friends__menu-item_active"),$(this).hasClass("friends__menu-item_friends")?($(".friends__friends-list").removeClass("list_disabled"),$(".friends__followers-list, .friends__follows-list").addClass("list_disabled")):$(this).hasClass("friends__menu-item_followers")?($(".friends__friends-list, .friends__follows-list").addClass("list_disabled"),$(".friends__followers-list").removeClass("list_disabled")):$(this).hasClass("friends__menu-item_follows")&&($(".friends__friends-list, .friends__followers-list").addClass("list_disabled"),$(".friends__follows-list").removeClass("list_disabled")),e.preventDefault()}),$(".blogs-menu__item-text").length>0&&cutText($(".blogs-menu__item-text"),60),$(".journal__article-text").length>0&&cutText($(".journal__article-text"),550),$(".blogs-menu__next").on("click",function(e){e.preventDefault(),$(".blogs-menu__prev").removeClass("blogs-menu__prev_disabled"),$(".blogs-menu__trigger_best").hasClass("trigger_active")&&$(".blogs-menu__best").find(".blogs-menu__item").length>4&&SidebarScrollDown($(".blogs-menu__best"),".blogs-menu__item",600,$(".blogs-menu__best").attr("data-page"),4,$(".blogs-menu__prev"),$(".blogs-menu__next"),"blogs-menu__prev_disabled","blogs-menu__next_disabled"),$(".blogs-menu__trigger_new").hasClass("trigger_active")&&$(".blogs-menu__new").find(".blogs-menu__item").length>4&&SidebarScrollDown($(".blogs-menu__new"),".blogs-menu__item",600,$(".blogs-menu__new").attr("data-page"),4,$(".blogs-menu__prev"),$(".blogs-menu__next"),"blogs-menu__prev_disabled","blogs-menu__next_disabled")}),$(".blogs-menu__prev").on("click",function(e){e.preventDefault(),$(".blogs-menu__next").removeClass("blogs-menu__next_disabled"),$(".blogs-menu__trigger_best").hasClass("trigger_active")&&$(".blogs-menu__best").find(".blogs-menu__item").length>4&&SidebarScrollUp($(".blogs-menu__best"),".blogs-menu__item",600,$(".blogs-menu__best").attr("data-page"),4,$(".blogs-menu__prev"),$(".blogs-menu__next"),"blogs-menu__prev_disabled","blogs-menu__next_disabled"),$(".blogs-menu__trigger_new").hasClass("trigger_active")&&$(".blogs-menu__new").find(".blogs-menu__item").length>4&&SidebarScrollUp($(".blogs-menu__new"),".blogs-menu__item",600,$(".blogs-menu__new").attr("data-page"),4,$(".blogs-menu__prev"),$(".blogs-menu__next"),"blogs-menu__prev_disabled","blogs-menu__next_disabled")}),$(".blogs-menu__trigger").on("click",function(e){e.preventDefault(),onTriggerClick($(this)),$(".blogs-menu__trigger_new").hasClass("trigger_active")?(refreshArrows($(".blogs-menu__new"),".blogs-menu__item",$(".blogs-menu__prev"),$(".blogs-menu__next"),"blogs-menu__prev_disabled","blogs-menu__next_disabled",4,$(".blogs-menu__new").attr("data-page")),$(".blogs-menu__new").removeClass("blogs-menu_hidden"),$(".blogs-menu__best").addClass("blogs-menu_hidden")):(refreshArrows($(".blogs-menu__best"),".blogs-menu__item",$(".blogs-menu__prev"),$(".blogs-menu__next"),"blogs-menu__prev_disabled","blogs-menu__next_disabled",4,$(".blogs-menu__best").attr("data-page")),$(".blogs-menu__new").addClass("blogs-menu_hidden"),$(".blogs-menu__best").removeClass("blogs-menu_hidden"))}),$(".moderation-header__tab").on("click",function(){$(this).hasClass("tab_selected")||($(this).toggleClass("tab_selected"),$(this).siblings().removeClass("tab_selected"))}),$(".moderation-articles__article-title").length>0&&cutText($(".moderation-articles__article-title"),76),setTimeout(function(){$(".pub-maininfo__selected-categories").length>0&&$(".pub-maininfo__category-input_main-category option").each(function(e,t){$(".pub-maininfo__category-secoundary-inputs-container").find('input[type="hidden"]').each(function(e,s){$(t).val()==$(s).val()&&$(".pub-maininfo__category-input_additional-category li").each(function(e,s){$(t).text()==$(s).text()&&($(s).addClass("category_selected"),$(".pub-maininfo__selected-categories").append('<span class="pub-maininfo__selected-category">'+$(t).text()+"</span>"))})})})},100),0!=$('input[name="periodmin"]').val()&&0!=$('input[name="periodmax"]').val()){var s=$(".period-modal__period-table-item"),a=+$("[data-order = first]").attr("data-month"),i=+$("[data-order = second]").attr("data-month");o=!0,r=!0,$("[data-order=first], [data-order=second]").addClass("period-modal__period-table-item_selected");for(var n=a-1;30>n&&$(s[n]).attr("data-month")!=i;n++)$(s[n]).hasClass("period-modal__period-table-item_selected")||$(s[n]).addClass("period-modal__period-table-item_filled"),n>s.length-1&&(n=0,$(s[n]).hasClass("period-modal__period-table-item_selected")||$(s[n]).addClass("period-modal__period-table-item_filled"));$(".pub-period__btn-label").text($("[data-order = first]").attr("data-alias")+" - "+$("[data-order = second]").attr("data-alias"))}if($(".pub-format__format").on("mouseenter",function(){$(this).addClass("pub-format__format_hover")}),$(".pub-format__format").on("mouseleave",function(){$(this).removeClass("pub-format__format_hover")}),$(".pub-format__format").on("click",function(){$(this).siblings().removeClass("pub-format__format_selected"),$(this).addClass("pub-format__format_selected"),$(this).siblings().find(".pub-format__format-radio").removeAttr("checked"),$(this).find(".pub-format__format-radio").attr("checked","checked")}),$(".pub-format__format-radio").on("focus",function(){$(this).parent().addClass().addClass("pub-format__format_hover")}),$(".pub-format__format-radio").on("blur",function(){$(this).parent().addClass().removeClass("pub-format__format_hover")}),$('input[name="thumbnail"]').on("focus",function(){$(this).parent().addClass("pub-thumbnail__image_hover")}),$('input[name="thumbnail"]').on("blur",function(){$(this).parent().removeClass("pub-thumbnail__image_hover")}),$('input[name="period"]').on("focus",function(){$(this).parent().addClass("pub-period__period-btn_hover")}),$('input[name="period"]').on("blur",function(){$(this).parent().removeClass("pub-period__period-btn_hover")}),$(".pub-thumbnail__image").length>0){$('input[type="file"]').on("change",function(){var e=this.files[0];loadThumbnail(e)});var _=$(".pub-thumbnail__image");_[0].ondragover=function(){return _.addClass("pub-thumbnail__image_onDrag"),!1},_[0].ondragleave=function(){return _.removeClass("pub-thumbnail__image_onDrag"),!1},_[0].ondrop=function(e){e.preventDefault();var t=e.dataTransfer.files[0];e.stopPropagation(),_.removeClass("pub-thumbnail__image_onDrag"),loadThumbnail(t)}}$(".pub-theme__input").on("keyup",function(e){if("Slash"===e.code||"Comma"===e.code){var t=$(this).val().slice(0,$(this).val().length);$(this).val(t+" "),$(this).css("color","#2e2e2e")}else $(this).css("color","#9b9b9b")}),$(".pub-theme__input").on("blur",function(){$(this).css("color","#2e2e2e")}),$(".addarticle-select").length>0&&$("select").styler(),$("select.addarticle-select").on("focus",function(){$(this).closest(".jq-selectbox").find(".jq-selectbox__select").addClass("addarticle-select_focused")}),$("select.addarticle-select").on("blur",function(){$(this).closest(".jq-selectbox").find(".jq-selectbox__select").removeClass("addarticle-select_focused")}),$(".pub-rules__title").on("click",function(){$(window).width()<576&&$(this).parent().toggleClass("pub-rules_showed")}),$(".pub-maininfo__category-input_main-category .jq-selectbox__dropdown li").on("click",function(){var e=this;$(".pub-maininfo__category-input_additional-category .jq-selectbox__dropdown li").each(function(t,s){$(s).removeClass("category_selected"),$(s).removeClass("category_disabled"),$(s).text()==$(e).text()&&$(s).addClass("category_disabled")}),$(".pub-maininfo__selected-categories").empty(),$('.pub-maininfo__category-secoundary-inputs-container input[type="hidden"]').val("")}),$(".pub-maininfo__category-secoundary-inputs-container").on("click",function(e){var t=0;if($(e.target).is($(".pub-maininfo__category-input_additional-category .jq-selectbox__dropdown li"))){if($(e.target).parent().children().each(function(e,s){$(s).hasClass("category_selected")&&t++}),$(e.target).hasClass("category_selected")&&!$(e.target).hasClass("category_disabled"))$(".pub-maininfo__selected-categories").find($(".pub-maininfo__selected-category")).each(function(t,s){$(e.target).text()==$(s).text()&&$(s).remove()}),$(e.target).removeClass("category_selected"),$(".pub-maininfo__category-secoundary-inputs-container").find('input[id="category'+String(t)+'"]').val(""),t--;else if(!$(e.target).hasClass("category_selected")&&!$(e.target).hasClass("category_disabled")&&4>t){$(".pub-maininfo__selected-categories").append('<span class="pub-maininfo__selected-category">'+$(e.target).text()+"</span>"),$(e.target).addClass("category_selected");var s=$(e.target).closest(".pub-maininfo__category-input_additional-category").find("option:eq("+String($(e.target).index()+")")).attr("value");$(".pub-maininfo__category-secoundary-inputs-container").find('input[id="category'+String(t+1)+'"]').val(s)}}else $(e.target).is($(".pub-maininfo__selected-category"))&&($(e.target).closest($(".pub-maininfo__category-secoundary-inputs-container")).find($(".jq-selectbox__dropdown li")).each(function(s,a){$(a).hasClass("category_selected")&&t++,$(a).text()==$(e.target).text()&&($(a).removeClass("category_selected"),$(".pub-maininfo__category-input_main-category option").each(function(e,s){$('.pub-maininfo__category-secoundary-inputs-container input[type="hidden"]').each(function(e,a){$(s).val()==$(a).val()&&(console.log($(s).val(),$(a).val()),$(a).val(""),t--)})}),$(e.target).remove())}),$(".pub-maininfo__category-secoundary-inputs-container").find('input[id="category'+String(t)+'"]').val(""),t--)}),$(".addarticle-form").on("submit",function(){tinyMCE.triggerSave()}),$(".pub-thumbnail__image img").attr("src")&&($(".pub-thumbnail__image-preview").addClass("pub-thumbnail__image-preview_loaded"),$(".pub-thumbnail__image").addClass("pub-thumbnail__image_loaded"),$(".pub-thumbnail__image").removeClass("pub-thumbnail__image_error")),$(".feed__article-text").length>0&&cutText($(".feed__article-text"),280),$(".questions__item-content").length>0&&cutText($(".questions__item-content"),70),$(".questions__trigger").on("click",function(e){e.preventDefault(),onTriggerClick($(this)),$(".questions__trigger_new").hasClass("trigger_active")?(refreshArrows($(".questions__items_new"),".questions__item",$(".questions__prev"),$(".questions__next"),"questions__prev_disabled","questions__next_disabled",5,$(".questions__items_new").attr("data-page")),$(".questions__items_new").removeClass("questions__items_hidden"),$(".questions__items_best, .questions__items_noanswer").addClass("questions__items_hidden")):$(".questions__trigger_best").hasClass("trigger_active")?(refreshArrows($(".questions__items_best"),".questions__item",$(".questions__prev"),$(".questions__next"),"questions__prev_disabled","questions__next_disabled",5,$(".questions__items_best").attr("data-page")),$(".questions__items_new, .questions__items_noanswer").addClass("questions__items_hidden"),$(".questions__items_best").removeClass("questions__items_hidden")):(refreshArrows($(".questions__items_noanswer"),".questions__item",$(".questions__prev"),$(".questions__next"),"questions__prev_disabled","questions__next_disabled",5,$(".questions__items_noanswer").attr("data-page")),$(".questions__items_new, .questions__items_best").addClass("questions__items_hidden"),$(".questions__items_noanswer").removeClass("questions__items_hidden"))}),$(".questions__next").on("click",function(e){e.preventDefault(),$(".questions__prev").removeClass("questions__prev_disabled"),$(".questions__trigger_new").hasClass("trigger_active")&&$(".questions__items_new").find(".questions__item").length>5&&SidebarScrollDown($(".questions__items_new"),".questions__item",660,$(".questions__items_new").attr("data-page"),5,$(".questions__prev"),$(".questions__next"),"questions__prev_disabled","questions__next_disabled"),$(".questions__trigger_best").hasClass("trigger_active")&&$(".questions__items_best").find(".questions__item").length>5&&SidebarScrollDown($(".questions__items_best"),".questions__item",660,$(".questions__items_best").attr("data-page"),5,$(".questions__prev"),$(".questions__next"),"questions__prev_disabled","questions__next_disabled"),$(".questions__trigger_noanswer").hasClass("trigger_active")&&$(".questions__items_noanswer").find(".questions__item").length>5&&SidebarScrollDown($(".questions__items_noanswer"),".questions__item",660,$(".questions__items_noanswer").attr("data-page"),5,$(".questions__prev"),$(".questions__next"),"questions__prev_disabled","questions__next_disabled")}),$(".questions__prev").on("click",function(e){e.preventDefault(),$(".questions__next").removeClass("questions__next_disabled"),$(".questions__trigger_new").hasClass("trigger_active")&&$(".questions__items_new").find(".questions__item").length>5&&SidebarScrollUp($(".questions__items_new"),".questions__item",660,$(".questions__items_new").attr("data-page"),5,$(".questions__prev"),$(".questions__next"),"questions__prev_disabled","questions__next_disabled"),$(".questions__trigger_best").hasClass("trigger_active")&&$(".questions__items_best").find(".questions__item").length>5&&SidebarScrollUp($(".questions__items_best"),".questions__item",660,$(".questions__items_best").attr("data-page"),5,$(".questions__prev"),$(".questions__next"),"questions__prev_disabled","questions__next_disabled"),$(".questions__trigger_noanswer").hasClass("trigger_active")&&$(".questions__items_noanswer").find(".questions__item").length>5&&SidebarScrollUp($(".questions__items_noanswer"),".questions__item",660,$(".questions__items_noanswer").attr("data-page"),5,$(".questions__prev"),$(".questions__next"),"questions__prev_disabled","questions__next_disabled")}),$(".authors__trigger").on("click",function(e){e.preventDefault(),onTriggerClick($(this)),$(".authors__trigger_articles").hasClass("trigger_active")?(refreshArrows($(".authors__items_articles"),".authors__item",$(".authors__prev"),$(".authors__next"),"authors__prev_disabled","authors__next_disabled",5,$(".authors__items_articles").attr("data-page")),$(".authors__items_articles").removeClass("authors__items_hidden"),$(".authors__items_comments").addClass("authors__items_hidden")):(refreshArrows($(".authors__items_comments"),".authors__item",$(".authors__prev"),$(".authors__next"),"authors__prev_disabled","authors__next_disabled",5,$(".authors__items_comments").attr("data-page")),$(".authors__items_articles").addClass("authors__items_hidden"),$(".authors__items_comments").removeClass("authors__items_hidden"))}),$(".authors__next").on("click",function(e){e.preventDefault(),$(".authors__prev").removeClass("authors__prev_disabled"),$(".authors__trigger_articles").hasClass("trigger_active")&&$(".authors__items_articles").find(".authors__item").length>5&&SidebarScrollDown($(".authors__items_articles"),".authors__item",480,$(".authors__items_articles").attr("data-page"),5,$(".authors__prev"),$(".authors__next"),"authors__prev_disabled","authors__next_disabled"),$(".authors__trigger_comments").hasClass("trigger_active")&&$(".authors__items_comments").find(".authors__item").length>5&&SidebarScrollDown($(".authors__items_comments"),".authors__item",480,$(".authors__items_comments").attr("data-page"),5,$(".authors__prev"),$(".authors__next"),"authors__prev_disabled","authors__next_disabled")}),$(".authors__prev").on("click",function(e){e.preventDefault(),$(".authors__next").removeClass("authors__next_disabled"),$(".authors__trigger_articles").hasClass("trigger_active")&&$(".authors__items_articles").find(".authors__item").length>5&&SidebarScrollUp($(".authors__items_articles"),".authors__item",480,$(".authors__items_articles").attr("data-page"),5,$(".authors__prev"),$(".authors__next"),"authors__prev_disabled","authors__next_disabled"),$(".authors__trigger_comments").hasClass("trigger_active")&&$(".authors__items_comments").find(".authors__item").length>5&&SidebarScrollUp($(".authors__items_comments"),".authors__item",480,$(".authors__items_comments").attr("data-page"),5,$(".authors__prev"),$(".authors__next"),"authors__prev_disabled","authors__next_disabled")}),$(".experience__next").on("click",function(e){e.preventDefault(),$(".experience__prev").removeClass("experience__prev_disabled"),$(".experience__items").find(".experience__item").length>6&&SidebarScrollDown($(".experience__items"),".experience__item",670,$(".experience__items").attr("data-page"),6,$(".experience__prev"),$(".experience__next"),"experience__prev_disabled","experience__next_disabled")}),$(".experience__prev").on("click",function(e){e.preventDefault(),$(".experience__next").removeClass("experience__next_disabled"),$(".experience__items").find(".experience__item").length>6&&SidebarScrollUp($(".experience__items"),".experience__item",670,$(".experience__items").attr("data-page"),6,$(".experience__prev"),$(".experience__next"),"experience__prev_disabled","experience__next_disabled")}),$(".myprofile__tabs-tab").on("click",function(e){e.preventDefault(),$(this).hasClass("myprofile__tabs-tab_active")||($(this).addClass("myprofile__tabs-tab_active"),$(this).siblings().removeClass("myprofile__tabs-tab_active"),$(this).hasClass("feed__tabs-tab_allfeed")?($(".myprofile__submenu_myfeed").addClass("myprofile__submenu_hidden"),$(".myprofile__submenu_allfeed").removeClass("myprofile__submenu_hidden"),$(".feed_allfeed").removeClass("feed_hidden"),$(".feed_myfeed").addClass("feed_hidden")):($(".myprofile__submenu_myfeed").removeClass("myprofile__submenu_hidden"),$(".myprofile__submenu_allfeed").addClass("myprofile__submenu_hidden"),$(".feed_allfeed").addClass("feed_hidden"),$(".feed_myfeed").removeClass("feed_hidden")))}),$(".sign-in-modal__show-pass, .sign-up-modal__show-pass").on("click",function(){"password"===$(this).prev().attr("type")?$(this).prev().attr("type","text").addClass("sign-in-modal__show-pass_showed"):$(this).prev().attr("type","password").removeClass("sign-in-modal__show-pass_showed")}),$(".sign-buttons__sign-in, .mobile-menu__sign-in").on("click",function(e){e.preventDefault(),showModal($(".sign-in-modal"))}),$(".sign-buttons__sign-up, .mobile-menu__sign-up").on("click",function(e){e.preventDefault(),showModal($(".sign-up-modal"))}),$(".overlay, .modal__close").on("click",function(){hideModal()}),$(".pub-period__period-btn").on("click",function(){showModal($(".period-modal"))}),$(".period-modal__enter-btn").on("click",function(e){e.preventDefault(),o&&r&&(1==$("[data-order = first]").attr("data-month").length?$('input[name="periodmin"]').attr("value",0+$("[data-order = first]").attr("data-month")):$('input[name="periodmin"]').attr("value",$("[data-order = first]").attr("data-month")),1==$("[data-order = second]").attr("data-month").length?$('input[name="periodmax"]').attr("value",0+$("[data-order = second]").attr("data-month")):$('input[name="periodmax"]').attr("value",$("[data-order = second]").attr("data-month"))),hideModal()});var o=!1,r=!1;$(".period-modal__period-table-item").on("click",function(){if($(this).hasClass("period-modal__period-table-item_selected")){if($(this).hasClass("period-modal__period-table-item_selected")){$(this).removeClass("period-modal__period-table-item_selected");for(var e=$(".period-modal__period-table-item"),t=0;t<e.length;t++)$(e[t]).removeClass("period-modal__period-table-item_filled");if("first"===$(this).attr("data-order")){$(this).removeAttr("data-order"),o=!1,$('input[name="periodmin"]').attr("value",""),$('input[name="periodmax"]').attr("value","");for(var t=0;t<e.length;t++)$(e[t]).removeClass("period-modal__period-table-item_selected"),$(e[t]).removeAttr("data-order"),r=!1,$(".pub-period__btn-label").text("Выбрать период")}else"second"===$(this).attr("data-order")&&($(this).removeAttr("data-order"),r=!1,$(".pub-period__btn-label").text("Выбрать период"),$('input[name="periodmin"]').attr("value",""),$('input[name="periodmax"]').attr("value",""))}}else $(this).hasClass("period-modal__period-table-item_disabled")||($(this).addClass("period-modal__period-table-item_selected"),o?r?$(this).removeClass("period-modal__period-table-item_selected"):($(this).attr("data-order","second"),r=!0,selectPeriod($(this),o,r)):($(this).attr("data-order","first"),o=!0))}),e()});