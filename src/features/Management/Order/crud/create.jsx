import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./modal.css";

const CreateOrderModal = ({
  onClose,
  onCreate,
  loading,
  guestUsers,
  getCityById,
  getAllProductWarehouses,
}) => {
  const [formData, setFormData] = useState({
    customerId: "",
    status: "pending",
    deliveryAddress: "",
    creationDate: new Date().toISOString().slice(0, 10),
    estimatedDeliveryTime: "",
  });

  const [warehouseId, setWarehouseId] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productSelections, setProductSelections] = useState([
    { productId: "", quantity: 1 },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getAllProductWarehouses();
      setAllProducts(result.filter((item) => item.status === "activo"));
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (warehouseId) {
      const filtered = allProducts.filter((p) => p.warehouseId === warehouseId);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [warehouseId, allProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductChange = (index, field, value) => {
    const updatedSelections = [...productSelections];
    updatedSelections[index][field] = value;
    setProductSelections(updatedSelections);
  };

  const addProductRow = () => {
    setProductSelections([
      ...productSelections,
      { productId: "", quantity: 1 },
    ]);
  };

  const getUnitPrice = (productId) => {
    const product = filteredProducts.find((p) => p.product.id === productId);
    return product ? parseFloat(product.product.unitPrice) : 0;
  };

  const getStockQuantity = (productId) => {
    const product = filteredProducts.find((p) => p.product.id === productId);
    return product ? product.stockQuantity : 0;
  };

  const calculateTotal = () => {
    return productSelections.reduce((sum, sel) => {
      const unitPrice = getUnitPrice(sel.productId);
      return sum + unitPrice * parseInt(sel.quantity || 0);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.customerId ||
      !formData.deliveryAddress ||
      !formData.estimatedDeliveryTime
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (
      !warehouseId ||
      productSelections.some((sel) => !sel.productId || sel.quantity <= 0)
    ) {
      toast.error("Please complete the product selection with valid data.");
      return;
    }

    if (
      productSelections.some((sel) => {
        const stock = getStockQuantity(sel.productId);
        return sel.quantity > stock;
      })
    ) {
      toast.error("One or more selected products exceed the available stock.");
      return;
    }

    try {
      const selectedUser = guestUsers.find((u) => u.id === formData.customerId);
      const city = await getCityById(selectedUser.cityId);
      const extendedAddress = `${formData.deliveryAddress}, ${city.name} - ${city.state.name}`;

      const dataToSend = {
        customerId: formData.customerId,
        status: formData.status.toUpperCase(),
        deliveryAddress: extendedAddress,
        estimatedDeliveryTime: new Date(
          formData.estimatedDeliveryTime
        ).toISOString(),
        products: productSelections.map((p) => ({
          productId: p.productId,
          quantity: parseInt(p.quantity),
        })),
      };

      await onCreate(dataToSend);
    } catch (error) {
      toast.error("Failed to fetch city or send data.");
      console.error(error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Create New Order</h2>

        <label>
          Customer:
          <select
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">-- Select Customer --</option>
            {guestUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </label>

        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <label>
          Delivery Address:
          <input
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          Creation Date:
          <input
            name="creationDate"
            type="date"
            value={formData.creationDate}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label>
          Estimated Delivery Time:
          <input
            name="estimatedDeliveryTime"
            type="datetime-local"
            value={formData.estimatedDeliveryTime}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <hr />
        <h3>Product Selection</h3>

        <label>
          Warehouse:
          <select
            value={warehouseId}
            onChange={(e) => setWarehouseId(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">-- Select Warehouse --</option>
            {[
              ...new Map(
                allProducts.map((p) => [p.warehouseId, p.warehouse])
              ).values(),
            ].map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </label>

        <div className="product-selection-container">
          {productSelections.map((sel, idx) => {
            const unitPrice = getUnitPrice(sel.productId);
            const stockQuantity = getStockQuantity(sel.productId);
            const total = unitPrice * (sel.quantity || 0);

            return (
              <div key={idx} className="product-row">
                <select
                  value={sel.productId}
                  onChange={(e) =>
                    handleProductChange(idx, "productId", e.target.value)
                  }
                  disabled={loading}
                  required
                >
                  <option value="">-- Select Product --</option>
                  {filteredProducts
                    .filter((p) => {
                      const alreadySelected = productSelections.some(
                        (s, sIdx) =>
                          s.productId === p.product.id && sIdx !== idx
                      );
                      return !alreadySelected;
                    })
                    .map((p) => (
                      <option key={p.product.id} value={p.product.id}>
                        {p.product.name} (Stock: {p.stockQuantity})
                      </option>
                    ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={sel.quantity}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Permite campo vacío temporalmente
                    if (value === "") {
                      handleProductChange(idx, "quantity", "");
                      return;
                    }

                    // Solo permite números enteros positivos
                    const parsed = parseInt(value, 10);
                    if (!isNaN(parsed) && parsed > 0) {
                      const stockQuantity = getStockQuantity(sel.productId);
                      if (parsed <= stockQuantity) {
                        handleProductChange(idx, "quantity", parsed);
                      } else {
                        toast.warning(
                          `Stock limit for this product is ${stockQuantity}`
                        );
                        handleProductChange(idx, "quantity", stockQuantity);
                      }
                    }
                  }}
                  onBlur={() => {
                    const current = productSelections[idx].quantity;
                    if (!current || current < 1) {
                      handleProductChange(idx, "quantity", 1);
                    }
                  }}
                  disabled={loading}
                  required
                />
                <span>
                  ${unitPrice.toFixed(2)} x {sel.quantity} = ${total.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={addProductRow}
          className="add-product-btn"
          disabled={loading}
        >
          + Add Product
        </button>

        <h4 className="total-amount">Total: ${calculateTotal().toFixed(2)}</h4>

        <div className="modal-actions">
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="cancel-btn"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CreateOrderModal;
