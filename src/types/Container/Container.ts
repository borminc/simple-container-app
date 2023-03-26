import { BindingContract, BindingKey, BindingResolver } from './Binding';

export interface ContainerContract {
	register<T>(
		key: BindingKey,
		resolver: BindingResolver<T>
	): BindingContract<T>;

	get<T>(key: BindingKey): T;
}
