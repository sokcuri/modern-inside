<script lang="ts">
import { getStore } from '@/store';

const listTypeFilter = getStore<number>('count', 0);
</script>

<button type="button" class={$listTypeFilter === 0 ? 'on' : '' } on:click={_ => listTypeFilter.update(_ => 0)}>전체글</button>
<button type="button" class={$listTypeFilter === 1 ? 'on' : '' } on:click={_ => listTypeFilter.update(_ => 1)}>개념글</button>
<button type="button" class={$listTypeFilter === 2 ? 'on' : '' } on:click={_ => listTypeFilter.update(_ => 2)}>공지</button>
<!--<button type="button" class="" onclick="listKindTab('movie','list');return false;">동영상</button>-->
