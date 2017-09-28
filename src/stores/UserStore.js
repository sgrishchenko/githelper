import axios from 'axios'
import {observable, computed, autorun} from 'mobx'

const gitHubUrl = 'https://api.github.com/users';
const pageSize = 4;

export class UserStore {
    @observable users = [];
    prevActual = [];

    constructor() {
        this.update();
    }

    update() {
        const offset = Math.floor(Math.random() * 500);
        axios.get(gitHubUrl, {params: {since: offset}})
            .then(response => {
                this.users.push(...response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    refresh() {
        this.users.splice(0, pageSize);
        if (this.users.length < pageSize) this.update();
    }

    remove(user) {
        this.users.remove(user);
        if (this.users.length < pageSize) this.update();
    }

    @computed get actual() {
        let actual = this.users.slice(0, pageSize);
        const newUsers = actual.filter((user) => !this.prevActual.includes(user));

        if (this.prevActual.length) {
            actual = this.prevActual.map((user) => actual.includes(user) ? user : newUsers.shift());
        }

        this.prevActual = actual;
        return actual.filter((user) => user);
    }
}

export default new UserStore()