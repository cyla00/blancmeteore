<script lang="ts">
import axios from 'axios'
import { defineComponent, watch } from 'vue'

export default defineComponent({
    props: {
        openModal: Boolean,
        order_id: Object,

    },
    data(){
        return{
            firstName: '',
            lastName: '',
            email: '',
            companyName: '',
            siret: '',
            tel: '',
        }
    },
    watch: {
        async openModal(){
            if(this.openModal){
                const auth = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }

                const body = {
                    clientId: this.order_id?.clientId
                }

                await axios.post('http://localhost:3000/api/get-user', body, auth).then((res) => {
                    this.firstName = res.data.firstName,
                    this.lastName = res.data.lastName
                    this.email = res.data.email
                    this.companyName = res.data.companyName
                    this.siret = res.data.siret
                    this.tel = res.data.tel
                }).catch((e) => {
                    console.log(e)
                }) 
            }
            if(!this.openModal){
                this.firstName = ''
                this.lastName = ''
                this.email = ''
                this.companyName = ''
                this.siret = ''
                this.tel = ''
            }
        }
    }
})
</script>

<template>
    <div class="modal" v-if="openModal">
        <button @click="this.$emit('update:openModal', false)">x</button>
        <div class="data-wrapper">
            <h3 class="title">{{ order_id?.type }}</h3>
            <p>{{ order_id?.createdAt }}</p>
            <p>{{ order_id?.status }}</p>
            <table>
                <tr>
                    <th>Prenom</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Nom Societe</th>
                    <th>siret</th>
                    <th>N Tel</th>
                </tr>

                <tr>
                    <td>{{ firstName }}</td>
                    <td>{{ lastName }}</td>
                    <td>{{ email }}</td>
                    <td>{{ companyName }}</td>
                    <td>{{ siret }}</td>
                    <td>{{ tel }}</td>
                </tr>
            </table>

            <p><span class="sub-title">Secteur d'activite: </span> {{ order_id?.questSecteurActivite }}</p>

            <h3>identite graphique</h3>
            <p><span class="sub-title">Objectif: </span> {{ order_id?.questObjectiveCreation }}</p>
            <p><span class="sub-title">Déjà une identite graphique: </span> {{ order_id?.questDejaIdGraph }}</p>
            <p class="sub-title" :class="{'no-graph': !order_id?.newLogo, 'yes-graph': order_id?.newLogo }"><span class="title">logo</span></p>
            <p class="sub-title" :class="{'no-graph': !order_id?.newFlyer, 'yes-graph': order_id?.newFlyer }"><span class="title">flyer</span></p>
            <p class="sub-title" :class="{'no-graph': !order_id?.newDeplyant, 'yes-graph': order_id?.newDeplyant }"><span class="title">deplyant</span></p>
            <p class="sub-title" :class="{'no-graph': !order_id?.newCarteVisite, 'yes-graph': order_id?.newCarteVisite }"><span class="title">carte visite</span></p>
            <p class="sub-title" :class="{'no-graph': !order_id?.newDeclinaisonResaux, 'yes-graph': order_id?.newDeclinaisonResaux }"><span class="title">declinaison resaux</span></p>
            <p class="sub-title" :class="{'no-graph': !order_id?.newIdGraphComplete, 'yes-graph': order_id?.newIdGraphComplete }"><span class="title">identite complete</span></p>
            
            <h3>creation sites</h3>
            <p><span class="sub-title">Déjà un site</span> {{ order_id?.questDejaSite }}</p>
            <p><span class="sub-title">url site existant</span> {{ order_id?.oldSiteUrl }}</p>
            <p><span class="sub-title">Objectif</span> {{ order_id?.questObjectiveSite }}</p>
            <p><span class="sub-title">Déjà une identite graphique:</span> {{ order_id?.questPossedezIdGraph }}</p>
            <p><span class="sub-title">Num categories</span> {{ order_id?.questNumCategories }}</p>
            <p><span class="sub-title">Num produits</span> {{ order_id?.questNumProducts }}</p>
            <p><span class="sub-title">Num Pages</span> {{ order_id?.questNumPages }}</p>
            <p><span class="sub-title">Num utilisateurs</span> {{ order_id?.questNumUsers }}</p>
            <p><span class="sub-title">Autres infos</span> {{ order_id?.newMoreInfo }}</p>
        </div>
    
    </div>
</template>

<style scoped>
.modal{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 70%;
    width: 70%;
    background-color: aliceblue;
    color: #062C43;
    text-align: end;
    padding: 10px;
    font-size: 13px;
    overflow: scroll;
}
p{ 
    margin: 0;
    padding: 5px 10px;
    border: 1px solid #062C43;
}
.data-wrapper{
    text-align: start;
    margin-top: 5px;
}
.title{
    text-align: center;
}
.sub-title{
    font-weight: bold;
}
.no-graph{
    background: rgba(255, 0, 0, 0.5);
}
.yes-graph{
    background: rgb(0, 128, 0, 0.5);
}

table{
    width: 100%;
}
tr{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
th{
    text-align: start;
}
</style>