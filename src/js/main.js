import '../styles/main.scss';

// Mobile navigation. The panel is a sheet under the fixed shell; the button
// owns the expanded state so the styling and the accessibility tree agree.
const toggle = document.querySelector('[data-menu-toggle]');
const panel = document.getElementById('shell-panel');

if (toggle && panel) {
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute(
      'aria-label',
      open ? 'Close navigation menu' : 'Open navigation menu'
    );
    panel.setAttribute('data-open', String(open));
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  // A resize into the `lg` layout restores the inline nav; drop the sheet so
  // it cannot be left open behind it.
  const wide = window.matchMedia('(min-width: 66rem)');
  wide.addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}
