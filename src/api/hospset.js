import request from '@/utils/request'

export default {
    getHospList(current,limit,searchObj) {
        return request({
            url:`/admin/hosp/hospitalSet/findPage/${current}/${limit}`,
            method:'post',
            data:searchObj            //使用json
        })
    }
}