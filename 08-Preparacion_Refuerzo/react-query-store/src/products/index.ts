export { ProductCard } from "./components/ProductCard";
export { ProductList } from "./components/ProductList";

export { StoreLayout } from "./layout/StoreLayout";

export { CompleteListPage } from "./pages/CompleteListPage";
export { MenPage } from "./pages/MenPage";
export { NewProductPage } from "./pages/NewProductPage";
export { WomenPage } from "./pages/WomenPage";

export type { Product } from './interfaces/product';

export { productsAPI } from './api/productsAPI';

export * as productsActions from './services/actions';

export { useProducts } from './hooks/useProducts';