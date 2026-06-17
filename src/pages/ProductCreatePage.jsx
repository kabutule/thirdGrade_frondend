import { useState } from "react";
import axios from "axios";

function ProductCreatePage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [platform, setPlatform] = useState("");

    const submit = async () => {
        await axios.post("http://localhost:8090/products", {
            title,
            description,
            price,
            platform
        });

        alert("등록 완료");
    };

    return (
        <div>
            <h1>상품 등록</h1>

            <input
                placeholder="제목"
                onChange={(e) => setTitle(e.target.value)}
            />

            <br />

            <input
                placeholder="설명"
                onChange={(e) => setDescription(e.target.value)}
            />

            <br />

            <input
                placeholder="가격"
                onChange={(e) => setPrice(e.target.value)}
            />

            <br />

            <input
                placeholder="플랫폼"
                onChange={(e) => setPlatform(e.target.value)}
            />

            <br />

            <button onClick={submit}>
                등록
            </button>
        </div>
    );
}

export default ProductCreatePage;