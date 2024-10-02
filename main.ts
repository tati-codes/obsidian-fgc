import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { walkreader } from 'parser';
// Remember to rename these classes and interfaces!


export type noad = {
  value: Element
  parent: Element | null
}

let node = (val: Element, rent: Element | null): noad => {
  return { value: val,
  parent: rent }
}

let walk = (element: any, result: any[] = []) => {
  if (element.childNodes && element.childNodes.length > 0) {
    for (var i = 0; i < element.childNodes.length; i++) {
      result.push(element)
      result.push(...walk(element.childNodes[i]))
    }
  } else {
    result.push(element);
    return result
  }
  return result
}

export default class MyPlugin extends Plugin {
	async onload() {
		this.registerMarkdownPostProcessor((element, context) => {
      let walked = walk(element)
      walkreader(walked);
    });
	}
}

