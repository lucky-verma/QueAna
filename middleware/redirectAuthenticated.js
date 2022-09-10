export default async function ({ app, redirect, store }) {
  let authenticated = false;

  // First we will from the state if the user is authenticated
  let checkLoginFromStore = store.state.authentication.isLogin;
  //If yes, then let the user proceed without any further checks.

  console.log("THis is LOGGED IN PLEASE ");
  if (!checkLoginFromStore) {
    if (app.$cookies.get("isLogin") && !!app.$cookies.get("access_token")) {
      await store.dispatch(
        "authentication/updateLoginAndTokenFromLocalStorage"
      );
      authenticated = true;
    }

    console.log(authenticated, "This is call");
    if (authenticated) {
      return redirect("/home");
    }
  }
}
