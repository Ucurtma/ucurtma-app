import { addDecorator, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import '../styles/global.css';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withKnobs);
configure(loadStories, module);
