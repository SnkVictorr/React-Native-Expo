export const getClienteId = async (): Promise<number | null> => {
  try {
    const res = await fetch("http://localhost:8080/login/session.php", {
      method: "GET",
      credentials: "include", // necessário para enviar cookies da sessão
    });

    const data = await res.json();
    if (data.status === "success") {
      return data.cliente_id;
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar cliente_id:", error);
    return null;
  }
};
