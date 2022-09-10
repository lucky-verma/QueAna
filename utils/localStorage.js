export function clearLoginDetailsFromLocalStorage() {}

export function isLoginAndHasToken() {
  return (
    this.$cookies.get("isLogin") == "true" &&
    !!this.$cookies.get("access_token")
  );
}
