import { useEffect, useState } from "react";
import axios from "axios";

import "./../styles/ProductListPage.css";

function ProductListPage() {

    const [products, setProducts] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [platform, setPlatform] = useState("");

    const loadProducts = () => {
    axios
        .get("http://localhost:8090/products")
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error) => {
            console.error("상품 조회 실패", error);
        });
};

const createProduct = async () => {
    try {
        await axios.post("http://localhost:8090/products", {
            title,
            description,
            price: Number(price),
            platform
        });

        alert("상품 등록 완료");

        setTitle("");
        setDescription("");
        setPrice("");
        setPlatform("");

        loadProducts();

    } catch (error) {
        console.error(error);
        alert("상품 등록 실패");
    }
};

const deleteProduct = async (id) => {

    const check = window.confirm("정말 삭제하시겠습니까?");

    if (!check) return;

    try {

        await axios.delete(
            `http://localhost:8090/products/${id}`
        );

        alert("삭제 완료");

        loadProducts();

    } catch (error) {

        console.error(error);

        alert("삭제 실패");
    }
};

    useEffect(() => {
    loadProducts();
}, []);

return (
    <div className="container">

        <header className="header">
            <h1>🎮 중고 게임 장터</h1>
            <p>원하는 게임을 사고 팔아보세요</p>
        </header>

        <div className="form-container">
            <h2>상품 등록</h2>

            <input
                placeholder="게임 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                placeholder="설명"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                type="number"
                placeholder="가격"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <input
                placeholder="플랫폼"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
            />

            <button
                className="register-btn"
                onClick={createProduct}
            >
                등록하기
            </button>
        </div>

        {products.length === 0 ? (
            <p>등록된 상품이 없습니다.</p>
        ) : (
            <div className="product-grid">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="product-card"
                    >
                        <h3>🎮 {product.title}</h3>

                        <p>
                            <strong>플랫폼:</strong> {product.platform}
                        </p>

                        <p>
                            <strong>가격:</strong>{" "}
                            {product.price.toLocaleString()}원
                        </p>

                        <button
                            className="delete-btn"
                            onClick={() => deleteProduct(product.id)}
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
);
}

export default ProductListPage;