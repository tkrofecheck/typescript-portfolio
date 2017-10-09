declare var $: any;

/* Load Web App JavaScript Dependencies/Plugins */
import { App as myApp } from './_namespace';
import { documentReady } from './documentReady';
import { Section } from './Section';
import { Events } from './Events';
import { aboutTemplate } from "./hbTemplates";
import { portfolioTemplate } from "./hbTemplates";
import { resumeTemplate } from "./hbTemplates";

export class Main {
	about: any;
	docReady: any;
	portfolio: any;
	resume: any;

	constructor() {
		var datafile = myApp.setup.config.files;

		console.log('new Main()');
		this.about = new Section('about', datafile.about, aboutTemplate);
		this.portfolio = new Section('portfolio', datafile.portfolio, portfolioTemplate);
		this.resume = new Section('resume', datafile.resume, resumeTemplate);
	}

	init() {
		this.about.set();
		this.portfolio.set();
		this.resume.set();
		this.complete();
	}

	complete() {
		var _this = this;
		var done = function() {
			if (!_this.about.ready || !_this.resume.ready || !_this.portfolio.ready) {
				window.requestAnimationFrame(done);
				return;
			} else {
				Events();
				myApp.docReady.exec();
             }
		}

		done();
	}
}

myApp.main = new Main();
myApp.main.init();
