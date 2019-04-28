import {Interface as UserContextInterface} from '../contexts/User';

export function Login(context:UserContextInterface, username: string, password:string) : void {
    console.log("Login with: " + username + " " + password);
    setTimeout(() => {
        console.log("context updated");
        context.auth = true;
    }, 1000)
}

export function Logout(): void {

}