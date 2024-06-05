import { Signal } from 'signal-polyfill'
let a2 = []
let pending = false
let w = new Signal.subtle.Watcher(()=>{
	if (!pending) {
		pending = true
		queueMicrotask(()=>{
			pending = false
			for (let s of w.getPending()) s.get()
			w.watch()
		})
	}
})
for (let iter = 1; iter <= 1000; iter++) {
	let a1 = new Array(1000)
	a2.push(a1)
	a1[0] = new Signal.State(1)
	for (let i = 1; i < 1000; i++) {
		a1[i] = new Signal.Computed(()=>a1[i - 1].get() + 10)
	}
	w.watch(a1[999])
	a1[999].get()
	console.info(iter * 1000, (process?.memoryUsage ?? Deno?.memoryUsage)())
}
await new Promise(resolve=>setTimeout(resolve, 0))
console.info('total: ' + a2.length * 1000, (process?.memoryUsage ?? Deno?.memoryUsage)())
