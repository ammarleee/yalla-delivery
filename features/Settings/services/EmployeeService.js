import Api from '../../shared/services/api'

const  baseUrl="account";
export default {
    
    get () {
        return Api().get(baseUrl);
    },
    typeHead(searchTerm,all) {
        const qParams = new URLSearchParams({searchTerm,all});
        return Api().get(`${baseUrl}/typeHead?`+qParams.toString());
    },
    query(options){
        const qParams = new URLSearchParams(options);
    return Api().get(baseUrl+"?"+qParams.toString());
    },
    edit(entity){
        if(entity.id)
            return Api().put(baseUrl+`/${entity.id}`,entity);
        else
            return this.add(entity);
    },
    add(entity){
        return Api().post(baseUrl+`/register`,entity);
    },
    delete(id){
        return Api().delete(baseUrl+`/${id}`);
    }
}