<template>
    <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Fournisseurs'}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="card">
          <div class="card-body brdtop">
            <span class='weight reltv'>BUTTON D'ACTION</span>
            <div class="buttons flx">
              <button class='btn btn-primary' data-toggle="modal" data-target="#addfourni">AJOUTER</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmds'>
  <thead>
    <tr>
      <th scope="col">Nom fournisseur</th>
      <th scope="col">Mobile fournisseur</th>
      <th scope="col">Statu</th>
      <th scope="col">Crèè</th>
    </tr>
  </thead>
  <tbody>
      <tr v-for="(detail,index) in details" :key="index">
        <td> {{ detail.name_fournisseur }} 
          <div>
            <button v-if="detail.statu_fournisseur == 1" @click="deletee(detail)" data-toggle="modal" data-target="#reactiveadm" class='pointer btnsp'><ic style='color:green;' size="2x" icon="recycle" /></button>
          <button v-if="detail.statu_fournisseur == 0" @click="deletee(detail)" data-toggle="modal" data-target="#deleteadm" class='pointer btnsp'><ic style='color:red;' icon="stop" size="2x" /></button>
          <button @click="update(detail)" data-toggle="modal" data-target="#updatefourni" class='pointer btnsp'><ic style='color:green;' icon="pen" size="2x" /></button>
          </div>
        </td>
        <td> {{ detail.phone_fournisseur }} </td>
        <td><span v-if="detail.statu_fournisseur == 0" class="green">Activè</span> <span v-if="detail.statu_fournisseur == 1" class="red">Suspendu</span> </td>
        <td> {{ detail.creation_date }} </td>  
      </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
    <confirm-modal-1 :datadel="del"  />
    <addfourni-modal />
    <updatefourni-modal v-if="up != null" :dataUp="up" />
    <reactivefourniModal :datadel="del"  />
  </div>
</template>

<script>
import dheaderComp from './dheaderComp'
import axios from 'axios'
import datatable from 'datatables.net-bs4'
import addfourniModal from '../modals/addfourniModal'
import updatefourniModal from '../modals/updateFourniModal'
import confirmModal1 from '../modals/confirmModal1'
import reactivefourniModal from '../modals/reactivefourniModal'
export default {
  data : ()=>{
    return{
        details : null,
        del : null,
        up : null,
        ids : []
    }
  },
    components : {
        dheaderComp,
        addfourniModal,
        updatefourniModal,
        confirmModal1,
        reactivefourniModal
    },
    methods : {
        table()
          {
              this.$nextTick(()=>{
                  $('#cmds').DataTable();
              })
          },
          deletee(del)
          {
            this.del = del
          },
          update(up)
          {
            this.up = up
          }
    },
    created()
    {
        var run = axios.get(this.link() + 'fournisseurs',this.cors())
        run.then(e=>{
          this.details = e.data
          this.table()
        })  
        run.catch(e=>{
          console.log('err')
        })
    }
}
</script>