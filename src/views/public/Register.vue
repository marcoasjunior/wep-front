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
            prepend-icon="mdi-lock" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'" 
            name="input-10-2" label="Senha" 
            v-model="form.password" class="input-group--focused" 
            @click:append="show1 = !show1"></v-text-field>

          <v-text-field 
            prepend-icon="mdi-lock" :error="confirmPassError" 
            @change="validatePassMatch" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" 
            :rules="[rules.required, rules.min]" :type="show2 ? 'text' : 'password'" 
            name="input-10-2" label="Confirmar senha" 
            v-model="password2" class="input-group--focused" 
            @click:append="show2 = !show2"></v-text-field>

          <v-text-field
            type="tel"
            v-mask="'(##) #####-####'"
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
              <v-btn :loading="localLoading" class="ac mt-4" color="orange" dark @click="sendForm">Cadastrar</v-btn>
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

      show1: false,
      show2: false,

      localLoading: false,

      uploadUrl: process.env.VUE_APP_UPLOAD_URL,

      form: {
        name: null,
        email: null,
        password: null,
        whatsapp: null,
        avatar: null,
      },

      registred: false,

      confirmPassError: false,

      src: null,
      targetFile: null,
      loading: null,
      password2: null,

      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
        passMatch: () => ('senhas são diferentes'),
      },
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
      this.localLoading = true
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

      if(register.data == "O user already exists"){
        this.localLoading = false
        this.$toast.error("Usuário já está cadastrado, tente fazer login", "🤨", {
          position: "topCenter",
        });
        

      }

      else if (register.data != "O user already exists") {
        this.$toast.success("Registro efetuado!", "Hey", {
          position: "topCenter",
        });

        await localStorage.setItem("token", register.data[0]);
        await localStorage.setItem("id", register.data[1]);
        this.registred = true;
        // this.$router.push('/Follow');
        this.localLoading = false

      } else {
        this.$toast.error("Erro no registro!", "Putz", {
          position: "topCenter",
        });
        this.localLoading = false
      }

      this.localLoading = false
      this.clearData();
    },

    validatePassMatch(){
      if(this.password2 !== this.form.password){
        this.confirmPassError = true
      }else{
        this.confirmPassError = false

      }

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
