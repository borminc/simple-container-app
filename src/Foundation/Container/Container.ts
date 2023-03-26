import { BindingKey, BindingResolver } from '../../types/Container/Binding';
import { ContainerContract } from '../../types/Container/Container';
import Binding from './Binding';

export default class Container implements ContainerContract {
	/**
	 * The global instance (if any)
	 */
	private static _instance: Container | undefined;

	/**
	 * Bindings in the container
	 */
	bindings: Map<BindingKey, Binding<any>>;

	constructor() {
		this.bindings = new Map();
	}

	static get instance(): Container {
		if (Container._instance === undefined) {
			Container._instance = new Container();
		}

		return Container._instance;
	}

	static setGlobalInstance(container: Container) {
		Container._instance = container;
	}

	register<T>(key: BindingKey, resolver: BindingResolver<T>): Binding<T> {
		if (this.bindings.has(key)) {
			this.throwUnregisteredBinding(key);
		}

		const binding = new Binding(resolver);

		this.bindings.set(key, binding);

		return binding;
	}

	get<T>(key: BindingKey): T {
		const binding = this.bindings.get(key);

		if (!binding) {
			this.throwUnregisteredBinding(key);
		}

		return binding.getValue(this);
	}

	getOptional<T>(key: BindingKey): T | undefined {
		try {
			return this.get(key);
		} catch (e) {
			return undefined;
		}
	}

	destroy(key: BindingKey) {
		if (this.bindings.has(key)) {
			this.bindings.delete(key);
		}
	}

	private throwUnregisteredBinding(key: BindingKey): never {
		throw new Error(`${key} is not registered in the container.`);
	}
}
