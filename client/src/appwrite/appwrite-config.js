import {Client, Account} from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66e82ab1001ab3ada32c');

const account = new Account(client)

export {account, client};
