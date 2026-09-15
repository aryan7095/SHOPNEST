import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Admin-only page for creating a new product, including an image upload to Cloudinary
const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Text/number fields for the new product
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: ''
  });
  // Selected image file (sent as multipart/form-data)
  const [image, setImage] = useState(null);
  // Tracks in-flight submit request (disables button, shows upload progress text)
  const [loading, setLoading] = useState(false);

  // Route guard: redirect non-admins away from this page.
  // Note: this runs on every render (not inside useEffect), so navigate() is called
  // directly during render for unauthorized users, and the component renders nothing (null)
  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Require an image before allowing submission
    if (!image) return alert('Please select an image');
    
    setLoading(true);
    // Build multipart form data since an image file needs to be uploaded alongside text fields
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      // Direct fetch call (not using a shared axios instance like other pages);
      // manually attaches the admin's auth token
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: data
      });
      const responseData = await res.json();
      
      if (res.ok) {
        alert('Product created successfully with Cloudinary Image URL!');
        navigate('/shop');
      } else {
        alert(responseData.message || 'Error creating product');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Inline-styled dark card container (styles defined below via JS objects, not Tailwind/CSS classes)
    <div style={{ maxWidth: '600px', margin: '40px auto', background: '#18181b', padding: '40px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <h2 style={{ color: '#f97316', marginBottom: '20px' }}>Add New Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Each input updates the corresponding formData field via inline onChange handlers
            (uncontrolled in the sense that `value` isn't set, so these behave as uncontrolled inputs) */}
        <input 
          type="text" placeholder="Product Name" required 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          style={inputStyle} 
        />
        <textarea 
          placeholder="Description" required rows="4"
          onChange={(e) => setFormData({...formData, description: e.target.value})} 
          style={inputStyle} 
        />
        <input 
          type="number" placeholder="Price" required 
          onChange={(e) => setFormData({...formData, price: e.target.value})} 
          style={inputStyle} 
        />
        <input 
          type="text" placeholder="Category" required 
          onChange={(e) => setFormData({...formData, category: e.target.value})} 
          style={inputStyle} 
        />
        <input 
          type="number" placeholder="Stock Quantity" required 
          onChange={(e) => setFormData({...formData, stock: e.target.value})} 
          style={inputStyle} 
        />
        
        {/* File input for the product image, stored separately from formData since
            it needs to be appended to FormData as a file, not a plain string field */}
        <div style={{ padding: '15px', border: '1px dashed #f97316', borderRadius: '8px' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: '#a1a1aa' }}>Upload Product Image (Cloudinary)</label>
          <input 
            type="file" accept="image/*" required 
            onChange={(e) => setImage(e.target.files[0])} 
            style={{ color: '#fff' }}
          />
        </div>

        <button type="submit" disabled={loading} className="btn" style={{ marginTop: '10px' }}>
          {loading ? 'Uploading & Creating...' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
};

// Shared inline style object reused across all text/number/textarea inputs above
const inputStyle = {
  padding: '12px',
  background: '#09090b',
  border: '1px solid #27272a',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '15px',
  outline: 'none'
};

export default AddProduct;
