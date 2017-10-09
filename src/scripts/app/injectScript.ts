declare var $: any;

export function injectScript(obj: any) {
	var deferred = $.Deferred();
	var $script = $(document.createElement('script'));
	var scriptReady = function() {
		if (!$script.size()) {
			window.requestAnimationFrame(scriptReady);
			return;
		} else {
			deferred.resolve($script);
		}
	};

	$script.attr(obj.attr);
	$script.html(obj.html);

	$('head').append($script);

	scriptReady();

	return deferred.promise();
}