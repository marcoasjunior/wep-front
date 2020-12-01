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
                  
                  <h3 class="mb-4">Amigos que você segue</h3>

                  <div v-for="user in data[0]" :key="user.id">
                    <cpmUserFollow :userData="user" />
                  </div>
                
                </div>

                <div v-else>

                  <h3 class="mb-4">Amigos que te seguem</h3>
                 
                  <div v-for="user in data[1]" :key="user.id">
                    <cpmUserFollow :userData="user" />
                  </div>
                
                </div>


              </v-card-text>

            </v-card>
          </v-dialog>

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