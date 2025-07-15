# Pokémon GO Trainer Level Calculator

A modern React.js calculator for Pokemon GO trainer levels, redesigned with Tailwind CSS.

## Features

- Calculate time to reach target trainer levels
- Modern responsive design with Tailwind CSS
- Mobile-friendly interface
- Smooth animations and transitions

## Development

```bash
npm install
npm start
```

## Deployment

The app is deployed to GitHub Pages:
- Main site: https://CalamityJames.github.io/levelspeed/
- PR Previews: Automatically deployed to `https://CalamityJames.github.io/levelspeed/pr-[number]/`

To deploy manually:
```bash
npm run deploy
```

## PR Preview System

This repository includes an automated PR preview system that:
- Deploys each PR to a unique URL for testing
- Updates the preview when new commits are pushed
- Automatically cleans up preview deployments when PRs are closed
- Posts preview URLs as comments on PRs

Based on [react-redux-starter-kit](https://github.com/cloudmu/react-redux-starter-kit)
