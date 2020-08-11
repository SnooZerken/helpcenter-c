import http from "../http-commons";

class ParagraphDataService {

  getAll() {
    return http.get("/paragraphs");
  }

  get(id) {
    return http.get(`/paragraphs/${id}`);
  }

  create(data) {
    return http.post("/paragraphs", data);
  }

  update(id, data) {
    return http.put(`/paragraphs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/paragraphs/${id}`);
  }

/*   deleteAll() {
    return http.delete(`/sections`);
  }

  findByTitle(title) {
    return http.get(`/sections?title=${title}`);
  } */

}

export default new ParagraphDataService();