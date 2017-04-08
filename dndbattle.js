/*jslint browser: true*/
/*jshint strict:false*/
/*global $, jQuery, alert, tinysort*/
"use strict";


var currentChar;
var currentCharInit;

function initTextCheck() {
	var num = $.trim($("#num-init").val());
	var name = $.trim($("#name-init").val());
	return num.length > 0 && name.length > 0;
}

function addToList() {
	var initnum = $.trim($('#num-init').val());
	var name = $.trim($('#name-init').val());
	var init = '<li class="init' + name + initnum + '" data-init="init' + initnum + '">' +
		initnum +
		' | ' +
		'<span class="init-name">' +
		$.trim($('#name-init').val()) +
		'</span>' +
		'</li>';
	var id = '.init' + name + initnum;
	if (currentCharInit) {
		currentCharInit.removeClass('active');
	}
	$('#init-list').append(init);
	currentCharInit = $(id);
	currentCharInit.addClass('active');
}

function addCharBox() {
	var name = $.trim($('#name-init').val());
	var init = $.trim($('#num-init').val());
	var charDiv = '<div class="character" id="name' + name + init +
		'" data-init="init' + init + '">' +
		'<h3><span class="char-name">' + name + '</span><input type="button" class="remove-char" ></input>' +
		'<input type="button" class="dead-check"></input>' +
		'<input type="button" class="open-preset" ></input></h3>' +
		'<div class="char-stats">' +
		'<textarea class="ac" placeholder="AC"></textarea>' +
		'<textarea class="hp" placeholder="HP"></textarea>' +
		'<textarea class="mp" placeholder="MP"></textarea>' +
		'</div>' +
		'<h4 class="static-stat">STR     DEX    CON     INT    WIS    CHA</h4>' +
		'<div class="char-static-stats">' +
		'<textarea class="str" placeholder="STR"></textarea>' +
		'<textarea class="dex" placeholder="DEX"></textarea>' +
		'<textarea class="con" placeholder="CON"></textarea>' +
		'<textarea class="int" placeholder="INT"></textarea>' +
		'<textarea class="wis" placeholder="WIS"></textarea>' +
		'<textarea class="cha" placeholder="CHA"></textarea>' +
		'</div>' +
		'<h4>Battle Actions</h4>' +
		'<textarea class="actions"></textarea>' +
		'<h4>Notes</h4>' +
		'<textarea class="notes"></textarea>' +
		'</div>';
	$('#main-battle').append(charDiv);
	var id = '#name' + name + init;
	if (currentChar) {
		currentChar.removeClass('active');
	}
	currentChar = $(id);
	currentChar.addClass('active');
}

function clearInit() {
	$('#init-list').html('');
}

function clearChar() {
	$('#main-battle').html('');
}

function clearInput() {
	$('#name-init').val('');
	$('#num-init').val('');
	$('#num-init').focus();
}

function addChar() {
	if (initTextCheck()) {
		$('#error-init').hide();
		addToList();
		addCharBox();
		clearInput();
	} else {
		$('#error-init').show();
	}
}


$(document).ready(function () {
	//add characters from initiative box
	$('#add-init').on('click', function () {
		addChar();
	});
	$('#clear-init').on('click', function () {
		clearInit();
		clearChar();
		clearInput();
	});
	$('#sort-init').on('click', function () {
		tinysort('ol#init-list>li', {
			order: 'desc',
			attr: 'data-init'
		});
		tinysort('section#main-battle>div', {
			order: 'desc',
			attr: 'data-init'
		});
	});
	$('#name-init').keypress(function (e) {
		if (e.which === KeyEvent.DOM_VK_RETURN) {
			addChar();
			return false;
		}
	});

	//character toggle dead
	$('#main-battle').on('click', '.dead-check', function () {
		var chara = $(this).parent().parent();
		chara.toggleClass('dead');
		var id = '.init' + chara.attr('id').substr(4);
		$('#init-list').find(id).toggleClass('dead');
	});

	//character remove
	$('#main-battle').on('click', '.remove-char', function () {
		var char = $(this).parent().parent();
		var id = '.init' + char.attr('id').substr(4);
		$('#init-list').find(id).remove();
		char.remove();
	});

	//character choose preset
	$('#main-battle').on('click', '.open-preset', function () {
		$('#popup').addClass('overlay-show');
		currentChar = $(this).parent().parent();
		var id = '.init' + currentChar.attr('id').substr(4);
		currentCharInit = $(id);
	});
	$('.popup').on('click', '.close-preset', function () {
		$('#popup').removeClass('overlay-show');
	});
	var i;
	for (i in presets) {
		var name = presets[i].name;
		var str = '<button class="preset-button" id="' + name + '">' + name + '</button>';
		$('.popup').append(str);
	}
	$('.popup').on('click', '.preset-button', function () {
		var lookingFor = $(this).attr('id');
		var i;
		for (i in presets) {
			if (presets[i].name === lookingFor) {
				var char = presets[i];
				currentChar.find('.hp').val(char.hp);
				currentChar.find('.mp').val(char.mp);
				currentChar.find('.ac').val(char.ac);
				currentChar.find('.str').val(char.str);
				currentChar.find('.dex').val(char.dex);
				currentChar.find('.con').val(char.con);
				currentChar.find('.int').val(char.int);
				currentChar.find('.wis').val(char.wis);
				currentChar.find('.cha').val(char.cha);
				currentChar.find('.actions').val(char.b_a);
				currentChar.find('.notes').val(char.note);
			}
		}
	});
	window.onclick = function (event) {
		if ($(event.target).is('.overlay')) {
			$('#popup').removeClass('overlay-show');
		}
	};

	// current initiative tracker
	$('#init-list').on('click', 'li', function () {
		currentCharInit.removeClass('active');
		currentChar.removeClass('active');
		currentCharInit = $(this);
		var id = '#name' + currentCharInit.attr('class').substr(4);
		currentCharInit.addClass('active');
		console.log(id);
		currentChar = $(id);
		currentChar.addClass('active');
	});

	// use keyboard to cycle through initiative
	document.onkeyup = function (e) {
		if (e.which === KeyEvent.DOM_VK_UP) {
			currentCharInit.removeClass('active');
			currentChar.removeClass('active');
			currentCharInit = currentCharInit.prev('li');
			currentChar = currentChar.prev('div');
			if (currentCharInit.length == 0) {
				currentCharInit = $('#init-list li:last-child');
				currentChar = $('#main-battle div:last-child');
			}
			while (currentCharInit.hasClass('dead')) {
				currentCharInit = currentCharInit.prev('li');
				currentChar = currentChar.prev('div');
			}
			currentCharInit.addClass('active');
			currentChar.addClass('active');
			currentChar.find('.hp').focus();
		}
		if (e.which === KeyEvent.DOM_VK_DOWN) {
			currentCharInit.removeClass('active');
			currentChar.removeClass('active');
			currentCharInit = currentCharInit.next('li');
			currentChar = currentChar.next('div');
			if (currentCharInit.length == 0) {
				currentCharInit = $('#init-list li:first-child');
				currentChar = $('#main-battle div:first-child');
			}
			while (currentCharInit.hasClass('dead')) {
				currentCharInit = currentCharInit.next('li');
				currentChar = currentChar.next('div');
			}
			currentCharInit.addClass('active');
			currentChar.addClass('active');
			currentChar.find('.hp').focus();
		}
	}
});
