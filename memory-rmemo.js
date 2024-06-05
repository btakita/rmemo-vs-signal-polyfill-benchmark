import { memo_, sig_ } from 'ctx-core/rmemo'
let a2 = []
for (let iter = 1; iter <= 1000; iter++) {
	const a1 = new Array(1000)
	a2.push(a1)
	a1[0] = sig_(1)
	for (let i = 1; i < 1000; i++) {
		a1[i] = memo_(()=>a1[i - 1]() + 10)
	}
	a1[999]()
	console.info(iter * 1000, (process?.memoryUsage ?? Deno?.memoryUsage)())
}
await new Promise(resolve=>setTimeout(resolve, 0))
console.info('total: ' + a2.length * 1000, (process?.memoryUsage ?? Deno?.memoryUsage)())
