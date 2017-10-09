declare var $: any;

export function setData(me: any) {
	$.ajax({
		url: me.url,
		method: 'GET'
	}).fail(function(error) {
		me.error = error;
	}).done(function(data, message) {
		if (message === 'success') {
			me.data = data;
			console.log('setData done: ' + me.section);
			me.init();
		} else {
			me.data = { 'message' : message };
		}
	});
}