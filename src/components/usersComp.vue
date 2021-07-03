<template>
    <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Utilisateurs'}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="card">
          <div class="card-body brdtop">
            <span class='weight reltv'>BUTTON D'ACTION</span>
            <div class="buttons flx">
              <button class='btn btn-primary' data-toggle="modal" data-target="#addadmin">AJOUTER</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmds'>
  <thead>
    <tr>
      <th scope="col">Nom d'utilisateur</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile</th>
      <th scope="col">Fonction</th>
      <th scope="col">Statu</th>
      <th scope="col">Crèè</th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="(user,index) in users" :key="index">
        <td> {{ user.username_user}} 
          <div>
            <button v-if="user.active == 0" @click="deletee(user)" data-toggle="modal" data-target="#deleteadm" class='pointer btnsp'><ic style='color:red;' size="2x" icon="stop" /></button>
          <button v-if="user.active == 1" @click="recc(user)" data-toggle="modal" data-target="#recadm" class='pointer btnsp'><ic style='color:green;' size="2x" icon="recycle" /></button>
          <button @click="update(user)" data-toggle="modal" data-target="#updateadmin" class='pointer btnsp'><ic style='color:green;' icon="pen" size="2x" /></button>
          </div>
        </td>
        <td> {{ user.email }} </td>
        <td> {{ user.phone }} </td>
        <td> <span v-if="user.statu == 0" class='green'>Administrateur principale</span> <span v-if="user.statu == 1">Commercial</span>
        <span v-if="user.statu == 2">Responsable achat</span> <span v-if="user.statu == 3">Responsable stock</span> <span v-if="user.statu == 4">Responsable comptabilitè</span></td>
        <td> <span v-if="user.active == 0" class="green">Active</span> <span v-if="user.active == 1" class="red">Suspendu</span> </td>
        <td> {{user.creation_date}} </td>
     </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
   <admin-modal />
   <remove-modal v-if="checked.length > 0" :ids="checked" />
     <update-modal  :dataUp="up" />
     <confirm-modal :datadel="del" />
     <reactiveadminModal :rec="rec" />
  </div>
</template>

<script>
import adminModal from '../modals/addadminModal'
import removeModal from '../modals/removeadminModal'
import updateModal from '../modals/updateadminModal'
import confirmModal from '../modals/confirmModal'
import reactiveadminModal from '../modals/reactiveadminModal'
import dheaderComp from './dheaderComp'
import axios from 'axios'
import datatable from 'datatables.net-bs4'
export default {
  data : ()=>{
    return{
        users : null,
        data : {
          username : localStorage.getItem('logged')
        },
        checked : [],
        up : [],
        del : [],
        rec : []
    }
  },
  components : {
    adminModal,
    removeModal,
    updateModal,
    confirmModal,
    dheaderComp,
    reactiveadminModal
  },
  methods : {
    table()
          {
              this.$nextTick(()=>{
                  $('#cmds').DataTable();
              })
          },
          update(data)
          {
            this.up = data
          },
          deletee(data)
          {
            this.del = data
          },
          recc(data)
          {
            this.rec = data
          }
  },
   created()
   {

          var run = axios.post(this.link() + 'users',this.data,this.cors())
          run.then(e=>{
            this.users = e.data
            this.table()
          })
          run.catch(e=>{
            console.log('err')
          })
   }
}
</script>