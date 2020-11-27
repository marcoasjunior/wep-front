<template>
    <div>

        <div class="d-block p10">
            <v-btn
                :loading="apiLoading"
                fab
                dark
                rounded
                color="error"
                small
                outlined
                class="cp"
                @click="confirmDeleteEvent = true"
            >
                <v-icon color="red">mdi-delete-outline</v-icon>
            </v-btn>
        </div>

    
  <!-- ======== MODAL PARA CONFIRMAR DELETE -->
    <v-dialog
      v-model="confirmDeleteEvent"
      width="600"
    >
      <v-card>
        <v-card-title class="headline orange">
          <span class="clr-whi">Tem certeza que deseja deletar o evento ?</span>
        </v-card-title>

        <v-card-text>
          <h2 class="alg-txt-c mt-4 mb-4">⚠ Ao deletetar o evento, os comentários e curtidas também irão ser apagados. ⚠</h2>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          
          <v-btn
            color="primary"
            outlined
            :loading="apiLoading"
            @click="confirmDeleteEvent = false"
          >
            Cancelar
          </v-btn>
          
          <v-btn
            color="error"
            outlined
            :loading="apiLoading"
            @click="deleteComponentEvent"
          >
            Deletetar
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  <!-- ======== MODAL PARA CONFIRMAR DELETE -->

    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
    props: ["deleteCardData"],

    data:() => ({
        confirmDeleteEvent: false,
    }),

    computed: {
        ...mapGetters({
          apiLoading: "apiLoading",
        }),
    }, 

    methods:{

        ...mapActions({
            deleteEvent: "FeedVuex/deleteEvent",
        }),

        ...mapMutations({
            deleteOnMutationEvent: "FeedVuex/deleteEvent"
        }),

        //Delete o evento do vuex

        async deleteComponentEvent() {
            try {
                this.$store.commit("setApiLoading", true);

                //Delete o evento do DB
                const response = await this.deleteEvent(this.deleteCardData.id);

                //Envia um evento personalizado para o componente pai avisando o delete do evento
                this.deleteOnMutationEvent(this.deleteCardData)
                

                this.$toast.success("Evento deletado com sucesso.", "Yeah!", {
                position: "topCenter",
                });

                this.$store.commit("setApiLoading", false);
                
            } catch (error) {
                this.$store.commit("setApiLoading", false);
                this.$toast.error("Tente novamente", "Ops!", {
                position: "topCenter",
                });
            }
        },
    }
}
</script>