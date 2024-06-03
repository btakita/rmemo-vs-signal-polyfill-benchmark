import Benchmark from 'benchmark'
import { memo_, sig_} from 'ctx-core/rmemo'
import { Signal } from 'signal-polyfill'
const suite = new Benchmark.Suite
suite
	.add('1000 Signal chain: without watcher', ()=>{
		let a1 = new Array(1000)
		a1[0] = new Signal.State(1)
		for (let i = 1; i < 1000; i++) {
			a1[i] = new Signal.Computed(()=>a1[i - 1].get() + 10)
		}
		a1[999].get()
	})
	.add('1000 Signal chain: with watcher', ()=>{
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
		let a1 = new Array(1000)
		a1[0] = new Signal.State(1)
		for (let i = 1; i < 1000; i++) {
			a1[i] = new Signal.Computed(()=>a1[i - 1].get() + 10)
		}
		w.watch(a1[999])
		a1[999].get()
	})
	.add('1000 rmemo chain', ()=>{
		let a1 = new Array(1000)
		a1[0] = sig_(1)
		for (let i = 1; i < 1000; i++) {
			a1[i] = memo_(()=>a1[i - 1]() + 10)
		}
		a1[999]()
	})
	.on('error', err=>console.error(err))
	.on('cycle', event=>{
		console.log(String(event.target))
	})
	.on('complete', function() {
		console.log('Fastest is ' + this.filter('fastest').map('name'))
	})
	.run()
