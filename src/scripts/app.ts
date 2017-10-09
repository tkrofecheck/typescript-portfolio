/* jshint esversion: 6 */
declare var window: any;
declare var requirejs: any;

import * as $ from "jquery";
import * as _ from "underscore";
import * as Handlebars from "handlebars";
import { App as myApp } from "./app/_namespace";
import { documentReady } from "./app/documentReady";

export interface requireCfgShim {
	[key: string]: Object;
}

export interface dataFiles {
	about: string;
	nav: string;
	portfolio: string;
	resume: string;
}

export interface requireCfg {
	baseUrl: string;
	findNestedDependencies: boolean;
	paths: {
		app: string
	};
	shim: requireCfgShim;
}

window.$ = $;
window._ = _;
window.Handlebars = Handlebars;

class Setup {
	config: Object;

	constructor (files: dataFiles, requireCfg: requireCfg) {
		console.log('new Setup()');
		this.config = {
			files: files,
			'require-config': requireCfg
		};

		myApp.docReady = new documentReady();
	}

	init() {
		requirejs.config(this.config['require-config']);
		requirejs(['app/main']);

		myApp.docReady.add(function() {
			console.log("myApp", myApp);
		});
	}
}

myApp.setup = new Setup(
	{
		about: 'data/about.json',
		nav: 'data/nav.json',
		portfolio: 'data/portfolio.json',
		resume: 'data/resume.json'
	},{
		baseUrl: 'scripts',
		findNestedDependencies: true,
		paths: {
			app: 'app'
		},
		shim: {
			'jquery-lazy': {
				deps: ['jquery'],
				exports: '$.fn.Lazy'
			}
		}
	}
);

myApp.setup.init();