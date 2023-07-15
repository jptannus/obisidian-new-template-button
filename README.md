# Obsidian New Template Button

Add a button that create new files based on templates in a way that you can replace strings.

## Motivation 
I missed a way to add a button to my daily notes template that could create new notes based on other templates that could be customizable.

# Usage
You can create a button by using the command `New Template Button: Create Button` or by adding the following to your note:
````
```template-button
title: New Note
templatePath: Templates/TemplateFile
targetFolder: TargetFolder
openNote: true
openSplit: true
```
````
where:

**title**

Is the label of the button and the title of the new note.

**templatePath**

Is the path to the template file to be used to create the new note.

**targetFolder**

Is the folder where you want the new note to be created in.

**openNote**

This flag let the plugin know if you want to open the new note after it was created. It is set to `true` by default.

**openSplit**

If `openNote` is `true`, this flag let the plugin know you want to open the new note in a **vertical split on the right side**. It is set to `false` by default.

## Templating

The main feature of the plugin is to be able to replace strings that are in the original template following a pattern.

As an example if I add the following line to my button configuration:
```
replace-date: 2023-10-10
```
All occurances of the string `{{date}}` in the template will be replaced by `2023-10-10`.

You can add as many replace lines as you like.

# Change log

### v1.1.0
- Added button label property.
- Fixed issue where not all occurrences of the text to be replaced would be replaced.

# TODO
[ ] - Use normalize path (https://marcus.se.net/obsidian-plugin-docs/publishing/submission-guidelines)
[ ] - Publish it to the official repo (https://marcus.se.net/obsidian-plugin-docs/publishing/submit-your-plugin)
[ ] - Create an option to use a modal to create new notes (adding title and tags)
[ ] - Create GitHub actions to create new releases (https://marcus.se.net/obsidian-plugin-docs/publishing/release-your-plugin-with-github-actions)