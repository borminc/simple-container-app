import { BindingContract } from './../../types/Container/Binding';
import { BindingResolver } from '../../types/Container/Binding';
import { ContainerContract } from '../../types/Container/Container';

export default class Binding<T> implements BindingContract<T> {
	private instance: T | undefined;

	constructor(
		public resolver: BindingResolver<T>,
		public singleton: boolean = false
	) {}

	getValue(c: ContainerContract): T {
		if (this.singleton) {
			return this.resolveSingleton(c);
		}

		return this.makeInstance(c);
	}

	asSingleton(): this {
		this.singleton = true;

		return this;
	}

	private resolveSingleton(c: ContainerContract): T {
		if (this.instance === undefined) {
			this.instance = this.makeInstance(c);
		}

		return this.instance;
	}

	private makeInstance(c: ContainerContract): T {
		return this.resolver(c);
	}
}
