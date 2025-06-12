import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import ModalProductForm from "../components/ModalProductForm";
import axios from "axios";
import { Card } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";


const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductId, setShowProductId] = useState(null);


  const modalProduct = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/products/${id}`);
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
        getProducts();
      }
    });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSuccess = () => {
    setShowModal(false);
    getProducts();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const productDetail = filteredProducts.find((product) => product.id === showProductId);

 const handleShow = (product) => {
  setShowProductId(product.id); 
};

const handleBack = () => {
  setShowProductId(null); 
};

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1>Manage Your Products</h1>
        <Button onClick={modalProduct} text="+ Add Product" />
      </div>
      <hr />
      <div>
        <h4>Search Product</h4>
        <input className="form-control" type="text" placeholder="Search Product" value={searchTerm} onChange={handleSearch} />
      </div>
      {showProductId ? (
        <div className=" my-3">
         <Button onClick={handleBack} text="← Back to Products" />
          <Card className="shadow mt-3" style={{ maxWidth: "500px", margin: "0 auto" }}>
            <Card.Img
              variant="top"
              src={productDetail.image}
              alt={productDetail.name}
              style={{ height: "300px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{productDetail.name}</Card.Title>
              <Card.Text>
                <b>Price:</b> Rp {productDetail.price}
                <br />
                {productDetail.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ) :(
        <div className="d-flex flex-wrap gap-3 mt-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} style={{ width: "18rem" }} className="shadow">
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.name}
              style={{ height: "180px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                <b>Price:</b> Rp {product.price} <br />
                {product.description}
              </Card.Text>
              <div className="d-flex justify-content-around mt-3">
                <FaEye
                  title="Show"
                  style={{ cursor: "pointer", color: "#3498db" }}
                  onClick={() => handleShow(product)}
                />
                <FaEdit
                  title="Edit"
                  style={{ cursor: "pointer", color: "green" }}
                  onClick={() => handleEdit(product)}
                />
                <FaTrash
                  title="Delete"
                  style={{ cursor: "pointer", color: "#e74c3c" }}
                  onClick={() => handleDelete(product.id)}
                />
              </div>
            </Card.Body>
          </Card>
          ))}
        </div>
      )}
      <ModalProductForm 
      show={showModal} 
      handleClose={handleCloseModal} 
      initialData={selectedProduct}
      onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Products;
