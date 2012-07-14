/* 
 * System JS File
 */
jQuery.ajaxSetup({ 
  'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
});

/* Modernizr 2.5.2 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-canvas-input-inputtypes-geolocation
  */
;window.Modernizr=function(a,b,c){function u(a){i.cssText=a}function v(a,b){return u(prefixes.join(a+";")+(b||""))}function w(a,b){return typeof a===b}function x(a,b){return!!~(""+a).indexOf(b)}function y(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:w(f,"function")?f.bind(d||b):f}return!1}function z(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)o[c[d]]=c[d]in j;return o.list&&(o.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),o}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,g,h,i=a.length;d<i;d++)j.setAttribute("type",g=a[d]),e=j.type!=="text",e&&(j.value=k,j.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(g)&&j.style.WebkitAppearance!==c?(f.appendChild(j),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(j,null).WebkitAppearance!=="textfield"&&j.offsetHeight!==0,f.removeChild(j)):/^(search|tel)$/.test(g)||(/^(url|email)$/.test(g)?e=j.checkValidity&&j.checkValidity()===!1:/^color$/.test(g)?(f.appendChild(j),f.offsetWidth,e=j.value!=k,f.removeChild(j)):e=j.value!=k)),n[a[d]]=!!e;return n}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.5.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j=b.createElement("input"),k=":)",l={}.toString,m={},n={},o={},p=[],q=p.slice,r,s={}.hasOwnProperty,t;!w(s,"undefined")&&!w(s.call,"undefined")?t=function(a,b){return s.call(a,b)}:t=function(a,b){return b in a&&w(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=q.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(q.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(q.call(arguments)))};return e}),m.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},m.geolocation=function(){return!!navigator.geolocation};for(var A in m)t(m,A)&&(r=A.toLowerCase(),e[r]=m[A](),p.push((e[r]?"":"no-")+r));return e.input||z(),u(""),h=j=null,e._version=d,e}(this,this.document);

// some site wide variables
var geocoder;
var last_toggle;

// validates a photo form
function validatePhotoForm(form) {
	alert(form.attr('id'));
	return false
}
// sets the post kind
function set_post_kind(kind) {
	if (kind == null) {
		return;
	}
	$('.post_kind').attr('value',kind);
};

// display the results of a geocode query in human readable form

function display_geoname(obj) {
	if (!obj) {
		return '';
	};
	return obj.formatted_address;
};

// refresh the header_bar
function refresh_header_bar(dontshow) {
	$.get('/ajax/reload_header_bar', function(data) {

		$('#header_bar').html(data);
		// incase some parameters are still lingering around
		// explicity have this field shown
		if (!dontshow ){
			$('#destination_list').show();
		}

	});

}


// show the list of places the user has interacted with

function display_place_list() {
	refresh_header_bar();
	$('#destination_list').slideDown(200);
};

// hide the list of places the user has interacted with

function hide_place_list() {
	
	$('#destination_list').slideUp(200);
};

function hide_autocomplete() {
	box = $('.dropdown\-autocomplete');
	if (!(box.is(':visible'))) {
		return false;
	}
	box.slideUp(350,function() {;
		// empty out the div once the animation's complete
		//box.html('');
	});//.delay(200);
	
};

// autosuggest a place when a user pauses in the autocomplete box

function autoSuggestAC() {
	anchor = $('#ac_first_option')
	if (anchor && $.trim(anchor.html()).length > 1) {
		autoCompleteOriginal = $('#ac_search').val();
		$('#ac_search').val($.trim(anchor.html()));
	}
};
// deals with flash alerts
// Deal with flash notices
function show_flash_notice(){
	var flash_alert = $('.notice');
	if ($.trim(flash_alert.html()).length > 0) {
		flash_alert.show().animate({height: flash_alert.outerHeight()}, 200);
		window.setTimeout(function() {
			flash_alert.slideUp(function(){
				flash_alert.html('');
			});
		}, 5000);
	}
}

