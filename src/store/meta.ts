import { readable } from 'svelte/store';

const $page_head = document.querySelector('header > .page_head.clear');
const gall_link = $page_head?.querySelector<HTMLAnchorElement>('.fl > h2 > a')?.href;
const gall_title = $page_head?.querySelector<HTMLAnchorElement>('.fl > h2 > a')?.childNodes[0].nodeValue;

let gall_type: 'mgall' | 'ngall' | '';
if ($page_head?.querySelector('.pagehead_titicon.mgall')) {
    gall_type = 'mgall'
} else if ($page_head?.querySelector('.pagehead_titicon.ngall')) {
    gall_type = 'ngall'
} else {
    gall_type = '';
}

const list_search_heads = [...document.querySelectorAll('.center_box li > a')].map(x => ({
    name: x.innerHTML,
    searchHead: /^listSearchHead\('?([^'\)]+)'?\)$/.exec(x.getAttribute('onclick') || '')?.[1] || ''
}));

const gall_rank_title = document.querySelector('.ranking > .ranking_tit > span.blind')?.textContent;
const gall_rank_num = document.querySelector('.ranking > .rank_img em.blind')?.textContent;

let metadata = {
    gall_link,
    gall_title,
    gall_type,
    gall_rank_title,
    gall_rank_num,
    list_search_heads
};

export let meta = readable(metadata, () => {});

if (import.meta.hot) {
    if (import.meta.hot!.data.metadata) {
        metadata = import.meta.hot!.data.metadata;
        meta = readable(metadata, () => {});
    }
    import.meta.hot!.accept()
    import.meta.hot!.dispose(() => {
        import.meta.hot!.data.metadata = metadata
    })
}
