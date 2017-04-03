import { HttpServes } from "./httpServes.js"

class App {
    constructor() {
        this.getUserFollowingUrl();
    };

    getUserFollowingUrl() {
        let httpServes = new HttpServes();
        let userName = prompt("Enter user name");
        let gitHubUserRequestString = "https://api.github.com/users/"+userName;

        httpServes.get(gitHubUserRequestString).then(
            (response) => {
                let gitHubUser = JSON.parse(response);
                alert(gitHubUser.following_url);
            });
    };
};

let app = new App();