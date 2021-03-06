/*
 * slider_methods.js
 */
(function($) {

module("slider: methods");

test("init", function() {
	expect(6);

	$("<div></div>").appendTo('body').slider().remove();
	ok(true, '.slider() called on element');

	$([]).slider().remove();
	ok(true, '.slider() called on empty collection');

	$('<div></div>').slider().remove();
	ok(true, '.slider() called on disconnected DOMElement');

	$('<div></div>').slider().slider("foo").remove();
	ok(true, 'arbitrary method called after init');

	var el = $('<div></div>').slider();
	var foo = el.slider("option", "foo");
	el.remove();
	ok(true, 'arbitrary option getter after init');

	$('<div></div>').slider().slider("option", "foo", "bar").remove();
	ok(true, 'arbitrary option setter after init');
});

test("destroy", function() {
	$("<div></div>").appendTo('body').slider().slider("destroy").remove();
	ok(true, '.slider("destroy") called on element');

	$([]).slider().slider("destroy").remove();
	ok(true, '.slider("destroy") called on empty collection');

	$('<div></div>').appendTo('body').remove().slider().slider("destroy").remove();
	ok(true, '.slider("destroy") called on disconnected DOMElement');

	$('<div></div>').slider().slider("destroy").slider("foo").remove();
	ok(true, 'arbitrary method called after destroy');

	var expected = $('<div></div>').slider(),
		actual = expected.slider('destroy');
	equals(actual, expected, 'destroy is chainable');
});

test("enable", function() {
	var expected = $('<div></div>').slider(),
		actual = expected.slider('enable');
	equals(actual, expected, 'enable is chainable');

	var el = $('<div></div>').slider({ disabled: true });
	ok(el.hasClass('ui-disabled'), 'slider has ui-disabled class before enable method call');
	ok(el.hasClass('ui-slider-disabled'), 'slider has ui-slider-disabled class before enable method call');
	el.slider('enable');
	ok(!el.hasClass('ui-disabled'), 'slider does not have ui-disabled class after enable method call');
	ok(!el.hasClass('ui-slider-disabled'), 'slider does not have ui-slider-disabled class after enable method call');
});

test("disable", function() {
	var expected = $('<div></div>').slider(),
		actual = expected.slider('disable');
	equals(actual, expected, 'disable is chainable');

	var el = $('<div></div>').slider({ disabled: false });
	ok(!el.hasClass('ui-disabled'), 'slider does not have ui-disabled class before disabled method call');
	ok(!el.hasClass('ui-slider-disabled'), 'slider does not have ui-slider-disabled class before disable method call');
	el.slider('disable');
	ok(el.hasClass('ui-disabled'), 'slider has ui-disabled class after disable method call');
	ok(el.hasClass('ui-slider-disabled'), 'slider has ui-slider-disabled class after disable method call');
});

test("value", function() {
	$([false, 'min', 'max']).each(function() {
		var el = $('<div></div>').slider({
			range: this,
			value: 5
		});
		equals(el.slider('value'), 5, 'range: ' + this + ' slider method get');
		el.slider('value', 10);
		equals(el.slider('value'), 10, 'range: ' + this + ' slider method set');
		el.remove();
	});
	var el = $('<div></div>').slider({
		min: -1, value: 0, max: 1
	});
	// min with value option vs value method
	el.slider('option', 'value', -2);
	equals(el.slider('option', 'value'), -2, 'value option does not respect min');
	equals(el.slider('value'), -1, 'value method get respects min');
	el.slider('value', -2);
	equals(el.slider('option', 'value'), -1, 'value method set respects min');
	// max with value option vs value method
	el.slider('option', 'value', 2);
	equals(el.slider('option', 'value'), 2, 'value option does not respect max');
	equals(el.slider('value'), 1, 'value method get respects max');
	el.slider('value', 2);
	equals(el.slider('option', 'value'), 1, 'value method set respects max');
});

test("values", function() {
	ok(false, "missing test - untested code is broken code.");
});

})(jQuery);
