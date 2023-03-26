import { ContainerContract } from './Container/Container';
import ProviderContract from './Provider';

export default interface AppContract extends ContainerContract {
	providers: ProviderContract[];
}
