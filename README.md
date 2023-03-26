# Simple container app for node apps

The concept of the app is that it's a container in which services are registered (via a service provider). Once every service is registered, a service can be used by asking the app/container to provide an instance of that service, thus leaving the job of constructing the instance and managing its dependencies to the container.

### Example using the app in an Express app

```typescript
import App from './Foundation/App';
import Provider from './Foundation/Provider';
import express, { Express } from 'express';

class ExpressProvider extends Provider {
	async register() {
		this.app.register('express', app => express()).asSingleton();
	}

	async boot() {
		this.app.get<Express>('express').get('/', (req, res) => {
			res.send('Hey, it works!');
		});
	}

	async booted() {
		this.app.get<Express>('express').listen(3000, () => {
			console.log('listening on http://localhost:3000');
		});
	}
}

async function main() {
	const app = new App();

	await app.registerProviders([ExpressProvider]);

	await app.boot();
}

main();
```
