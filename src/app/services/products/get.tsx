export default function getProducts() {
  const produtos = fetch("http://192.168.1.2:8080/produtos", {
    // const produtos = fetch("http://10.63.45.59:8080/produtos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "stNOJvYxgbX3bRg3CEGMTNiqnIO3TMMHPi8K3ehLzk3KqcN3tJbDnBdMwWvAj84r2fiKvaAxQC58i1BsR5iqjBzzscwMudNv8xL6",
    },
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => console.error(error));

  return produtos;
}
