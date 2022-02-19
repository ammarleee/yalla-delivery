import Api from '../../shared/services/api'

const  baseUrl="units";
export default {
    
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
    }
}