function set_flash_notice(msg){
	var flash_alert = $('.notice');
	if ( flash_alert ){
		flash_alert.html($.trim(msg));
	}
}
// give us a clean slate to work with
function reset_ac() {
	// empty out the form field
	$('#ac_search').val(null);
	// rlease the timeout
	clearTimeout(lastKeyPressTimeoutId);
	lastKeyPress = null;
	autoCompleteOriginal = null; 
};
$(document).ready(function() {
	// show flash notice	
	show_flash_notice();	

	//Welcome Page Animation for Social Proof
	$('#firstblock').delay(3000).slideDown(1000);
	$('#lastblock').delay(3000).slideUp(1000)	
	//- Handle place holders!
	elems = $('[placeholder]');
	for(x =0; x < elems.length;x ++) {
		//alert($(elems[x]).attr('placeholder_'));
//		elems[x]['value'] = elems[x].getAttribute('placeholder');
	}
	$('[placeholder]').live('click', function(){
		this_val = $(this).attr('value');
		if ($(this).attr('clicked') != true && this_val == $(this).attr('placeholder')) {
//			$(this).attr('value','');
//			$(this).attr('onblur', 'function(){ if($(this).attr("placeholder").length > 0){alert($(this).attr("placeholder"))}}');
		}
		$(this)['clicked'] = true;
	});

	// setup geocode
	var geocoder= new google.maps.Geocoder();
	lastKeyPress = null;
	lastKeyPressTimeoutId = null;
	autoCompleteOriginal = null;
	
	$('#ac_search').live('dblclick',function(key) {
		// rlease the timeout
		clearTimeout(lastKeyPressTimeoutId);
		lastKeyPress = null;
		autoCompleteOriginal = null; 
	});
	// Autocomplete Drop Down Menu
	$('#ac_search').live('keyup', function(key) {
		var keycode = null;
		if (key) {
			keycode = key.keyCode ? key.keyCode : key.which
		}
		// figure out what post kind we're dealing with
		kind = $('#p_kind').val();

/*
		// form submission
		if ( keycode == 13) {
			first_option = $('#ac_first_option');
			if ( first_option && first_option.attr('href')) {
				$('#ac_first_option').trigger('click');
			}
			// otherwise submit the form with the submitted data
			else {
				$('#ac_form').submit();
			}
			return false;
		}
*/
		if ( autoCompleteOriginal ) {
			$(this).val(autoCompleteOriginal);
			autoCompleteOriginal = null;
		}
		timeNow = new Date
		if ( lastKeyPress && (timeNow.getHours() == lastKeyPress.getHours()) && (timeNow.getSeconds() - lastKeyPress.getSeconds()) < 3 ){
			// clear the timeout call if this person is typing quickly
			clearTimeout(lastKeyPressTimeoutId);
		}

		// set the info for the last key press
		lastKeyPress = new Date;
		lastKeyPressTimeoutId = window.setTimeout('autoSuggestAC()',1000);

		place = $(this).val();

		// its a key down event, the value of the string doesnt change till key up, takes into account BKSPC as well
		if( place && place.length > 0 && ( $.trim(place).toLowerCase() == 'anywhere' || $.trim(place).toLowerCase() == 'anywher')){
			autoCompleteOriginal = null;
			hide_autocomplete();
			return true;
		}

		if ( place && place.length > 0 ){
			var address = $(this).val();
			geocoder.geocode( {'address' : address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					str = '';
					for (x = 0; x < results.length ; x++) {
						// this will store the information needed to create a post for this area
						place_data = encodeURIComponent(JSON.stringify(results[x]));
						formatted_address = encodeURIComponent(results[x].formatted_address);
						str += '<a class="ac_create_link" href="#" formatted_address="' + formatted_address + '"' + ' place_data="' + place_data + '"' +  '>' + display_geoname(results[x]) + '</a>';  
						//str += '<a class="ac_create_link" href="/ajax/create_post_from_auto_complete?provider=google&p_kind='+ kind + '&formatted_address=' + formatted_address + '" rel="' + uri + '"' + 'id=' + ((x ==0) ? 'ac_first_option' : '') + '>' + display_geoname(results[x]) + '</a>';
					}

					$('.dropdown\-autocomplete').html(str);
					$('.dropdown\-autocomplete').slideDown(350);

				}
				else {
				// trap any geo code errors encountered.
				//	alert('an error occured.');
				}
			});
			return true;	
		}
		//hide_autocomplete();
	});
	// This user has unfocused from the input field, so we hide it
	$('#ac_search').live('blur', function() {
		// hide the search results but give a little time for click events
		// to register
		hide_autocomplete();
	});
	// This user has refocused, if there are results show them
	$('#ac_search').live('click', function() {
		// show the search results only if they exist of course
		txt = $('.dropdown\-autocomplete').html();
		txt = txt.replace_all(/&.*?;/,'');
		txt = $.trim(txt);
		if(txt.length > 3) {
			alert('txt = ' + txt);
			$('.dropdown\-autocomplete').slideDown(300);
		}
		// hide the list of places
//		hide_place_list();
	});

	// a user has clicked an ac result
	$('.ac_create_link').live('click', function() {

		form = $('#ac_form');
		if( form ){
			place_data_container = $('#place_data');
			place_data_container.val($(this).attr('place_data'));
			search_box = $('#ac_search');
			search_box.focus();
			search_box.val($.trim($(this).html()));
			search_box.blur();
			return false;
		}
	});
	// the user is choosing a post type

	$('.kind_specifier').live('click',function() {
		$.post($(this).attr('href'),function(data) {
			$('#splash').html(data);	
		});
		return false;
	});
	
	$('#destination_ctl').live('click',function() {
		if ($('#destination_list').is(':visible')) {
			hide_place_list();
		}
		else {
			
			display_place_list();	
		}
		return false;
	});

	// the user has removed a place from thier list of pending
	$('.place_remove').live('click', function() {
	//	alert('hello');

		//hide_place_list();

		$.post( $(this).attr('href'), function(){
		// roll it back up after 5 seconds
		});

		// update the data
		refresh_header_bar(false);

		// show the new list
		//display_place_list();

		//window.setTimeout('hide_place_list()',5000);
		// cancel the link operation
		return false;
	});

	//- handles updating the input field when a user selects a new action
	$('.things_to_do_select').live('change',function(){
		// - update the input field with text from the helper
		field = $('#things_to_do_input');
		if (field){
			//- find the item holding the data
			helper = $('#helper_' + $(this).val());
			//- update the place holder
			field.attr('placeholder',helper.attr('helper'));
			field.attr('clicked','0');
			//- clean out the form
			field.val(null);
			//- update the pending action
			$('#pending_action').html(helper.attr('verb'));
		}
	});

	//- update the pending action as the user types	
	$('#things_to_do_input').live('keyup', function(){
		helper = $('#helper_' + $('.things_to_do_select').val());
		$('#pending_action').html(
		helper.attr('verb') + ' ' +  $(this).val()
		)	
	});
	//- clear out the place holder
	$('#things_to_do_input').live('focus', function(){
		if ($(this).attr('clicked') != '1'){
			$(this).attr('clicked','1');	
			$(this).val('');
		}
	});
  // Process weather selection for place page
  $('.weather_link').live('click', function(){
    return true;
  });

  // Update the follow button on the user page
  $('.follow_action').live('click', function(){
	$.get($(this).attr('href'), function(data){
	});
	$('#follow_housing' + $(this).attr('id')).html('Thanks!');
    return false;
  });
  // update the things-to-do content on the thanks page
  $('#thanks_ttd_form').live('submit', function(){
	field = $('#things_to_do_input');
	if ( field && field.attr('clicked') == '1' && $.trim(field.val()).length > 0){
		return true;
	}
	return false
  });
  // Update the things-to-do content on the user page
  $('#things_todo_form').live('submit', function(){
 var params = new Array();
    params['activity_id'] = $('#activity_id').val();
    params['activity_content'] = $('#things_to_do_input').val();
    params['kind'] = $('#kind').val();
    params['place'] = $("#place").val();
    params['page'] = 1;
    var url = '/ajax/add_activity?';
    for (var key in params){
      url += "&" + key + "=" + escape(params[key]);
    }
    $.get(url, function(data){
      if(data){
        content = $("#place_action");
        content.html(data);
      }
    });
    return false;
  });

  // show and hide alerts
  $('#alerts_count').live('click', function(){
  	alert_dd = $('#alerts_drop_down');
	if( alert_dd.is(':visible') ){
		alert_dd.slideUp(150);
	}
	else
	{
		alert_dd.slideDown(150);
	}
	// cancel the operation
	return false;
  });

	// show a post response field
	$('[class ^= "reply_btn"]').live('click', function(){
		parent_ = $(this).attr('parent');
		main_div = $('#response_area_container' + parent_);//$('#response_container_num_' + $(this).attr('parent'));
		post_ = $(this).attr('post');
		main_div.fadeOut(100, function(){
				main_div.html($('#response_template').clone().html());
				reply_box = main_div.children('form');
				reply_box.children('input[name="parent"]').val(parent_);
				reply_box.attr('id','reply_box_num_' + parent_);
				reply_box.children('input[name="post"]').val(post_);
				txtarea = reply_box.children('textarea[name="content"]');
				place_holder_ = txtarea.attr('placeholder');
				txtarea.attr('placeholder','');
				main_div.fadeIn(200, function(){
					txtarea.focus();
					txtarea.attr('placeholder',place_holder_);
				});
				
		});

		return false;
	});
	
	// Take content from rel to fill something else
	$('[class^="fillrel_"]').live('click', function() {
		var ttarget = '#' + $(this).attr('class').replace('fillrel_', '');
		$(ttarget).html(decodeURIComponent($(this).attr('rel')));
		return(false);
	});

	// Toggle something in a certain way. Uses the words show and hide though
	// Not so intelligent, since it should see the status of the target container first
	$('[id^="toggle_"]').live('click', function() {
		var ttarget = '#' + $(this).attr('id').replace('toggle_', '');
		var tog = $(this).html();
		$(this).html(tog.match(/hide/i) ? tog.replace('Hide', 'Show') : tog.replace('Show', 'Hide'));
		anch = $(this);
		var child = $(this).children().first();
		if (child.hasClass('down-side')){
			child.attr('class','up-side')
		}
		else if (child.hasClass('up-side')){
			child.attr('class','down-side')
		}
		
		if (last_toggle) {
			$(last_toggle).toggle('slow');
		}
		
		$(ttarget).toggle('slow', function() {
			if (anch.attr('no_mappy')){
				last_toggle = ttarget;
				return false 
			};
			// Set or clear a cookie
			if ($(ttarget).is(':visible')) {
				// Clear cookie
				$.cookie('hide_mappy', null, {path: '/', expires: 30});
				map_initialize();
			} else {
				$.cookie('hide_mappy', 1, {path: '/', expires: 30});			
			}
		});
		
		// check for other things to toggle
		if($(this).attr('rel')) {
			$('#' + $(this).attr('rel')).toggle();
		}
		
		return(false);
	});	
  
  $('#show_more').text('More...');
  $('#agent_letter').hide();

  $('#show_more').click(function(){
      $('#agent_letter').toggle();
      $('#agent_letter').is(':hidden') ? $('#show_more').text("More...") : $('#show_more').hide()
      return false;
    });

	$('.thumbnail_expand').live('click', function(){
		attachment = $('#attachment' + $(this).attr('ref'));
		attachment_window = $('#active_attachment' + $(this).attr('post'));
		if( attachment && attachment_window ){
			attachment_window.html(attachment.html());
		}
		return false;
	});
	$('.writers_button').live('click',function(){
		// get the place from the input field.
		place = $('[name="place_name"]').val();
		// append it to the list of places add by this user
		if (place && $.trim(place).length > 0 ){
			places = $('#writer_places').html();
			places += '<li>' + place + '</li>'
			$('#writer_places').html(places);
		}
	});
	$('#wtgt_list_add').live('click', function(){
		list= $('#wtgt_activity_list');
		activity = $('#wtgt_activity').val();
		if( activity && $.trim(activity).length > 0){
			list.append('<li><input type="checkbox" name="activities[]" checked="checked" value="' + activity + '"' + '> ' + activity +  '</input></li>');
			$('#wtgt_activity').val('');
		}
	});
	
	//- update the filter on the user profile page
	$('#user_wall_filter').live('change', function(){
		$('#profile_filter_form').submit();
	});
	//- delete an attachment by clicking on it
	$('.attachment_delete').live('click', function(){
		photo = $('#photo_' + $(this).attr('ref'));
		ref = $(this).attr('ref');
		post_permalink = $(this).attr('post_permalink');
		if(photo && ref && post_permalink){
			photo.fadeOut(350, function(){
				$.get('/ajax/delete_attachment_from_post/' + post_permalink + '?attachment_id=' + ref, function(data){
				});
			});	
			$(this).html('');
		}		
		return false;
	});
	
	$('#wtgt_add_more_btn').live('click', function(){
		//- show the form
		housing = $('#wtgt_activity_form_housing')
		$(this).fadeOut();
		housing.slideDown(450);
		//- remove this element
		return false;
	});
	
	$('#wtgt_activity_btn').live('click', function(){
		activity_queue = $('#things_to_do_list');
		activity = $('#activity').val();
		if(activity && $.trim(activity).length > 0){
			activity_queue.append('<li>' + activity + '</li>');
			//- process the form
			$.get($('#wtgt_activity_form').attr('action') + '?activity=' + activity);
			$('#activity').val('');
			$('#activity').focus();
		}
		return false;
	});

	$('.bookmarkit').live('click', function(){
		var post_id = $(this).attr('rel');
		$.get('/ajax/bookmark/' + post_id);
		  $(this).hide();
	      $('#bookmark'+post_id).toggle();
	return false;

	});

	
	$('.change_plans_btn').live('click', function(){
		alert('boo!');	
	});

	$('#wtgt_submit_btn_step_2').live('click', function(){
		name_field =$('input[name="name"]');
		if (name_field && $.trim(name_field.val()).length > 2 ){
			return true;
		}
		return false;

	});
	$('#wtgt_submit_btn_step_3').live('click', function(){
		name_field = $('input[name="email"]');
		password_field = $('input[name="password"]');
		if (name_field && $.trim(name_field.val()).length > 5 && password_field && $.trim(password_field.val()).length > 5 ){
			return true;
		}
		return false;

	});
	

	$('[class^="stopmessage"]').live('click', function(){
		message_id = $(this).attr('rel');
		elem = $('#' + message_id);
		elem.toggle('slow');
		$.get('/ajax/stop_message/' + message_id); 
		return false;
	});
	
	//- Show the large question field
	$('#q_preview').live('click', function(){
		$('#q_preview').hide();
		$('#q_form').slideDown(550);
		$('#q_text').focus();		
	});
	
	$('[id^="filter\-option"]').live('click', function(){
		id = $.trim($(this).attr('id').replace('filter-option-',''));
		//update the class of the container div
		selected = $('.menu\-travel\-option\-on')
		selected.attr('class', 'menu\-travel\-option');
		mom = $('#filter\-parent\-' + id);
//		alert(mom.attr('id'));
		mom.attr('class', 'menu\-travel\-option\-on');
		// make the request using the id, return the appropriate	json obj 
		//alert(id);
		$('#loading_bar_' + id).show();
		$.post('/user/home/' + id, function(resp){
			// parse the response
			resp = JSON.parse(resp);
			if (resp ){
				// successful?
				if (resp.status == 200){
					// check for a url otherwise, run the js	
					if (resp.url && $.trim(resp.url).length > 0){
						window.location = resp.url;
					}
					else {
						if (resp.data){
							$('#active_mode').fadeOut('fast', function(){
								$('#active_mode').html(resp.data);
								$('#active_mode').fadeIn('slow',function(){
									$('#loading_bar_' + id).fadeOut('fast');
								});
							});
						}
					}
				}
				// guess not, show the error (if any!)
				else{
					error = resp.error;
					if (error){
						alert(error);
					}
				}
			}
		});
		return false;
	});

	$('[id^="change\-home\-form"]').live('click', function(){
		id = $.trim($(this).attr('id').replace('change-home-form-',''));
		clicked_title = $(this).html();
		//alert(id);
		html = $('#selectors\-form').html();
		regEng = new RegExp(/<span class="icon-profile-(.*?)-on">(.*)<\/span>/gi);
		match_ = regEng.exec(html);
		task = null;
		title = null;
		if (match_ && match_[1] && match_[2]){
			task = match_[1];
			title = match_[2];
		//alert('matches');
		}
//		alert('id = ' + id);
//		alert('currnet task = ' + task);
		if(task && $.trim(task).length > 0){
//			alert('init -- ' + html);
			html = html.replace('<span class="icon-profile-' + task + '-on">' + title + '</span>', '<a href="/home?ft=' + task +'" id="change-home-form-' + task + '"' + 'class="icon-profile-' + task + '">' + title + '</a>');		
//			alert(html);
			//alert( '<a href="" id="change-home-form-' + id + '"' + ' class="icon-profile-' + id + '">' + clicked_title + '</a>');
			html = html.replace('<a href="/home?ft=' + id + '" id="change-home-form-' + id + '"' + ' class="icon-profile-' + id + '">' + clicked_title + '</a>', '<span class="icon-profile-' + id + '-on">' + clicked_title + '</span>');
//			alert(html);
		}
		$('#selectors\-form').html(html);
		$('#home\-form\-container').fadeOut('fast', function(){
			form_variant = $('#form_variant_' + id);
			$('#home\-form\-container').html(form_variant.html());	
			$('#home\-form\-container').fadeIn('slow');
		});
		return false
	});
	
	$('#tip_text_area').live('keyup', function(){
		my_val = $.trim( $(this).val() );
		$('#tip_text_area_container2').fadeIn(10, function(){
			$('#tip_text_area_container').fadeIn(100, function(){
				$('#attachment_options').show('fast');
				$('#tip_form_submit').show('fast');
				$('[class ^= "tip_label"]').each(function(){
					$(this).show();
				});
			});
		});
	});
	
	$('#location_btn').click(function(){
		$(this).fadeOut('slow', function(){
			$.post('/ajax/update_location/' +	$('#ac_search').val() + '.js', function(resp){
			resp = JSON.parse(resp);
			if (resp && resp.status == 200){
				$('.place_title').each( function(index){
					// replace all the place titles
					$(this).html(resp.place.title);	
					$('input[name="place_id"]').each(function(){
						$(this).val(resp.place.id);
					});
				});
				$('#pop\-up').hide('fast', function(){
					$('#loading_bar_container').hide();
					$('#location_btn').show();
				});
			}
			});
			$('#loading_bar_container').fadeIn('fast');
		});
		$('.place_title').each( function(index){
					$(this).html($('#ac_search').val());	
		});
		return false;
	});

	$('#question_activator').live('keyup', function(){
		activator = $(this);
		my_val = activator.val();	
		activator.slideUp('fast').fadeOut();
		$('#question_form').slideDown(350, function(){
			$('#question_input').focus();
			$('#question_input').val(my_val);
		});
		$('#question_form_submit').toggle();
	});

	$('#status_update_input').live('keyup', function(){
		$('#status_form_submit').slideDown();	
	});

	$('[class^="more_link_"]').live('click', function(){
		id = '#' + $.trim($(this).attr('class').replace('more_link_',''));
		$(id).toggle();
		$(id + '_short' ).toggle();
		return false
	});

	$('#hide_photo_info_container').live('click', function(){
		$(this).parent('div').slideUp('fast',function(){
			$('#photo_info_container').slideDown('fast', function(){
			});
		});
		return false;
	});

	$('#show_photo_info_container').live('click', function(){
		$('#photo_info_container').slideUp('fast', function(){
			$('#photo_summary_container').slideDown('fast');
		});
		return false;
	});

	$('#edit_photo_content').live('click', function(){
		container = $('#photo_info_container')
		container.fadeOut('fast', function(){
			container.html($('#edit_form_container').html());
			container.fadeIn('fast');
		});
		return false;
	});
	$('[class $="oneline"]').live('focus', function(){
		name = $(this).attr('name');
		txtarea = $(this);
		$(this).parent('div').fadeOut('fast',function(){
			txtarea.html('');
			$('.' + name + '-multiline').parent('div').fadeIn('fast', function(){
				$('.' + name + '-multiline').focus();
			});
			$('#sub_btn').fadeIn('fast');
		});
	});

	$('input[id ^= "file_upload_"]').live('change', function(){
		$(this).fadeOut('slow')
		file_name = $(this).val();
		id_text = $(this).attr('id');
		ref_num = Number(id_text.replace('file_upload_', ''));
		//alert('id = ' + id_text + ' ref_num = ' + ref_num);
		//- if its the first file uploaded.  We need to show the location field
		if ( ref_num === 0 ){
			upload_count = Number($('#upload_cnt').val());
			if ( upload_count === 0 ) {
				$('#location_setting').fadeIn('fast');		
			}
		}
		// now we append the new title and content fields to the form
		new_html = $('#form_template').html();
		new_html = new_html.replace(/UPLOADNUM/g, ref_num);
		new_html = new_html.replace(/NEXTUPLOAD/g, ref_num + 1);
		$('#form_addendum').hide();
		$('#form_addendum').append(new_html);
		$('#form_addendum').slideDown(250, function(){
		});
	});

	$('[id^="thumb_activator_"]').live('click', function(){
		id = Number($(this).attr('id').replace('thumb_activator_',''));
		current_id = $('#photo_id').val();
		if ( Number(current_id) == id ){
			return false;
		}
		window.location.hash= '#' + id.toString();
		container = $('#photo_container_' + id);
		if ( container && container.attr('id') ){
			$('#current_img').fadeOut('slow',function(){
				$('#photo_id').val(id)
				$('#current_img').html(container.html());
			});
			$('#current_img').fadeIn('slow').delay(1);
		}
		return false;
	});

	// Add file to list
	$('.add_file_to_list').live('click', function() {
		$('.file_list').append('<li><input type="file" name="attachments[]" /></li>');
		return false;
	});

	// Placeholder
	$('input[placeholder], textarea[placeholder]').placeholder();

  // Delete an attachment
  $('.delete_attachment').live('click', function() {
    if (confirm($(this).attr('data-msg'))) {
      $(this).hide();
      $.post('/ajax/delete_attachment_from_post', 
        {
          id: $(this).attr('data-post'), 
          attachment_id: $(this).attr('data-attachment-id'), 
          xhr: 1 
        }, 
        function(text) {
          //
      });
    }
    return false;
  });

});

