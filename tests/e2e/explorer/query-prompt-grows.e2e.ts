import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { DATA, NAVIGATION } from './explorer-page';

// Rule: the Query page's prompt box grows with the question, so a question of a few lines reads whole,
// with no scroll inside the box. The box is PromptBox in components/explorer-v2/evm/QueryWorking.tsx.

const PATH = '/explorer/mainnet/c-chain/query';
const QUESTION =
  'Give me a stacked 7-day trailing average of the C-Chain transaction fees split by the top 5 contracts by fees paid, and the rest as other, over the last 90 days';

/** how far the box's text runs past what the box shows, in px; 0 when the question reads whole */
function hiddenPx(): number {
  const box = document.querySelector('textarea');
  return box ? box.scrollHeight - box.clientHeight : -1;
}

test('a long question grows the prompt box instead of scrolling inside it', { timeout: 180_000 }, async ({ app, screen, browser }) => {
  await app.open(PATH);
  const box = screen.getByRole('textbox', /^Ask (Avalanche )?C-Chain about/);
  await expect(box).toBeVisible(NAVIGATION);
  // typed again until React is live: a value typed before hydration would not grow the box
  await expect
    .poll(async () => {
      await box.fill(QUESTION);
      return browser.evaluate(hiddenPx);
    }, DATA)
    .toBe(0);
});
