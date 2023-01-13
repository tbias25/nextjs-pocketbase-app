import PocketBase from 'pocketbase';

export interface IUser {
	id?: string;
	created?: string;
	upadted?: string;
	username?: string;
	email?: string;
	emailVisibility?: boolean;
	verified?: boolean;
}

export interface IDocument {
	id?: string;
	created?: string;
	upadted?: string;
	name?: string;
	file?: File;
	users?: IUser[],
	signature?: ISignature;
}

export interface ISignature {
	id?: string;
	created?: string;
	upadted?: string;
	user?: IUser;
	file?: File;
}

export const usePocketBase = () => {
    const client = new PocketBase('http://212.227.165.185:80');
	client.autoCancellation(false)

    function logIn(email: string, password: string) {
        client.collection("users").authWithPassword(email, password).then(() => {
            console.log("logged in")
        }).catch((e) => {
            console.log("loggin failed" + e)
        })
    }

    function logOut() {
        client.authStore.clear();
    }

    const getUserById = (id: string): Promise<IUser> => {
        return client.collection("users").getOne(id);
    }


	const getDocuments = (): Promise<IDocument[]> => {
		return client.collection('documents').getFullList(200, {
			sort: '-created',
		});
	};

	const getDocumentsByUserId = (id: string): Promise<IDocument[]> => {
		return client.collection('documents').getFullList(200, {
			filter: `users ~ '${client.authStore.model?.id}'`,
			sort: '-created',
		});
	};

    return {
        client,
        logIn,
        logOut,
        getDocuments,
        getUserById,
		getDocumentsByUserId,
    }
}