import {
    getUserDataForTest
} from '../persistence/mircro_persistence';


export const getUserData = async (username: any): Promise<any> => {
    const userData = await getUserDataForTest(username);
    return userData;
}