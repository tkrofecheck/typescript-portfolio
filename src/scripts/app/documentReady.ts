declare var _: any;
declare var $: any;

export class documentReady {
	functions: Array<any>;

	constructor() {
		this.functions = [];
	}

	add(cb: any) {
		if (_.isFunction(cb)) {
			this.functions.push(cb);
		} else {
			console.log('not a valid function: ', cb);
			return false;
		}
	}

	exec() {
		var _this = this;

		$(function($) {
			console.log('render sections...');
			for (let i:number = 0; i<_this.functions.length; i++) {
				_this.functions[i]();
			}
		});
	}
}