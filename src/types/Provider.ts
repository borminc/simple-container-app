export default interface ProviderContract {
	register(): Promise<void>;

	boot(): Promise<void>;

	booted(): Promise<void>;
}
