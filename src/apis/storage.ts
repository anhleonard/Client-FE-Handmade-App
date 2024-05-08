import useStorage, { StorageType } from "@/hooks/use-storage";

class Storage {
  private localStorage = useStorage(StorageType.LOCAL);

  getLocalAccessToken() {
    return this.localStorage.getItem("accessToken");
  }

  updateLocalAccessToken(accessToken: string) {
    this.localStorage.setItem("accessToken", accessToken);
  }

  updateLocalUser(user: string) {
    this.localStorage.setItem("user", user);
  }

  getLocalUser() {
    return this.localStorage.getItem("user");
  }

  getLocalUserId() {
    return this.localStorage.getItem("userId");
  }

  updateLocalUserId(userId: string) {
    this.localStorage.setItem("userId", userId);
  }

  removeAccessToken() {
    this.localStorage.removeItem("accessToken");
  }
}

export default new Storage();
