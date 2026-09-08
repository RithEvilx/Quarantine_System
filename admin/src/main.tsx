import { StrictMode, useEffect, useState, type FormEvent } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axiosInstance from "./common/axiosInstance";
import {
  useCreateCategory,
  useDeleteCategory,
  useListCategories,
} from "./features/hooks/category";
import {
  useCreateProduct,
  useDeleteProduct,
  useListProducts,
  useUpdateProduct,
} from "./features/hooks/product";
import { useListOrders, useUpdateOrderStatus } from "./features/hooks/order";
import {
  useExchangeRate,
  useUpdateExchangeRate,
} from "./features/hooks/settings";
import type { Product } from "./features/apis/product";
import "./styles.css";

const queryClient = new QueryClient();
type Section = "products" | "categories" | "orders";
type ProductForm = {
  name: string;
  priceUsd: string;
  priceKhr: string;
  stock: string;
  categoryId: string;
  image: string;
};

const emptyProduct: ProductForm = {
  name: "",
  priceUsd: "",
  priceKhr: "",
  stock: "",
  categoryId: "",
  image: "",
};

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("1");
  const [loginError, setLoginError] = useState("");
  const [section, setSection] = useState<Section>("products");
  const [searchText, setSearchText] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<ProductForm>(emptyProduct);
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");

  const productQuery = useListProducts(
    { page: 1, rowsPerPage: 50, orderBy: "id DESC", searchText },
    authenticated,
  );
  const categoryQuery = useListCategories(authenticated);
  const orderQuery = useListOrders(authenticated);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();
  const updateOrderStatus = useUpdateOrderStatus();
  const exchangeRateQuery = useExchangeRate(authenticated);
  const updateExchangeRate = useUpdateExchangeRate();
  const [exchangeRateInput, setExchangeRateInput] = useState("4100");
  const currentRate = exchangeRateQuery.data?.usdToKhr ?? 4100;

  useEffect(() => {
    setExchangeRateInput(String(currentRate));
  }, [currentRate]);

  useEffect(() => {
    let mounted = true;
    axiosInstance
      .post("/auth/refresh-token")
      .then(() => {
        if (mounted) setAuthenticated(true);
      })
      .catch(() => {
        if (mounted) setAuthenticated(false);
      })
      .finally(() => {
        if (mounted) setAuthLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");
    try {
      await axiosInstance.post("/auth/login", { username, password });
      setAuthenticated(true);
    } catch {
      setLoginError("Login failed. Check the server credentials.");
    }
  };

  const saveProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const priceUsd = Number(
      (Number(productForm.priceKhr) / currentRate).toFixed(2),
    );
    const payload = {
      name: productForm.name,
      slug: productForm.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      price: priceUsd,
      priceUsd,
      priceKhr: Number(productForm.priceKhr),
      stock: Number(productForm.stock),
      categoryId: productForm.categoryId
        ? Number(productForm.categoryId)
        : undefined,
      image: productForm.image || null,
      isActive: editingProduct?.isActive ?? true,
    };
    const done = () => {
      setProductForm(emptyProduct);
      setEditingProduct(null);
      setMessage(editingProduct ? "Product updated." : "Product created.");
    };
    if (editingProduct)
      updateProduct.mutate(
        { ...editingProduct, ...payload },
        { onSuccess: done },
      );
    else createProduct.mutate(payload, { onSuccess: done });
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      priceUsd: String(product.priceUsd ?? product.price),
      priceKhr: String(product.priceKhr ?? ""),
      stock: String(product.stock),
      categoryId: product.categoryId ? String(product.categoryId) : "",
      image: product.image || "",
    });
  };
  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    setAuthenticated(false);
  };

  if (authLoading)
    return (
      <main>
        <p className="muted">Checking session...</p>
      </main>
    );
  if (!authenticated)
    return (
      <main>
        <header>
          <p className="eyebrow">QUARANTINE SYSTEM</p>
          <h1>Admin login</h1>
          <p className="muted">
            Sign in to manage products, categories, and orders.
          </p>
        </header>
        <form className="login" onSubmit={login}>
          <label>
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {loginError && <p className="error">{loginError}</p>}
          <button type="submit">Sign in</button>
        </form>
      </main>
    );

  const products = productQuery.data?.body ?? [];
  const categories = categoryQuery.data ?? [];
  const orders = orderQuery.data ?? [];

  return (
    <main>
      <header className="topbar">
        <div>
          <p className="eyebrow">QUARANTINE SYSTEM</p>
          <h1>Admin workspace</h1>
          <p className="muted">Product inventory and order operations.</p>
        </div>
        <button className="secondary" onClick={logout}>
          Sign out
        </button>
      </header>
      <nav className="tabs">
        <button
          className={section === "products" ? "active" : ""}
          onClick={() => setSection("products")}
        >
          Products
        </button>
        <button
          className={section === "categories" ? "active" : ""}
          onClick={() => setSection("categories")}
        >
          Categories
        </button>
        <button
          className={section === "orders" ? "active" : ""}
          onClick={() => setSection("orders")}
        >
          Orders
        </button>
      </nav>
      {message && <p className="notice">{message}</p>}
      {section === "products" && (
        <section>
          <div className="rate-panel">
            <strong>Exchange rate</strong>
            <span>1 USD = {currentRate.toLocaleString()} KHR</span>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                updateExchangeRate.mutate(Number(exchangeRateInput), {
                  onSuccess: () => setMessage("Exchange rate updated."),
                });
              }}
            >
              <input
                type="number"
                min="1"
                step="1"
                value={exchangeRateInput}
                onChange={(event) => setExchangeRateInput(event.target.value)}
              />
              <button type="submit">Save rate</button>
            </form>
          </div>
          <div className="section-heading">
            <h2>Products</h2>
            <span>{products.length} loaded</span>
          </div>
          <form className="editor" onSubmit={saveProduct}>
            <input
              required
              placeholder="Product name"
              value={productForm.name}
              onChange={(event) =>
                setProductForm({ ...productForm, name: event.target.value })
              }
            />
            <select
              required
              value={productForm.categoryId}
              onChange={(event) =>
                setProductForm({ ...productForm, categoryId: event.target.value })
              }
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              required
              type="number"
              min="0"
              step="1"
              placeholder="KHR price (primary)"
              value={productForm.priceKhr}
              onChange={(event) =>
                setProductForm({ ...productForm, priceKhr: event.target.value })
              }
            />
            <input
              type="text"
              readOnly
              placeholder="USD converted"
              value={
                productForm.priceKhr
                  ? `$${(Number(productForm.priceKhr) / currentRate).toFixed(2)}`
                  : ""
              }
            />
            <input
              required
              type="number"
              min="0"
              placeholder="Stock"
              value={productForm.stock}
              onChange={(event) =>
                setProductForm({ ...productForm, stock: event.target.value })
              }
            />
            <label className="file-field">
              Product image
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () =>
                    setProductForm({
                      ...productForm,
                      image: String(reader.result),
                    });
                  reader.readAsDataURL(file);
                }}
              />
            </label>
            {productForm.image && (
              <img
                className="image-preview"
                src={productForm.image}
                alt="Product preview"
              />
            )}
            <button type="submit">
              {editingProduct ? "Save changes" : "Add product"}
            </button>
            {editingProduct && (
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm(emptyProduct);
                }}
              >
                Cancel
              </button>
            )}
          </form>
          <input
            className="search"
            placeholder="Search products"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <div className="table">
            {products.length ? (
              products.map((product) => (
                <div className="row" key={product.id}>
                  {product.image ? (
                    <img className="table-image" src={product.image} alt="" />
                  ) : (
                    <span className="table-image empty-image">No image</span>
                  )}
                  <strong>{product.name}</strong>
                  <span>
                    ${Number(product.priceUsd ?? product.price).toFixed(2)}
                  </span>
                  <span>៛{Number(product.priceKhr ?? 0).toLocaleString()}</span>
                  <span>{product.stock} in stock</span>
                  <span className="row-actions">
                    <button onClick={() => editProduct(product)}>Edit</button>
                    <button
                      className="danger"
                      onClick={() => deleteProduct.mutate(product.id)}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              ))
            ) : (
              <div className="empty">No products returned yet.</div>
            )}
          </div>
        </section>
      )}
      {section === "categories" && (
        <section>
          <div className="section-heading">
            <h2>Categories</h2>
            <span>{categories.length} loaded</span>
          </div>
          <form
            className="editor"
            onSubmit={(event) => {
              event.preventDefault();
              createCategory.mutate(
                { name: categoryName },
                {
                  onSuccess: () => {
                    setCategoryName("");
                    setMessage("Category created.");
                  },
                },
              );
            }}
          >
            <input
              required
              placeholder="Category name"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
            />
            <button type="submit">Add category</button>
          </form>
          <div className="table">
            {categories.map((category) => (
              <div className="row" key={category.id}>
                <strong>{category.name}</strong>
                <span>{category.isActive ? "Active" : "Inactive"}</span>
                <button
                  className="danger"
                  onClick={() => deleteCategory.mutate(category.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
      {section === "orders" && (
        <section>
          <div className="section-heading">
            <h2>Orders</h2>
            <span>{orders.length} loaded</span>
          </div>
          <div className="table">
            {orders.length ? (
              orders.map((order) => (
                <div className="row" key={order.id}>
                  <strong>{order.orderNumber}</strong>
                  <span>{order.customerName}</span>
                  <span>${order.grandTotal.toFixed(2)}</span>
                  <select
                    value={order.status}
                    onChange={(event) =>
                      updateOrderStatus.mutate({
                        id: order.id,
                        status: event.target.value,
                      })
                    }
                  >
                    <option>NEW</option>
                    <option>CONFIRMED</option>
                    <option>PROCESSING</option>
                    <option>COMPLETED</option>
                    <option>CANCELLED</option>
                  </select>
                </div>
              ))
            ) : (
              <div className="empty">No orders returned yet.</div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
