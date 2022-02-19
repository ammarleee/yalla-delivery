import Api from '../../shared/services/api'

const  baseUrl="Externalshippers";
export default {
    
    query(options){
        const qParams = new URLSearchParams(options);
    return Api().get(baseUrl+"?"+qParams.toString());
    },
    get () {
        return Api().get(baseUrl);
    },
    
    edit(entity){
        if(entity.id)
            return Api().put(baseUrl+`/${entity.id}`,entity);
        else
            return this.add(entity);
    },
    add(entity){
        return Api().post(baseUrl,entity);
    },
    delete(id){
        return Api().delete(baseUrl+`/${id}`);
    },
    addCity(id,city){
        return Api().post(baseUrl+`/${id}/cities`,city);
    },
    updateCity(id,city){
        return Api().put(baseUrl+`/${id}/cities`,city);
    },
     deleteCity(id,cityId){
        return Api().delete(baseUrl+`/${id}/cities/${cityId}`);
    }
}