// ------------- DO NOT EDIT OR DELETE BELOW HERE!!! ------------- //

// Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-25409032-2']);
 _gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// GTTWL Analytics
// Revsense Server 1.0.0
// __TIMESTAMP__

function __revsense_sc(v) {
	var date = new Date();
	date.setTime(date.getTime()+(720*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = 'gttrev=' + v + expires + '; path=/';
}

function __revsense_gc() {
	var nameEQ = 'gttrev=';
	var ca = document.cookie.split(';');
	for (var i=0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return false
}

function __revsense_serve() {
	var uid = __revsense_gc() || Math.floor(Math.random() * 86400 * 65535); 
	var ref = document.referrer || '';
	var req = document.location.href || '';
	var protocol = document.location.protocol;

	var html = '<script type="text/javascript" ';
	html = html + 'src="/track/serve.js';
	html = html + '?f=' + encodeURIComponent(ref);
	html = html + '&r=' + encodeURIComponent(req);
	html = html + '&u=' +  uid;
	html = html + '"></script>';

	__revsense_sc(uid);
	document.write(html);
}

// Startup Analytics
__revsense_serve();


/*
* Placeholder plugin for jQuery
* ---
* Copyright 2010, Daniel Stocks (http://webcloud.se)
* Released under the MIT, BSD, and GPL Licenses.
*/

(function(b){function d(a){this.input=a;a.attr("type")=="password"&&this.handlePassword();b(a[0].form).submit(function(){if(a.hasClass("placeholder")&&a[0].value==a.attr("placeholder"))a[0].value=""})}d.prototype={show:function(a){if(this.input[0].value===""||a&&this.valueIsPlaceholder()){if(this.isPassword)try{this.input[0].setAttribute("type","text")}catch(b){this.input.before(this.fakePassword.show()).hide()}this.input.addClass("placeholder");this.input[0].value=this.input.attr("placeholder")}},
hide:function(){if(this.valueIsPlaceholder()&&this.input.hasClass("placeholder")&&(this.input.removeClass("placeholder"),this.input[0].value="",this.isPassword)){try{this.input[0].setAttribute("type","password")}catch(a){}this.input.show();this.input[0].focus()}},valueIsPlaceholder:function(){return this.input[0].value==this.input.attr("placeholder")},handlePassword:function(){var a=this.input;a.attr("realType","password");this.isPassword=!0;if(b.browser.msie&&a[0].outerHTML){var c=b(a[0].outerHTML.replace(/type=(['"])?password\1/gi,
"type=$1text$1"));this.fakePassword=c.val(a.attr("placeholder")).addClass("placeholder").focus(function(){a.trigger("focus");b(this).hide()});b(a[0].form).submit(function(){c.remove();a.show()})}}};var e=!!("placeholder"in document.createElement("input"));b.fn.placeholder=function(){return e?this:this.each(function(){var a=b(this),c=new d(a);c.show(!0);a.focus(function(){c.hide()});a.blur(function(){c.show(!1)});b.browser.msie&&(b(window).load(function(){a.val()&&a.removeClass("placeholder");c.show(!0)}),
a.focus(function(){if(this.value==""){var a=this.createTextRange();a.collapse(!0);a.moveStart("character",0);a.select()}}))})}})(jQuery);
