import { Platform, Plugin, TFile } from "obsidian";
import type { MarkdownView } from "obsidian";
import { platform } from "os";

console.log("Running on sample img");
export default class HtmlLocalSrcPlugin extends Plugin {
	async onload() {
		this.registerMarkdownPostProcessor((element, ctx) => {
			const active_file = this.app.workspace.getActiveFile();
			if (!active_file) {
				return;
			}
			const targetLinks = Array.from(element.getElementsByTagName("img"));
			let active_path = this.app.vault.getResourcePath(active_file);
			active_path = active_path.substring(
				0,
				active_path.lastIndexOf("/")
			);
			for (const link of targetLinks) {
				// For PC
				if (link.src.startsWith("app://obsidian.md/")) {
					link.src =
						active_path +
						"/" +
						link.src.replace("app://obsidian.md/", "");
				}
				// For iOS
				else if (link.src.startsWith("capacitor://localhost/")) {
					link.src =
						active_path +
						"/" +
						link.src.replace("capacitor://localhost/", "");
				}
			}
		});
	}
}
