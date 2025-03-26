const http = require("http");
const https = require("https");

const PORT = 3000;
const API_URL = "https://dog.ceo/api/breeds/image/random";

function obtenerPerro(callback) {
  https.get(API_URL, (respuesta) => {
    let datos = "";

    respuesta.on("data", (chunk) => {
      datos += chunk;
    });

    respuesta.on("end", () => {
      try {
        const json = JSON.parse(datos);
        if (json.status === "success") {
          callback(null, { imagen: json.message });
        } else {
          callback(new Error("No se pudo obtener la imagen"), null);
        }
      } catch (error) {
        callback(error, null);
      }
    });

  }).on("error", (error) => {
    callback(error, null);
  });
}

const server = http.createServer((req, res) => {
  console.log("Petición recibida en:", req.url);

  if (req.url === "/perro") {
    obtenerPerro((error, perro) => {
      if (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ mensaje: "Error al obtener la imagen", error: error.message }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ mensaje: "Imagen de perro obtenida", perro }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Ruta no encontrada");
  }
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
