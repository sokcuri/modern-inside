async function main() {
  const parts = import.meta.svelteGlob()
  
  let target: HTMLElement | null;
  const hydrate = true;

  target = document.querySelector('.page_head.clear > .fl');
  if (target) {
    new parts.PageHeadLeft({ target, hydrate })
  }
  
  target = document.querySelector('.list_array_option.clear > .array_tab.left_box');
  if (target) {
    new parts.ListTopArrayTab({ target, hydrate })
  }
  
  target = document.querySelector('.list_array_option.clear > .array_tab.left_box + .center_box');
  if (target) {
    new parts.ListTopCenterBox({ target, hydrate })
  }
}

main();
