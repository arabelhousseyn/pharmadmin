import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

Vue.use(VueToast);
export default {
    data()
    {
        return {
             allow : 'https://cors-anywhere.herokuapp.com/',
             path : 'http://localhost/ker/learn%20php/p-pharm/api/',
             linkImage :  'http://localhost/ker/learn%20php/p-pharm/storage/app/products/'
        }
    },

    methods : {
         batch()
        {
           return  this.allow
        },
        statu(msg,type)
        {
            return Vue.$toast.open({
                message: msg,
                type: type,
                duration : 2000
            });
        },
       async alrt(title = "",text = "",type)
        {
        return await this.$fire({
            title: title,
            text: text,
            type: type,
            timer: 3000
          }).then(r => {
           return r.value
          })
        },
        link()
        {
           return this.path
        },
        image()
        {
            return this.linkImage
        },
        cors()
        {
            let headers = {
                Authorization : "Bearer 1|XP9kLs2cwy2te78Q2nDuNSgBGdoPs6ldZiDlVKXY",
            }
            return {headers}
        },
        hideModal()
        {
            document.getElementById('updateadmin').removeAttribute('class')
            document.getElementById('updateadmin').style.display = "none"
            document.querySelector('.modal-backdrop').removeAttribute('class')
        }
    }
    
}


