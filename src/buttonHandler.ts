import {
	App,
	Notice,
	TFile
} from 'obsidian';

export interface ParamMap {
  buttonLabel?: string,
  title?: string,
  templatePath?: string,
  openNote?: string,
  openSplit?: string,
  targetFolder?: string
}

export interface ReplaceMap extends Map<string, string> {}

export async function buttonClicked(
	app: App,
	params: ParamMap,
  replaces: ReplaceMap
) {
  const {templatePath, title, targetFolder, openNote, openSplit} = params;
  const templateFile = findSpecificFile(app, templatePath);

	if (templateFile) {
		const content = await app.vault.read(templateFile);
    const newContent = replaceContent(content, replaces);
		const newFilePath = targetFolder? `${targetFolder}/${title}` : title
		const newFile = await createNote(app, newContent, newFilePath);
    openFileIfDesired(newFile, openNote, openSplit);
	}
}

function replaceContent(
  content: string,
  replaces: ReplaceMap
): string {
  let newContent = content;
  for (let [key, value] of replaces) {
    newContent = newContent.replaceAll(`{{${key}}}`, value);
  }
  return newContent;
}

function openFileIfDesired(
  file?: TFile | null,
  open?: string,
  split?: string
) {
  if (file) {
    if (open == undefined || open == 'true') {
      if (split == 'true') {
        app.workspace.getLeaf('split', 'vertical').openFile(file);
      } else {
        app.workspace.getLeaf().openFile(file);
      }
    }
  }
}

function findSpecificFile(
  app: App,
  path?: string
): TFile | null {
  try {
    const abstract = app.vault.getAbstractFileByPath(path + '.md') as TFile;
    if(abstract) {
      return abstract;
    } else {
      new Notice('Template file was not found', 2000);
      return null;
    }         
  } catch (e) {
    new Notice('Template path does not point to a valid file.', 2000);
    console.error(e);
    return null;
  }
}

async function createNote(
  app: App,
  content: string,
  path?: string
): Promise<TFile | null> {
	try {
		const file = await app.vault.create(`${path}.md`, content);
    return file
	} catch (e) {
		new Notice('There was an error! Maybe the file already exists?', 2000);
    console.error(e);
    return null;
	}
}