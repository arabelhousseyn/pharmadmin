<template>
    <div class="modal fade" id="addadmin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ajouter administrateur</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="username" class='weight'>Nom d'utilisateur</label>
            <input type="text" @keypress="chk" v-model="data.username" id="username" class='form-control' placeholder="Nom d'utilisateur">
        </div>
        <div class="form-group">
            <label for="phone" class='weight'>Mobile</label>
            <input type="number" @keypress="chk" v-model="data.phone" id="phone" class='form-control' placeholder="Mobile">
        </div>

        <div class="form-group">
            <label for="email" class='weight'>Email</label>
            <input type="text" @keypress="chk" v-model="data.email" id="email" class='form-control' placeholder="Email">
        </div>
        <div class="form-group">
            <label for="password" class='weight'>Mot de passe</label>
            <input type="password" @keypress="chk" v-model="data.password" id="password" class='form-control' placeholder="Mot de passe">
        </div>

        <div class="form-group">
            <label for="statu" class='weight'>Fonction</label>
            <select @change="chk1($event)" id="statu" class="form-control">
                <option selected disabled>Choisir</option>
                <option value="0">Administrateur principale</option>
                <option value="1">Commercial</option>
                <option value="2">Responsable achat</option>
                <option value="3">Responsable stock</option>
                <option value="4">Responsable comptabilitè</option>
            </select>
        </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="add" :disabled="dis" class="btn btn-primary">Ajouter</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data : ()=>{
        return{
            dis : true,
            data : {
                username : null,
                email : null,
                phone : null,
                password : null,
                type : null,
            }
        }
    },
    methods : { 
        chk1(e)
        {
            this.data.type = e.target.value
            this.dis = (this.data.username != null && this.data.email != null && this.data.phone != null && this.data.password != null
            && this.data.type != null) ? false : true
        },
        chk()
        {
            this.dis = (this.data.username != null && this.data.email != null && this.data.phone != null && this.data.password != null
            && this.data.type != null) ? false : true
        },
        add()
        {
            this.dis = true
            var run = axios.post(this.link() + 'addadmin',this.data,this.cors())
            run.then(e=>{
                if(e.data == "yes")
                {
                   this.alrt("Opèration èffectuè",'','success')
                    setTimeout(() => {
                        location.reload()
                    }, 2000);
                }else if(e.data == "nousername")
                {
                    this.dis = false
                    this.statu("Nom d'utilisateur dèja utilisè",'error')
                }else if(e.data == "nophone")
                {
                    this.dis = false
                    this.statu("Mobile dèja utilisè",'error')
                }
            })
            run.catch(e=>{
                console.log('err')
            })
        }
    },
}
</script>