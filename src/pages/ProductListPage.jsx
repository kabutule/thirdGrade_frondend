import { useEffect, useState } from "react";
import axios from "axios";

function ProductListPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8090/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("상품 조회 실패", error);
            });
    }, []);

    return (
        <div>
            <header>
                <h1>🎮 중고 게임 장터</h1>
                <button>상품 등록</button>
            </header>

            <hr />

            <div>
                {products.length === 0 ? (
                    <p>등록된 상품이 없습니다.</p>
                ) : (
                    products.map((product) => (
                        <div
                            key={product.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "15px",
                                marginBottom: "10px",
                            }}
                        >
                            <h3>{product.title}</h3>
                            <p>{product.platform}</p>
                            <p>{product.price.toLocaleString()}원</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ProductListPage;