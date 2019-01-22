import { AuthService } from 'aurelia-authentication';
import { inject, computedFrom } from 'aurelia-framework';

@inject(AuthService)
export class Login {
	username;
	password;
	isRemembered;

	constructor(authService) {
		debugger;
		this.authService = authService;
		this.providers = [];
	};

	attached() {
		$('input').iCheck({
			checkboxClass: 'icheckbox_square-blue',
			radioClass: 'iradio_square-blue',
			increaseArea: '20%' /* optional */
		});
	}

	// make a getter to get the authentication status.
	// use computedFrom to avoid dirty checking
	@computedFrom('authService.authenticated')
	get authenticated() {
		return this.authService.authenticated;
	}

	// use authService.login(credentialsObject) to login to your auth server
	submit() {
		alert('Submitted');

		this.authService.login({
			username: this.username,
			password: this.password,
			grant_type: "password"
		}, { mode: 'cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
			.then(response => {
				debugger;
				alert('Login successful');
			})
			.catch(err => {
				debugger;
				alert("Invalid email or password.");
			});
	};

	// use authService.logout to delete stored tokens
	// if you are using JWTs, authService.logout() will be called automatically,
	// when the token expires. The expiredRedirect setting in your authConfig
	// will determine the redirection option
	logout() {
		return this.authService.logout();
	}

	// use authenticate(providerName) to get third-party authentication
	authenticate(name) {
		return this.authService.authenticate(name)
			.then(response => {
				this.provider[name] = true;
			});
	}

	setRemember() {
		if (this.isRemembered)
			localStorage.setItem("aurelia-remember", true);
		else
			localStorage.removeItem("aurelia-remember");
	}
}