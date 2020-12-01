<template>
  <v-container class="box">
    <v-row v-if="registred" class="mt-20">
      <cpmRegisterSuccess />
    </v-row>
    <v-row v-else class="d-flex flex-column">
      <v-btn to="/" class text fab small>
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>
      <!-- <v-col class="d-flex justify-center align-center">
        <v-avatar color="orange" size="62">
          <v-icon class="cp" @click="onFileSelected" v-if="!src" dark>mdi-account-circle</v-icon>
          <img v-else :src="src" alt="avatar" />
          <input
            @change="onFilePicked"
            type="file"
            class="hiden-input"
            ref="fileInput"
            accept="image/*"
          />
        </v-avatar>
      </v-col>-->

      <div class="d-flex ac justify-center">
        <input
          @change="onFilePicked"
          type="file"
          class="hiden-input"
          ref="fileInput"
          accept="image/*"
        />

        <v-avatar @click="pickAvatar" class="mt-1 mb-5 cp" size="80">
          <!-- <v-icon class="cp" v-if="!form.avatar" dark>mdi-account-circle</v-icon> -->
          <!-- <v-icon v-if="!form.avatar" dark>mdi-account-circle</v-icon> -->

          <img v-if="form.avatar" :src="form.avatar" alt="avatar" />
        </v-avatar>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="pickAvatar"
              v-if="!form.avatar"
              rounded
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="cp" dark>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <span>Clique para escolher a foto de perfil</span>
        </v-tooltip>
      </div>

      <v-col>
        <v-form ref="form" class="d-flex flex-column">
          <!-- <v-file-input accept="image/*" label="Avatar" @change="onFileChange($event)" v-model="form.avatar">
          </v-file-input>-->

          <v-text-field
            prepend-icon="mdi-account"
            v-model="form.name"
            label="Nome Completo"
            required
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-email"
            v-model="form.email"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-lock"
            v-model="password2"
            label="Senha"
            required
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-lock"
            v-model="form.password"
            label="Confirmar senha"
            required
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-whatsapp"
            v-model="form.whatsapp"
            label="Whatsapp"
            required
          ></v-text-field>

          <v-switch
            v-model="switch1"
            inset
            label="Concorda com os termos e condições do aplicativo."
          ></v-switch>

          <div class="d-flex justify-center align-center">

            <div align="center">
              <v-btn :loading="apiLoading" class="ac mt-4" color="orange" dark @click="sendForm">Criar Evento</v-btn>
            </div>                    

          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import cpmRegisterSuccess from "@/components/cpmRegisterSuccess";

export default {
  name: "Register",
  components: { cpmRegisterSuccess },

  computed:{
    ...mapGetters({
      apiLoading: 'apiLoading'
    })
  },

  data() {
    return {
      switch1: false,

      uploadUrl: process.env.VUE_APP_UPLOAD_URL,

      form: {
        name: null,
        email: null,
        password: null,
        whatsapp: null,
        avatar: null,
      },

      registred: false,

      src: null,
      targetFile: null,
      loading: null,
      password2: null,
    };
  },

  methods: {
    ...mapActions({
      register: "RegisterVuex/register",
      updateAvatar: "ProfileVuex/updateAvatar",
    }),

    async pickAvatar() {
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      const files = event.target.files;
      let fileName = files[0].filename;
      this.imageData = event.target.files[0];

      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.src = fileReader.result;
        // this.newAvatar = fileReader.result;
        this.form.avatar = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
    },

    async uploadPhoto() {
      const fd = new FormData();
      fd.append("photo", this.imageData);

      const url = await this.updateAvatar(fd);

      return url;
    },

    async sendForm() {
      this.$store.commit("setApiLoading", true);
      this.loading = true;

      if (this.form.avatar !== null) {
        const url = await this.uploadPhoto();
        console.log("a");
        this.form.avatar = url;
      }

      this.$toast.info("Estamos fazendo seu registo.", "Hey", {
        position: "topCenter",
      });

      console.log(this.form);

      const register = await this.register(this.form);

      console.log(register);

      if (register) {
        this.$toast.success("Registro efetuado!", "Hey", {
          position: "topCenter",
        });

        await localStorage.setItem("token", register.data[0]);
        await localStorage.setItem("id", register.data[1]);
        this.registred = true;
        // this.$router.push('/Follow');
        this.$store.commit("setApiLoading", false);

      } else {
        this.$toast.error("Erro no registro!", "Putz", {
          position: "topCenter",
        });
        this.$store.commit("setApiLoading", false);
      }

      this.$store.commit("setApiLoading", true);
      this.clearData();
    },

    validation() {
      if (this.switch1 === false) throw alert("Deve aceitar as condições.");
      if (this.password2 !== this.form.password)
        throw alert("As senhas devem ser iguais.");
      if (
        !this.form.name ||
        !this.form.password ||
        !this.form.email ||
        !this.form.whatsapp
      )
        throw alert("Todos os campos devem ser preenchidos3");
    },

    clearData() {
      this.form.name = null;
      this.form.email = null;
      this.form.password = null;
      this.form.whatsapp = null;
      this.form.avatar = null;
    },
  },
};
</script>

<style scoped>
.box {
  max-width: 550px;
}
</style>
