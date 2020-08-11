import http from "../http-commons";

class SectionDataService {

  getAll() {
    return http.get("/sections");
  }

  findByTitle(title) {
    return http.get(`/sections?title=${title}`);
  }  

  get(id) {
    return http.get(`/sections/${id}`);
  }

  create(data) {
    return http.post("/sections", data);
  }

  update(id, data) {
    return http.put(`/sections/${id}`, data);
  }

  delete(id) {
    return http.delete(`/sections/${id}`);
  }

/*   deleteAll() {
    return http.delete(`/sections`);
  }

  findByTitle(title) {
    return http.get(`/sections?title=${title}`);
  } */

}

export default new SectionDataService();