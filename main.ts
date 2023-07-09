import {
	Plugin,
} from 'obsidian';

import {editorCommand} from './src/editorCommand';
import {markdownPostProcessor} from './src/markdownProcessor';

export default class NewTemplateButtonPlugin extends Plugin {

	async onload() {
		this.addCommand(editorCommand);
		this.registerMarkdownPostProcessor((el, context) => {
			markdownPostProcessor(this.app, el, context);
		})
	}
}