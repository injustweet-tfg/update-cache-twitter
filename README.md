# ⚖️ update-cache-twitter (from Injustweet)

Este repositorio está dedicado al proceso encargado de mantener actualizada la caché que utiliza el frontend de la aplicación, recogiendo la información almacenada en IPFS  (1 vez cada 2 días). 

Está constituido por un script _index.js_ que, de forma automática, accede cada dos días a los datos almacenados en IPFS. Para ello, utiliza el método _get_ proporcionado por la [API](https://github.com/injustweet-tfg/API). Posteriormente, elimina el contenido de la BBDD y vuelca los nuevos datos actualizados sobre ella, utilizando las funciones _delete_ y _add_ de [cache-twitter](https://github.com/injustweet-tfg/cache-twitter).

## License

Distributed under the GPL-3.0 License. See [LICENSE](https://github.com/jjavimu/dashboard-twitter/blob/main/LICENSE) for more information.

