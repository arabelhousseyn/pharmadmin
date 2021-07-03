<template>
    <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <dheader-comp :infos="{title : 'Reclamations'}" />
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">


        <div class="card">
          <div class="card-body brdtop">
              <table class="table table-striped" id='cmds'>
  <thead>
    <tr>
      <th scope="col">Ref commande</th>
      <th scope="col">Nom client</th>
      <th scope="col">Mobile client</th>
      <th scope="col">Note</th>
      <th scope="col">Statu</th>
      <th scope="col">Crèè</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(rec,index) in recs" :key="index">
      <td>{{rec.ref_commande}}</td>
      <td>{{rec.fname}}</td>
      <td>{{rec.phone}}</td>
      <td class="btnorder"><button @click="parsee(rec)" data-toggle="modal" data-target="#notemodal" class='btn btn-warning'><ic icon="eye" /> </button>
      <button @click="parsee(rec)" v-if="rec.statu_rec == 0" data-toggle="modal" data-target="#repmodal" class='btn btn-success'><ic icon="reply" /> </button>
      </td>
      <td> <span v-if="rec.statu_rec == 0" class="yellow">En attene</span> <span v-if="rec.statu_rec == 1" class="green">Examinè
        <button class="btn btn-success" @click="parsee(rec)" data-toggle="modal" data-target="#feedmodal"><ic icon="eye" /></button>
      </span>
      <span v-if="rec.statu_rec == 2" class="red">Non examinè
        <button class="btn btn-danger" @click="parsee(rec)" data-toggle="modal" data-target="#feedmodal"><ic icon="eye" /></button></span> </td>
      <td>{{rec.date_note}}</td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
    </section>
    <note-modal :rec="rec" />
    <feedbackModal :rec="rec" />
    <viewfeedbackModal :rec="rec" />
  </div>
</template>

<script>
import axios from 'axios'
import dheaderComp from './dheaderComp'
import datatable from 'datatables.net-bs4'
import noteModal from '../modals/noteModal'
import feedbackModal from '../modals/feedbackModal'
import viewfeedbackModal from '../modals/viewfeedbackModal'
export default {
    data : ()=>{
        return{
            recs : null,
            rec : [],
        }
    },
    components : {
        dheaderComp,
        noteModal,
        feedbackModal,
        viewfeedbackModal
    },
    methods : {
      table()
          {
              this.$nextTick(()=>{
                  $('#cmds').DataTable();
              })
          },
          parsee(value)
          {
            this.rec = value
          }
    },
    created()
    {
       var run = axios.get(this.link() + 'reclamations',this.cors())
       run.then(e=>{
         this.recs = e.data
         this.table()
       })   
       run.catch(e=>{
         console.log('err')
       })
    }
}
</script>