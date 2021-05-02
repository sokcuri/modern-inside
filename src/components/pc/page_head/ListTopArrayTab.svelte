<script lang="ts">
import { getStore } from '@/store';

enum ListKindTab {
    All = 'all',
    Recommend = 'recommend',
    Notice = 'notice'
}

const listTypeFilter = getStore<string>('listType', ListKindTab.All);

function makeListUrl(sType: string, bType: string) {
    var arrExceptionType = ["all","recommend","notice","movie","gallhit"];
	if (arrExceptionType.indexOf(sType) === -1) {
		return false;
	}

    const list_url = document.querySelector<HTMLInputElement>('#list_url')?.value;

	var params = ((bType != "list")?"&board_type="+bType:"");
		params += ((sType != "all")?"&exception_mode="+sType:"");

	var url = list_url + params;
	return url;
}

function onClickListKindTab(listKindTab: ListKindTab) {
    const url = makeListUrl(listKindTab, 'list');

    listTypeFilter.update(_ => listKindTab);
    console.log('target url', url);
}
</script>

<button type="button" class={$listTypeFilter === ListKindTab.All ? 'on' : '' } on:click={_ => onClickListKindTab(ListKindTab.All)}>전체글</button>
<button type="button" class={$listTypeFilter === ListKindTab.Recommend ? 'on' : '' } on:click={_ => onClickListKindTab(ListKindTab.Recommend)}>개념글</button>
<button type="button" class={$listTypeFilter === ListKindTab.Notice ? 'on' : '' } on:click={_ => onClickListKindTab(ListKindTab.Notice)}>공지</button>
<!--<button type="button" class="" onclick="listKindTab('movie','list');return false;">동영상</button>-->
