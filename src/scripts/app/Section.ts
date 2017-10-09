declare var $: any;
declare var Handlebars: any;

import { App as myApp } from './_namespace';
import { setData } from "./setData";
import { bindEvent } from "./bindEvent";

export class Section {
	data: JSON;
	ready: boolean;
	section: string;
	template: string;
	url: string;

	constructor(section: string, url: string, hbTemplate: string) {
		this.url = url;
		this.ready = false;
		this.section = section;
		this.template = hbTemplate;
	}

	get() {
		return this.data;
	}

	set() {
		setData(this);
	}

	init() {
		var _this = this;
		var callbacks = function() {
			_this.render();
		}.bind(_this);

		myApp.docReady.add(callbacks);
		_this.ready = true;

		console.log('init()', _this.section);
	}

	render() {
		var _this = this;
		var $section = $("#" + _this.section);
		var template = Handlebars.compile(_this.template);
		var html = template(_this.get());

		console.log("render()", this.section);

		$(html).appendTo($section).hide().fadeIn(1000);
	}
}