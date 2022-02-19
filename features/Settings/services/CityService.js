import Api from '../../shared/services/api'

const  baseUrl="country";
export default {
    
    get(id) {
        return Api().get(`/${baseUrl}/${id}/cities`);
    },
  
    typeHead(searchTerm,all) {
        const qParams = new URLSearchParams({searchTerm,all});
        return Api().get(`${baseUrl}/cities/typeHead?`+qParams.toString());
    },
    edit(countryId,entity){
        if(entity.id)
            return Api().put(`/${baseUrl}/cities/${entity.id}`,entity);
        else
            return this.add(countryId,entity);
    },  
    add(countryId,entity){
        return Api().post(`/${baseUrl}/${countryId}/cities`,entity);
    },
    delete(id){
        return Api().delete(`/${baseUrl}/cities/${id}`);
    }
}