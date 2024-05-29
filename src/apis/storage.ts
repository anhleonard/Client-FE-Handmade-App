import useStorage, { StorageType } from "@/hooks/use-storage";

class Storage {
  private localStorage = useStorage(StorageType.LOCAL);

  getLocalAccessToken() {
    return this.localStorage.getItem("accessToken");
  }

  updateLocalAccessToken(accessToken: string) {
    this.localStorage.setItem("accessToken", accessToken);
  }

  updateLocalOrder(order: string) {
    this.localStorage.setItem("order", order);
  }

  getLocalOrder() {
    return this.localStorage.getItem("order");
  }

  updateLocalAppTransId(id: string) {
    this.localStorage.setItem("apptransid", id);
  }

  getLocalAppTransId() {
    return this.localStorage.getItem("apptransid");
  }

  updateLocalUser(user: string) {
    this.localStorage.setItem("user", user);
  }

  getLocalUser() {
    return this.localStorage.getItem("user");
  }

  updateLocalUserId(userId: string) {
    this.localStorage.setItem("userId", userId);
  }

  getLocalUserId() {
    return this.localStorage.getItem("userId");
  }

  removeAccessToken() {
    this.localStorage.removeItem("accessToken");
  }

  //auction tab id
  updateAuctionTab(value: string) {
    this.localStorage.setItem("auctionTabId", value);
  }

  getAuctionTab() {
    return this.localStorage.getItem("auctionTabId");
  }

  //order tab id
  updateOrderTab(value: string) {
    this.localStorage.setItem("orderTabId", value);
  }

  getOrderTab() {
    return this.localStorage.getItem("orderTabId");
  }

  //store tab id
  updateStoreTab(value: string) {
    this.localStorage.setItem("storeTabId", value);
  }

  getStoreTab() {
    return this.localStorage.getItem("storeTabId");
  }

  //vertical collect tab id
  updateCollectionTab(value: string) {
    this.localStorage.setItem("collectTabId", value);
  }

  getCollectionTab() {
    return this.localStorage.getItem("collectTabId");
  }
}

export default new Storage();
