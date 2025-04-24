import './style.css';
import createRouter from './router';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = '';

const mainContainer = document.createElement('main');
mainContainer.className = 'container relative px-4 py-8 mx-auto top-12';

const closeButton = document.getElementsByClassName('comment-modal');
if (closeButton) {
  console.log(closeButton);
}

if (!document.body.contains(app)) {
  document.body.appendChild(app);
}

app.appendChild(mainContainer);

const router = createRouter(mainContainer);
router.init();