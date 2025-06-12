import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const ModalProductForm = ({ show, handleClose, initialData = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        price: initialData.price || "",
        description: initialData.description || "",
        image: null, 
      });
    } else {
      setFormData({
        name: "",
        price: "",
        description: "",
        image: null,
      });
    }
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.description || (!formData.image && !initialData?.id)) {
      alert("Semua field wajib diisi");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      let response;
      if (initialData && initialData.id) {
        // Edit (update)
        response = await axios.put(`http://localhost:5000/api/products/${initialData.id}`, data);
      } else {
        // Tambah (create)
        response = await axios.post("http://localhost:5000/api/products", data);
      }

      alert(response.data.message || "Berhasil!");
      handleClose();

      if (onSuccess) {
        onSuccess(); 
      }
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan produk");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Edit Produk" : "Tambah Produk"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nama Produk</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Harga</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Gambar</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            {initialData && initialData.image && !formData.image && (
              <img
                src={initialData.image}
                alt="Current"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Simpan
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalProductForm;
