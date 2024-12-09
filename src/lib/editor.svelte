<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { EditorManager } from './editor.svelte.js';
	import type { EditorOptions, EditorTool } from './types.js';

	interface Props extends Omit<EditorOptions, 'holder'> {}

	let props: Props = $props();

	let element: HTMLDivElement;
	let editorManager: EditorManager;

	onMount(async () => {
		const options: EditorOptions = {
			minHeight: 30,
			...props,
			holder: element
		};

		editorManager = new EditorManager(options);
		await editorManager.initialize();
	});

	onDestroy(() => {
		if (editorManager) {
			editorManager.destroy();
		}
	});

	// Public API
	export async function save() {
		return await editorManager?.save();
	}

	export async function registerTool(
		name: string,
		toolLoader: () => Promise<any>,
		config?: Partial<EditorTool>
	) {
		await editorManager?.registerTool(name, toolLoader, config);
	}

	export function setReadOnly(readOnly: boolean) {
		editorManager?.setReadOnly(readOnly);
	}

	export function getManager() {
		return editorManager;
	}
</script>

<div bind:this={element} class="editor-container"></div>

<style>
	.editor-container {
		border-radius: 4px;
		padding: 1rem 4rem;
		min-height: 200px;
	}

	:global(.ce-block__content) {
		max-width: none;
	}

	:global(.ce-toolbar__content) {
		max-width: none;
	}
</style>
