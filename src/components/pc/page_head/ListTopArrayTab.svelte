<script lang="ts">
import { getStore } from '@/store';

enum ListKindTab {
    All = 'all',
    Recommend = 'recommend',
    Notice = 'notice'
}

const listTypeFilter = getStore<string>('listType', getSType());

function getSType() {
    return new URL(location.href).searchParams.get('exception_mode') || 'all';
}

function makeListUrl(newParam: string, newValue: string) {
    // const pathname = window.location.pathname;
	// const params = window.location.search;

	var list_url = '/board/lists/';

    const _GALLERY_TYPE_ = /var\s_GALLERY_TYPE_\s=\s"(.+)";/
        .exec(
            [...document.querySelectorAll('script')]
            .find(x => x.innerHTML.search('var _GALLERY_TYPE_') !== -1)?.innerHTML || ''
        )?.[1];

	if(_GALLERY_TYPE_ === 'M') {
		list_url = '/mgallery/board/lists/';
	}
	if(_GALLERY_TYPE_ === 'MI') {
		list_url = '/mini/board/lists/';
	}

    // const current_type = document.querySelector<HTMLInputElement>("#current_type")?.value;
	const page = document.querySelector<HTMLInputElement>("#page")?.value || 1;
    const exception_mode = document.querySelector<HTMLInputElement>("#exception_mode")?.value;
    const list_num = document.querySelector<HTMLInputElement>("#list_num")?.value;
    const sort_type = document.querySelector<HTMLInputElement>("#sort_type")?.value;
    const board_type = document.querySelector<HTMLInputElement>("#board_type")?.value;
    const gallery_id = document.querySelector<HTMLInputElement>("#gallery_id")?.value || document.querySelector<HTMLInputElement>("#id")?.value;
	// const content_no = document.querySelector<HTMLInputElement>("#no")?.value;
    const s_type = document.querySelector<HTMLInputElement>("#s_type")?.value;
    const s_keyword = document.querySelector<HTMLInputElement>("#s_keyword")?.value;
    const search_head = document.querySelector<HTMLInputElement>("#search_head")?.value;
	
	list_url += "?id=" + gallery_id;
	
	if (newParam == "list_num") {
		list_url += "&list_num=" + newValue;
	} else {
		if (list_num !== '50') list_url += "&list_num=" + list_num;
	}

	if (newParam == "sort_type") {
		list_url += "&sort_type=" + newValue;
	} else {
		list_url += "&sort_type=" + sort_type;
	}

	if (newParam == "exception_mode") {
		list_url += "&exception_mode=" + newValue;
	} else {
		if (exception_mode !== 'all') list_url += "&exception_mode=" + exception_mode;
	}

	if (newParam == "search_head") {
		if (newValue != 'all') list_url += "&search_head=" + newValue;
	} else {
		if (search_head !== 'all') list_url += "&search_head=" + search_head;
	}

	if (s_type != "" && s_keyword != ""){
		list_url += "&s_type=" + s_type;
		list_url += "&s_keyword=" + s_keyword;
	}
	
	if (newParam == "search_head") {
		list_url += "&page=1";
	} else {
		list_url += "&page=" + page;		
	}
	
	if (board_type == 'album') {
		list_url += "&board_type=" + board_type;
	}
	return list_url;
}

async function onClickListKindTab(listKindTab: ListKindTab) {
    listTypeFilter.update(_ => listKindTab);
    setTimeout(() => onRequestGallList(listKindTab), 50);
}

async function onRequestGallList(listKindTab: ListKindTab) {
    const url = makeListUrl(listKindTab, 'list') as string;
    const resp = await fetch(url as string);
    const html = await resp.text();

    const div = document.createElement('div');
    div.innerHTML = html;
    const gall_list = div.querySelector('table.gall_list')?.innerHTML;

    if ($listTypeFilter !== listKindTab) return;

    if (gall_list) {
        document.querySelector('table.gall_list')!.innerHTML = gall_list;
    }
    console.log('target url', url, html);
}
</script>

<button type="button" class={$listTypeFilter === ListKindTab.All ? 'on' : '' } on:click={_ => onClickListKindTab(ListKindTab.All)}>전체글</button>
<button type="button" class={$listTypeFilter === ListKindTab.Recommend ? 'on' : '' } on:click={_ => onClickListKindTab(ListKindTab.Recommend)}>개념글</button>
<button type="button" class={$listTypeFilter === ListKindTab.Notice ? 'on' : '' } on:click={_ => onClickListKindTab(ListKindTab.Notice)}>공지</button>
<!--<button type="button" class="" onclick="listKindTab('movie','list');return false;">동영상</button>-->
