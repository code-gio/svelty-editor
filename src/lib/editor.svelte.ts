// EditorManager.ts
import type EditorJS from '@editorjs/editorjs';
import type {
    EditorOptions,
    ToolsLoadMap,
    EditorTool,
    EditorChangeEvent
} from './types.jsxs';

export class EditorManager {
    private editor?: EditorJS;
    private options: EditorOptions;
    private toolsLoadMap: ToolsLoadMap = {};
    private initializedTools: Record<string, any> = {};

    constructor(options: EditorOptions) {
        this.options = this.normalizeOptions(options);
        this.setupToolsLoadMap();
    }

    private normalizeOptions(options: EditorOptions): EditorOptions {
        return {
            ...options,
            tools: options.tools || {},
            onChange: (api, event) => {
                if (options.onChange) {
                    options.onChange(api, event as EditorChangeEvent);
                }
            }
        };
    }

    private setupToolsLoadMap() {
        // Default tools
        this.toolsLoadMap = {
            header: () => import('@editorjs/header'),
            list: () => import('@editorjs/list'),
            paragraph: () => import('@editorjs/paragraph')
        };
    }

    async registerTool(name: string,
        toolLoader: () => Promise<any>,
        config?: Partial<EditorTool>) {
        this.toolsLoadMap[name] = toolLoader;

        if (config) {
            this.options.tools = {
                ...this.options.tools,
                [name]: config
            };
        }

        if (this.editor) {
            await this.reinitialize();
        }
    }

    private async loadTools(): Promise<Record<string, EditorTool>> {
        const tools: Record<string, EditorTool> = {};

        for (const [name, config] of Object.entries(this.options.tools || {})) {
            if (this.toolsLoadMap[name]) {
                const loadedTool = await this.toolsLoadMap[name]();

                tools[name] = {
                    class: loadedTool.default,
                    ...(typeof config === 'object' ? config : {})
                };

                this.initializedTools[name] = tools[name];
            }
        }

        return tools;
    }

    async initialize(): Promise<void> {
        const EditorModule = await import('@editorjs/editorjs');
        const tools = await this.loadTools();

        this.editor = new EditorModule.default({
            ...this.options,
            tools,
        });

        await this.editor.isReady;
    }

    async reinitialize(): Promise<void> {
        if (this.editor) {
            const data = await this.save();
            this.destroy();
            this.options.data = data || undefined;
            await this.initialize();
        }
    }

    async save() {
        if (this.editor) {
            return await this.editor.save();
        }
        return null;
    }

    destroy(): void {
        if (this.editor) {
            this.editor.destroy();
            this.editor = undefined;
        }
    }

    getEditor(): EditorJS | undefined {
        return this.editor;
    }

    setReadOnly(readOnly: boolean): void {
        if (this.editor) {
            this.editor.readOnly.toggle(readOnly);
        }
    }

    clearTools(): void {
        this.toolsLoadMap = {};
        this.initializedTools = {};
    }

    getInitializedTools(): Record<string, EditorTool> {
        return this.initializedTools;
    }
}