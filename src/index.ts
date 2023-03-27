import App from './Foundation/App';
import Provider from './Foundation/Provider';

class Person {
	constructor(public name: string, public age: number) {}
}

class AProvider extends Provider {
	async register() {
		this.app.register('a', app => new Person('A', 10));
	}

	async boot() {
		console.log(this.app.get('b'));
	}
}

class BProvider extends Provider {
	async register() {
		this.app.register('b', app => new Person('B', 10));
	}

	async boot() {
		console.log(this.app.get('a'));
	}
}

async function main() {
	const app = new App();

	await app.registerProviders([AProvider, BProvider]);

	await app.boot();
}

main();
