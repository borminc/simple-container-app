import { ProviderClass } from './Provider';
import type ProviderContract from '../types/Provider';
import Container from './Container/Container';

export default class App extends Container {
	providers: ProviderContract[];

	constructor() {
		super();

		this.providers = [];
	}

	async boot() {
		for (const provider of this.providers) {
			await this.bootProvider(provider);
		}
	}

	async registerProviders(providers: ProviderClass[]) {
		for (const provider of providers) {
			await this.registerProvider(provider);
		}
	}

	async registerProvider(provider: ProviderClass) {
		const p = new provider(this);

		await p.register();

		this.providers.push(p);
	}

	async bootProvider(provider: ProviderContract) {
		await provider.boot();
	}
}
