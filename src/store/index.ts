import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

let stores: any = {}

export function getStore<T>(id: string, initialValue: any): Writable<T> {
  return stores[id] || (stores[id] = writable(initialValue))
}

if (import.meta.hot) {
  if (import.meta.hot!.data.stores) {
    stores = import.meta.hot!.data.stores
  }
  import.meta.hot!.accept()
  import.meta.hot!.dispose(() => {
    import.meta.hot!.data.stores = stores
  })
}
