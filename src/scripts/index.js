import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/responsive.scss';
import './components/components.js';
import restaurants from './restaurants.js';
import drawer from './drawer.js';

console.log('Hello Coders! :)');

document.addEventListener('DOMContentLoaded', () => {
  restaurants();
  drawer();
});