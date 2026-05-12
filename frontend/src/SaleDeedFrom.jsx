// import React from 'react'

// const SaleDeedFrom = () => {
//   return (
//     <div>SaleDeedFrom</div>
//   )
// }

// export default SaleDeedFrom


















































import React, { useState } from 'react';
import axios from 'axios';

const SaleDeedForm = () => {
  const [formData, setFormData] = useState({
    // Property details
    villageName: '',
    patwarHalka: '',
    Tehsil: '',
    dic: '',
    khataSankhiya: '',
    khasraSankhiya: '',
    population: '',
    shares: '',
    area: '',
    amount: '',
    amountInWords: '',
    GivenAmount: '',
    GivenAmountInWords: '',

    // Sellers array
    seller: [
      {
        sellerName: '',
        sellerFather: '',
        sellerAge: '',
        cast: '',
        village: '',
        tehsil: '',
        district: '',
        sellerAadhar: ''
      }
    ],

    // Buyers array
    buyer: [
      {
        buyerName: '',
        buyerHusband: '',
        buyerAge: '',
        village: '',
        tehsil: '',
        district: '',
        buyerAadhar: ''
      }
    ],

    // Witnesses
    witnesses: [
      {
        name: '',
        fatherName: '',
        age: '',
        dob: '',
        caste: '',
        address: '',
        aadhar: ''
      },
      {
        name: '',
        fatherName: '',
        age: '',
        dob: '',
        caste: '',
        address: '',
        aadhar: ''
      }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Add seller
  const addSeller = () => {
    setFormData(prev => ({
      ...prev,
      seller: [...prev.seller, {
        sellerName: '',
        sellerFather: '',
        sellerAge: '',
        cast: '',
        village: '',
        tehsil: '',
        district: '',
        sellerAadhar: ''
      }]
    }));
  };

  // Remove seller
  const removeSeller = (index) => {
    if (formData.seller.length > 1) {
      setFormData(prev => ({
        ...prev,
        seller: prev.seller.filter((_, i) => i !== index)
      }));
    }
  };

  // Add buyer
  const addBuyer = () => {
    setFormData(prev => ({
      ...prev,
      buyer: [...prev.buyer, {
        buyerName: '',
        buyerHusband: '',
        buyerAge: '',
        village: '',
        tehsil: '',
        district: '',
        buyerAadhar: ''
      }]
    }));
  };

  // Remove buyer
  const removeBuyer = (index) => {
    if (formData.buyer.length > 1) {
      setFormData(prev => ({
        ...prev,
        buyer: prev.buyer.filter((_, i) => i !== index)
      }));
    }
  };

  // Handle input change
  const handleInputChange = (e, section = null, index = null) => {
    const { name, value } = e.target;

    if (section === 'seller' && index !== null) {
      const newSellers = [...formData.seller];
      newSellers[index][name] = value;
      setFormData(prev => ({ ...prev, seller: newSellers }));
    } else if (section === 'buyer' && index !== null) {
      const newBuyers = [...formData.buyer];
      newBuyers[index][name] = value;
      setFormData(prev => ({ ...prev, buyer: newBuyers }));
    } else if (section === 'witnesses' && index !== null) {
      const newWitnesses = [...formData.witnesses];
      newWitnesses[index][name] = value;
      setFormData(prev => ({ ...prev, witnesses: newWitnesses }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Generate PDF
  const generatePDF = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3000/api/saledeed/create', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `sale-deed-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setSuccess('Sale Deed PDF generated successfully!');
    } catch (err) {
      console.error('PDF Generation Error:', err);
      setError(err.response?.data?.error || 'Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  // Preview party counts
  const getPartyCountInfo = () => {
    const sellerCount = formData.seller.length;
    const buyerCount = formData.buyer.length;
    return `Sellers: ${sellerCount}, Buyers: ${buyerCount}`;
  };

  return (
    <div className="sale-deed-container">
      <div className="form-header">
        <h1>🏛️ Sale Deed Generator</h1>
        <div className="party-count">{getPartyCountInfo()}</div>
      </div>

      <form onSubmit={generatePDF} className="sale-deed-form">
        {/* Property Details */}
        <section className="form-section">
          <h2>📍 Property Details</h2>
          <div className="grid-2">
            <div className="form-group">
              <label>Village Name *</label>
              <input
                type="text"
                name="villageName"
                value={formData.villageName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Patwar Halka</label>
              <input
                type="text"
                name="patwarHalka"
                value={formData.patwarHalka}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Tehsil *</label>
              <input
                type="text"
                name="Tehsil"
                value={formData.Tehsil}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>District *</label>
              <input
                type="text"
                name="dic"
                value={formData.dic}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Khata Sankhiya *</label>
              <input
                type="text"
                name="khataSankhiya"
                value={formData.khataSankhiya}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Khasra Sankhiya *</label>
              <input
                type="text"
                name="khasraSankhiya"
                value={formData.khasraSankhiya}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Population (Runkh)</label>
              <input
                type="text"
                name="population"
                value={formData.population}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Shares</label>
              <input
                type="text"
                name="shares"
                value={formData.shares}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Area (gSDVs;j) *</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </section>

        {/* Sellers */}
        <section className="form-section">
          <div className="section-header">
            <h2>👨‍💼 Sellers</h2>
            <button type="button" onClick={addSeller} className="add-btn">
              ➕ Add Seller
            </button>
          </div>
          {formData.seller.map((seller, index) => (
            <div key={index} className="party-card">
              <div className="card-header">
                <h3>Seller #{index + 1}</h3>
                {formData.seller.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSeller(index)}
                    className="remove-btn"
                  >
                    ❌
                  </button>
                )}
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="sellerName"
                    value={seller.sellerName}
                    onChange={(e) => handleInputChange(e, 'seller', index)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Father's Name *</label>
                  <input
                    type="text"
                    name="sellerFather"
                    value={seller.sellerFather}
                    onChange={(e) => handleInputChange(e, 'seller', index)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age *</label>
                  <input
                    type="number"
                    name="sellerAge"
                    value={seller.sellerAge}
                    onChange={(e) => handleInputChange(e, 'seller', index)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Caste *</label>
                  <input
                    type="text"
                    name="cast"
                    value={seller.cast}
                    onChange={(e) => handleInputChange(e, 'seller', index)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Village *</label>
                  <input
                    type="text"
                    name="village"
                    value={seller.village}
                    onChange={(e) => handleInputChange(e, 'seller', index)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tehsil *</label>
                  <input
                    type="text"
                    name="tehsil"
                    value={seller.tehsil}
                    onChange={(e) => handleInputChange(e, 'seller', index)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>District *</label>
                  <input
                    type="text"
                    name="district"
                    value={seller.district}
                    onChange={(e) => handleInputChange(e, 'seller', index)}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Aadhar Number *</label>
                  <input
                    type="text"
                    name="sellerAadhar"
                    value={seller.sellerAadhar}
                    onChange={(e) => handleInputChange(e, 'seller', index)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Buyers */}
        <section className="form-section">
          <div className="section-header">
            <h2>👨‍💼 Buyers</h2>
            <button type="button" onClick={addBuyer} className="add-btn">
              ➕ Add Buyer
            </button>
          </div>
          {formData.buyer.map((buyer, index) => (
            <div key={index} className="party-card">
              <div className="card-header">
                <h3>Buyer #{index + 1}</h3>
                {formData.buyer.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBuyer(index)}
                    className="remove-btn"
                  >
                    ❌
                  </button>
                )}
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="buyerName"
                    value={buyer.buyerName}
                    onChange={(e) => handleInputChange(e, 'buyer', index)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Husband's Name *</label>
                  <input
                    type="text"
                    name="buyerHusband"
                    value={buyer.buyerHusband}
                    onChange={(e) => handleInputChange(e, 'buyer', index)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age *</label>
                  <input
                    type="number"
                    name="buyerAge"
                    value={buyer.buyerAge}
                    onChange={(e) => handleInputChange(e, 'buyer', index)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Village *</label>
                  <input
                    type="text"
                    name="village"
                    value={buyer.village}
                    onChange={(e) => handleInputChange(e, 'buyer', index)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tehsil *</label>
                  <input
                    type="text"
                    name="tehsil"
                    value={buyer.tehsil}
                    onChange={(e) => handleInputChange(e, 'buyer', index)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>District *</label>
                  <input
                    type="text"
                    name="district"
                    value={buyer.district}
                    onChange={(e) => handleInputChange(e, 'buyer', index)}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Aadhar Number *</label>
                  <input
                    type="text"
                    name="buyerAadhar"
                    value={buyer.buyerAadhar}
                    onChange={(e) => handleInputChange(e, 'buyer', index)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Financial Details */}
        <section className="form-section">
          <h2>💰 Financial Details</h2>
          <div className="grid-2">
            <div className="form-group">
              <label>Amount (₹) *</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Amount in Words *</label>
              <input
                type="text"
                name="amountInWords"
                value={formData.amountInWords}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Given Amount (₹)</label>
              <input
                type="text"
                name="GivenAmount"
                value={formData.GivenAmount}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Given Amount in Words</label>
              <input
                type="text"
                name="GivenAmountInWords"
                value={formData.GivenAmountInWords}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="submit" disabled={loading} className="generate-btn">
            {loading ? '⏳ Generating PDF...' : '📄 Generate Sale Deed PDF'}
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="alert alert-error">
            ❌ {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            ✅ {success}
          </div>
        )}
      </form>
    </div>
  );
};

export default SaleDeedForm;