export default async function ({ app, redirect, store }) {
    let authenticated = false;

    // First we will from the state if the user is authenticated
    let checkLoginFromStore = store.state.loginManagement.isLogin

    //If yes, then let the user proceed without any further checks.
    if (!checkLoginFromStore) {

        if (app.$cookies.get("isLogin") && !!app.$cookies.get("access_token")) {
            const auth = await store.dispatch(
                "loginManagement/updateLoginAndTokenFromLocalStorage"
            );
            authenticated = true;
        } else {

            await store.dispatch('loginManagement/generateGuestToken', {
                device_one_signal_id: new Date().getTime().toString(),
                device_os_type: "linux",
                device_id: new Date().getTime().toString()
            })

        }

    }
}