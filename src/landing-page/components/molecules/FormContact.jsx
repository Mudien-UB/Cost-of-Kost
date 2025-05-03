import React, { useEffect, useState } from 'react';

export default function FormContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Tandai bahwa field ini sudah disentuh
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
    else if (formData.name.length < 3) newErrors.name = "Nama minimal 3 karakter";
    else if (formData.name.length > 50) newErrors.name = "Nama maksimal 50 karakter";

    if (!formData.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email tidak valid";

    if (!formData.message.trim()) newErrors.message = "Pesan wajib diisi";
    else if (formData.message.length < 10) newErrors.message = "Pesan minimal 10 karakter";
    else if (formData.message.length > 500) newErrors.message = "Pesan maksimal 500 karakter";
    else if (!/^[a-zA-Z0-9\s.,!?'"-]+$/.test(formData.message)) newErrors.message = "Pesan hanya boleh mengandung huruf, angka, dan karakter khusus seperti .,!?'-";
    else if (formData.message.includes("http://") || formData.message.includes("https://")) newErrors.message = "Pesan tidak boleh mengandung tautan";
    else if (formData.message.includes("www.")) newErrors.message = "Pesan tidak boleh mengandung tautan";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setIsSubmitted(true);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      setErrors(validate());
    }
  }, [formData]);

  return (
    <form onSubmit={handleSubmit} className="bg-white w-full md:w-1/2 mx-auto rounded-xl shadow-lg p-8 space-y-6 text-left">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {(touched.name || isSubmitted) && errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {(touched.email || isSubmitted) && errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {(touched.message || isSubmitted) && errors.message && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-semibold"
        >
          Kirim Pesan
        </button>
      </div>
    </form>
  );
}
