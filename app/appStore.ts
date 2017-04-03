import {AppState, RootService} from "./services/root.service";
import {ProductService} from "./services/product.service";
import {AppStore} from "t-rex";

export function initAppStore(rootService: RootService, productService: ProductService) {
    const appStore = new AppStore<AppState>();

    appStore.init([
        rootService,
        productService
    ]);
}
