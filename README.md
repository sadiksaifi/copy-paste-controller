# Copy & Paste Controller

A Chrome extension that gives you control over copy and paste functionality on any webpage.

## Motivation

Many websites disable copy-paste functionality, which can be incredibly frustrating when you need to grab a quote, save some text, or fill out forms efficiently. I created this extension to solve this annoying limitation that I frequently encountered. By giving users control over copy-paste functionality, this extension helps restore a basic browser feature that should never have been disabled in the first place.

If you've ever been frustrated by websites that block copy-paste, this extension is for you!

## Features

- Enable/disable copy and paste with one click
- Persistent settings across browser sessions
- Clean, modern interface
- Works on any webpage

## Screenshots

### Enabled State
![Copy/Paste Enabled](store-assets/screenshots/screenshot-1.png)

### Disabled State
![Copy/Paste Disabled](store-assets/screenshots/screenshot-2.png)

## Installation

1. Visit the Chrome Web Store
2. Search for "Copy & Paste Controller"
3. Click "Add to Chrome"

## Development

1. Clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable Developer Mode
4. Click "Load unpacked" and select the extension directory

## Building for Production

1. Update version in `manifest.json`
2. Zip the following files:
   - manifest.json
   - popup.html
   - popup.js
   - background.js
   - styles.css
   - icons/

## Changelog

### Version 1.0.0 (December 16, 2024)
- Initial release
- Core functionality: Enable/disable copy and paste on any webpage
- Persistent settings across browser sessions
- Clean, modern user interface
- Support for all websites

### Future Roadmap
- [ ] Add custom website-specific settings
- [ ] Implement keyboard shortcuts
- [ ] Create more granular copy/paste controls
- [ ] Add localization support
- [ ] Add Safari support

## License

This project is licensed under [GNU GPL v3](LICENSE).

## Support

For support or feedback, please contact:

Sadik Saifi
- Website: https://www.sadiksaifi.dev
- Email: email@sadiksaifi.dev 