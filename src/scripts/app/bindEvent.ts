declare var _: any;

export function bindEvent(element: any, eventName: string, cb: any) {
	if (_.isString(element)) {
		$(element).on(eventName, cb);
	}

	if(_.isObject(element)) {
		element.on(eventName, cb);
	}
}