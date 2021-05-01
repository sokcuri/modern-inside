<script lang="ts">
import { meta } from '@/store/meta';
import { getStore } from '@/store';

const count = getStore<number>('count', 0);
</script>

<div class="fl clear">
    <h2>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a on:click={_ => count.update(n => (n + 1) % 3)} href="javascript:void(0);">
            <span>{$meta.gall_title}</span>
            <span>({$count})</span>
            {#if $meta.gall_type === 'mgall'}
            <div class="pagehead_titicon mgall sp_img">
                <span class="blind">마이너</span>
            </div>
            {/if}
            {#if $meta.gall_type === 'ngall'}
            <div class="pagehead_titicon ngall sp_img">
                <span class="blind">미니</span>
            </div>
            {/if}
        </a>
    </h2>
</div>
