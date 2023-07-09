import {
	Editor, 
	MarkdownView
} from 'obsidian';

export const editorCommand = {
	id: 'create-new-template-button',
	name: 'Create Button',
	editorCallback: (editor: Editor, view: MarkdownView) => {
		editor.replaceRange(
			createCodeBlock(),
			editor.getCursor()
		);
	}
};

const createCodeBlock = (): string => {
  return "```template-button\n"+
		"title: Create File\n" +
		"template-path:\n" +
		"open-file: true\n" +
		"open-split: true\n" +
		"```";
};