# Svelty Editor

A Svelte wrapper for Editor.js with TypeScript support and enhanced configuration options.

## Features

- 🎯 Full TypeScript support
- ⚡ Dynamic tool registration
- 🌍 Internationalization (i18n) support
- 📝 Read-only mode
- 🛠 Customizable inline toolbar
- 🎨 Block tunes support
- 📊 Custom event handling
- 📝 Advanced configuration options

## Installation

```bash
npm install svelty-editor
# or
pnpm add svelty-editor
# or
yarn add svelty-editor
```

## Basic Usage

```svelte
<script lang="ts">
  import { Editor } from 'svelty-editor';
  import type { OutputData } from '@editorjs/editorjs';

  const handleChange = (data: OutputData) => {
    console.log('Content changed:', data);
  };
</script>

<Editor
  onChange={handleChange}
  placeholder="Start writing..."
  autofocus={true}
/>
```

## Advanced Configuration

```svelte
<script lang="ts">
  import { Editor } from 'svelty-editor';
  import type { OutputData } from '@editorjs/editorjs';
  
  let editor: any;

  const editorConfig = {
    defaultBlock: 'paragraph',
    autofocus: true,
    placeholder: 'Start writing an awesome story!',
    logLevel: 'ERROR',
    inlineToolbar: ['link', 'marker', 'bold', 'italic'],
    tools: {
      header: {
        inlineToolbar: true,
        config: {
          placeholder: 'Enter a header',
          levels: [1, 2, 3],
          defaultLevel: 1
        }
      },
      list: {
        inlineToolbar: true
      }
    },
    i18n: {
      messages: {
        ui: {
          'blockTunes.deleteTune.delete': 'Delete',
          'blockTunes.deleteTune.confirm': 'Confirm'
        },
        toolNames: {
          'header': 'Heading',
          'list': 'List'
        }
      }
    },
    onChange: (api, event) => {
      console.log('Content changed:', event);
    },
    onReady: () => {
      console.log('Editor is ready!');
    }
  };
</script>

<Editor
  bind:this={editor}
  {...editorConfig}
/>
```

## Adding Custom Tools

```typescript
// Registering a custom tool
await editor.registerTool(
  'customTool', 
  () => import('./CustomTool'),
  {
    inlineToolbar: true,
    config: {
      // custom tool configuration
    }
  }
);
```

## Available Methods

```typescript
// Save editor content
const data = await editor.save();

// Toggle read-only mode
editor.setReadOnly(true);

// Register a new tool
await editor.registerTool(name, toolLoader, config);

// Get editor manager instance for advanced usage
const manager = editor.getManager();
```

## Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `data` | `OutputData` | Initial editor content |
| `onChange` | `(data: OutputData) => void` | Callback when content changes |
| `placeholder` | `string` | Editor placeholder text |
| `autofocus` | `boolean` | Auto focus editor on load |
| `readOnly` | `boolean` | Enable read-only mode |
| `defaultBlock` | `string` | Default block type |
| `logLevel` | `'VERBOSE' \| 'INFO' \| 'WARN' \| 'ERROR'` | Logging level |
| `inlineToolbar` | `boolean \| string[]` | Configure inline toolbar |
| `tools` | `Record<string, EditorTool>` | Configure editor tools |
| `i18n` | `I18nConfig` | Internationalization config |
| `tunes` | `string[]` | Block tunes configuration |

## TypeScript Support

The library includes comprehensive TypeScript definitions. You can import types like this:

```typescript
import type { 
  EditorOptions,
  EditorTool,
  EditorChangeEvent 
} from 'svelty-editor';
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Credits

This library is powered by [Editor.js](https://editorjs.io/).