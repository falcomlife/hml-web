import axios from '@/request/http.js'; // 导入http中创建的axios实例

const order = {
  getList(params) {
    return axios.get(`/outStorage`, {
      params: params
    })
  },
  getByCode(params) {
    return axios.get(`/outStorage/code`, {
      params: params
    })
  },
  getListByIds(body) {
    return axios.post(`/outStorage/ids`, body)
  },
  save(body) {
    return axios.post(`/outStorage`, body)
  },
  update(body) {
    return axios.put(`/outStorage`, body)
  },
  delete(body) {
    return axios.delete(`/outStorage`, body)
  },
  exportExcel (params) {
    return axios.post(`/outStorage/excel`,params,{
      responseType: 'blob'
    });
  },
}

export default order;
