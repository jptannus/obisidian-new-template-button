import {
	App,
	MarkdownRenderChild,
	MarkdownPostProcessorContext,
} from 'obsidian';

import { 
  buttonClicked,
  ParamMap,
  ReplaceMap
} from './buttonHandler';

export function markdownPostProcessor(
	app: App,
	el: HTMLElement, 
	context: MarkdownPostProcessorContext
) {
	const blocks = el.querySelectorAll('code')
	for (let index = 0; index < blocks.length; index++) {
		var block = blocks.item(index);
		if (block.className == 'language-template-button') {
			processBlock(app, block, context);
		}
	}
}

function processBlock(
	app: App,
	block: HTMLElement,
	context: MarkdownPostProcessorContext
) {
  const content = block.innerText.trim();
  const lines = content.split('\n');
  let params = {};
  let replaces = new Map();
  for (var i = 0; i < lines.length; i++) {
    const line = lines[i];
    params = extractParameters(line, params);
    replaces = extractReplaces(line, replaces);
  }
	context.addChild(
		new InlineButton(
			app,
			block, 
			params,
      replaces
			))
}

function extractParameters(
  line: string,
  params: ParamMap,
): ParamMap {
  if (line.startsWith('title')) {
    params.title = extractParameterValue(line, 'title');
  } else if (line.startsWith('templatePath')) {
    params.templatePath = extractParameterValue(line, 'templatePath');
  } else if (line.startsWith('openNote')) {
    params.openNote = extractParameterValue(line, 'openNote');
  } else if (line.startsWith('openSplit')) {
    params.openSplit = extractParameterValue(line, 'openSplit');
  } else if (line.startsWith('targetFolder')) {
    params.targetFolder = extractParameterValue(line, 'targetFolder');
  }
  return params;
}

function extractReplaces(
  line: string,
  replaces: ReplaceMap
): ReplaceMap {
  if (line.startsWith('replace')) {
    const parts = line.split(':');
    const toBeReplaced = parts[0].split('replace-')[1];
    const newValue = parts[1].trim();
    replaces.set(toBeReplaced, newValue);
  }
  return replaces;
}

function extractParameterValue(
  line: string, 
  param: string
): string {
  return line.split(`${param}:`)[1].trim();
}

class InlineButton extends MarkdownRenderChild {
  constructor(
		public app: App,
    public el: HTMLElement,
		public params: ParamMap,
    public replaces: ReplaceMap
  ) {
    super(el);
  }
  async onload() {
    const button = this.el.createEl('button');
		button.innerHTML = this.params.title || 'No title';
		button.on('click', 'button', () => buttonClicked(this.app, this.params, this.replaces))
    this.el.replaceWith(button);
  }
}
