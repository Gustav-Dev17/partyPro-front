import { boot } from 'quasar/wrappers';
import { vMaska } from 'maska';

export default boot(({ app }) => {
  app.directive('maska', vMaska);
});
