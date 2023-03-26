import AppContract from '../types/App';

export default abstract class Provider {
	constructor(public app: AppContract) {}

	/**
	 * Register services into the container
	 *
	 * Warning: Since the container is being populated with services at this stage,
	 * don't get any service from the container. Do it in boot() instead when all services
	 * are registered.
	 */
	async register() {}

	/**
	 * Boot the module after all services are registered in the container
	 */
	async boot() {}

	/**
	 * Do any additional configs after all services are booted
	 */
	async booted() {}
}

export type ProviderClass = new (app: AppContract) => Provider;
