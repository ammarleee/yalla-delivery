import Api from '../../shared/services/api'

const  baseUrl="ClientBranches";
export default {
    
    get (entity) {
        return Api().get(baseUrl+`/list/${entity.id}`);
    },
    query(options){
        const qParams = new URLSearchParams(options);
    return Api().get(baseUrl+"?"+qParams.toString());
    },
    edit(entity){
        console.log(entity);
        if(entity.id)
            return Api().put(baseUrl+`/${entity.id}`,entity.clientData);
        else
            return this.add(entity);
    },
    add(entity){
        return Api().post(baseUrl+`/${entity.clientId}`,entity.clientData);
    },
    delete(id){
        return Api().delete(baseUrl+`/${id}`);
    }
}