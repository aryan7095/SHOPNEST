import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

// Admin page for editing an existing product, including optional image replacement
const EditProduct = () => {
  const { id } = useParams(); // product ID from the URL
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Form fields, pre-filled from the fetched product
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '', stock: '' });
  // Optional new image file (only sent if the admin chooses to replace the image)
  const [image, setImage] = useState(null);
  // Tracks in-flight submit request (disables button, shows "Updating...")
  const [loading, setLoading] = useState(false);

  // Fetch the existing product's data on mount and populate the form with it
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setFormData({ name: data.name, description: data.description, price: data.price, category: data.category, stock: data.stock });
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Build multipart form data since an image file may need to be uploaded alongside text fields
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    // Only include the image field if a new one was actually selected
    if (image) data.append('image', image);

    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${user.token}` },
      body: data
    });
    setLoading(false);
    if (res.ok) {
      alert('Product updated successfully!');
      navigate('/admin/products');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', background: '#18181b', padding: '40px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <h2 style={{ color: '#f97316', marginBottom: '20px' }}>Edit Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Controlled inputs, pre-filled with the fetched product's current values */}
        <input type="text" placeholder="Product Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={inputStyle} />
        <textarea placeholder="Description" required rows="4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={inputStyle} />
        <input type="number" placeholder="Price" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} style={inputStyle} />
        <input type="text" placeholder="Category" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={inputStyle} />
        <input type="number" placeholder="Stock" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} style={inputStyle} />
        {/* Image upload is optional here (unlike AddProduct), since an existing image is already set */}
        <div style={{ padding: '15px', border: '1px dashed #f97316', borderRadius: '8px' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: '#a1a1aa' }}>Replace Image (Optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={{ color: '#fff' }} />
        </div>
        <button type="submit" disabled={loading} className="btn" style={{ marginTop: '10px' }}>
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

// Shared inline style object reused across all text/number/textarea inputs above
const inputStyle = { padding: '12px', background: '#09090b', border: '1px solid #27272a', borderRadius: '6px', color: '#fff', fontSize: '15px', outline: 'none' };
export default EditProduct;
