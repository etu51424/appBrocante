import {login} from "./login";
import {getArticlesByDealer} from "./CRUD/articles";


export const test = async () => {
    try {
        await login();
        return await getArticlesByDealer(1);
    } catch (error) {
        console.error(error);
    }
}
