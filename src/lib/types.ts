import type {
    API,
    OutputData,
    BlockAPI,
    EditorConfig,
    LogLevels
} from '@editorjs/editorjs';

export interface I18nConfig {
    messages: {
        ui?: Record<string, string>;
        toolNames?: Record<string, string>;
        tools?: Record<string, Record<string, string>>;
        blockTunes?: Record<string, Record<string, string>>;
    };
}

export interface EditorTool {
    class: any;
    inlineToolbar?: boolean | string[];
    shortcut?: string;
    config?: Record<string, any>;
    tunes?: string[];
}

// Extend but override the logLevel type to match EditorJS's type
export interface EditorOptions extends Omit<Partial<EditorConfig>, 'logLevel'> {
    holder: HTMLElement;
    tools?: Record<string, EditorTool | any>;
    data?: OutputData;
    defaultBlock?: string;
    autofocus?: boolean;
    placeholder?: string;
    logLevel?: LogLevels;  // Use EditorJS's LogLevels type
    inlineToolbar?: boolean | string[];
    tunes?: string[];
    readOnly?: boolean;
    i18n?: I18nConfig;
    onReady?: () => void;
    onChange?: (api: API, event: CustomEvent) => void;
}

export type ToolsLoadMap = Record<string, () => Promise<any>>;

export interface EditorChangeEvent extends CustomEvent {
    type: 'block-added' | 'block-removed' | 'block-moved' | 'block-changed';
    detail: {
        target: BlockAPI;
        [key: string]: any;
    };
}