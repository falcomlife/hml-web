import axios from '@/request/http.js'; // 导入http中创建的axios实例

const order = {
    loadParts (params) {
        return axios.get(`/order/parts`,{
            params: params
        });
    },
    getList (params) {
        return axios.get(`/order`,{
          params: params
        });
    },
    exportExcel (params) {
        return axios.post(`/order/excel`,params,{          
          responseType: 'blob'
        });
    },
    getByCode (params) {
        return axios.get(`/order/code`,{
          params: params
        });
    },
    getInStorageListByOrder(params){
      return axios.get(`/inStorage/order`,{
        params: params
      });
    },
    getOutStorageListByInStorage(params){
      return axios.get(`/outStorage/list`,{
        params: params
      });
    },
    getOutStorageByInStorage(params){
      return axios.get(`/outStorage/one`,{
        params: params
      });
    },
    getById (params) {
        return axios.get(`/order/id`,{
          params: params
        });
    },
    save (body) {
        return axios.post(`/order`, body)
    },
    update (body) {
        return axios.put(`/order`, body)
    },
    delete(body){
      return axios.delete(`/order`, body)
    }
}

export default order;
