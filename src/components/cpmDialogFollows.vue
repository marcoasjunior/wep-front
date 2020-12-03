<template>
  <div class="">

    <div class="cp">
    <button @click="openDialogFollowers(title)">
      <p class="custom-follow-font"> {{ title }} </p>
    </button>
    </div>


          <v-dialog
            v-model="FollowDialog"
            max-width="400"
          >
            <v-card>

                <v-toolbar dark color="orange">
                    
                    <v-toolbar-title>{{ modalTitle }}</v-toolbar-title>
                    
                    <div class="ml-a">
                        <v-btn icon dark @click="FollowDialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>

                </v-toolbar>
             
              <div class="p15">

              </div>
   
              <v-card-text class="mt-2">

                <div v-if="modalTitle == 'Seguindo' ">
                  
                  <h3 class="mb-4" v-if="data[0] != ''">Amigos que você segue</h3>
                  <h3 class="mb-4 alg-txt-c" v-else> Encontre amigos e conecte-se </h3>
                  

                  <div v-for="user in data[0]" :key="user.id">
                    <cpmUserFollow :userData="user" />
                  </div>
                
                </div>

                <div v-else>

                  <h3 class="mb-4" v-if="data[1] != ''">Amigos que te seguem</h3>
                  <h3 class="mb-4 alg-txt-c" v-else> Encontre amigos e conecte-se  </h3>
                 
                  <div v-for="user in data[1]" :key="user.id">
                    <cpmUserFollow :userData="user" />
                  </div>
                
                </div>


              </v-card-text>

            </v-card>
          </v-dialog>



<!-- 
    <v-dialog v-model="FollowDialog1" persistent max-width="600px">
      <template class="d-flex align-center" v-slot:activator="{ on, attrs }">
        <a
          class="mr-auto ml-auto this"
          v-bind="attrs"
          v-on="on"
          small
          depressed
          color="#00CA9D"
          >{{ title }}</a
        >
      </template>
      <v-btn @click="dialog = false" class text fab small>
        <v-icon dark>mdi-close</v-icon>
      </v-btn>

        <v-card>
          <div v-for="user in data[1]" :key="user.id">
            <cpmUserFollow :userData="user" />
          </div>
        </v-card>

      <v-tabs v-model="tab" fixed-tabs color="orange">
        <v-tab v-for="(item, i) in tabItems" :key="i" class="orange--text">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-col max-width="500">
            <v-list subheader>
              <div v-for="user in data[0]" :key="user.id">
                <cpmUserFollow :userData="user" />
              </div>
            </v-list>

            <v-divider></v-divider>
          </v-col>
        </v-tab-item>

        <v-tab-item>
          <v-col max-width="500">
            <v-list subheader>
              <div v-for="user in data[1]" :key="user.id">
                <cpmUserFollow :userData="user" />
              </div>
            </v-list>

            <v-divider></v-divider>
          </v-col>
        </v-tab-item>
      </v-tabs-items>
    </v-dialog> -->


  </div>
</template>

<script>
import cpmUserFollow from "@/components/cpmUserFollow";

export default {
  props: ["follow", "data"],
  components: { cpmUserFollow },
  data: () => ({
    title: "",
    modalTitle: "",
    FollowDialog: false,
    tab: "",
    selectedItem:'',
    selectedItemsName:
      { 
        selectFollow: 1,
        selectFollowing: 2
      },
    
    tabItems: ["Seguindo", "Seguidores"],
  }),
  methods: {
    async index() {
      if (this.follow == 0) {

        this.tab = 0;
        this.title = "Seguindo";

      } else if (this.follow == 1) {
        this.tab = 1;
        this.title = "Seguidores";
      }
    },

    openDialogFollowers(param){
      this.FollowDialog = true;
      console.log(typeof(param))
      let convertedVariable = param

      if( param == "Seguindo"){
        console.log("@$#%¨&*)_")
      }else{
        console.log(param)
      }

      this.modalTitle = param
      // console.log(this.data)
    }
  },
  async created() {
    this.index();
  },
};
</script>
<style lang="scss">
.custom-follow-font{
  font-size: 19px;
  font-weight: 600;
}

.this:hover {
  text-decoration: underline;
}
</style>