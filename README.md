# Prelander Collection

A collection of promotional landing pages built with React, Vite, and Tailwind CSS.

## Projects

1. **Wheel Prelander** (`prelander-wheel-netlify/`) - Spin wheel interactive landing page
2. **Newsletters Prelander** (`prelander-newsletters-netlify/`) - Email newsletter templates
3. **Scratch Prelander** (`prelander-scratch-netlify/`) - Scratch card interactive page
4. **Slot Prelander** (`prelander-slot-netlify/`) - Slot machine demo page

## Technology Stack

- React 18
- Vite
- Tailwind CSS
- PostCSS

## Development

Each prelander is a separate project. To work on a specific prelander:

```bash
cd prelander-[name]-netlify
npm install
npm run dev
```

## Building

To build all prelanders:

```bash
./build-all.sh
```

Or build individually:

```bash
cd prelander-[name]-netlify
npm run build
```

## Deployment

The projects are configured for deployment on:
- Netlify
- Cloudflare Pages
- GitHub Pages

Each project includes a `netlify.toml` configuration file.

## License

Private repository - All rights reserved