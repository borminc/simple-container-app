import { ContainerContract } from './Container';

export type BindingKey = any;

export type BindingResolver<T> = (c: ContainerContract) => T;

export interface BindingContract<T> {
	getValue(c: ContainerContract): T;

	asSingleton(): this;
}
