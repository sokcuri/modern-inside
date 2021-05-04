<script lang="ts">
import { meta } from '@/store/meta';
</script>

<div class="fl clear">
    <h2>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a on:click={_ => location.href = $meta.gall_link || ''} href="javascript:void(0);">
            <span>{$meta.gall_title}</span>
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
