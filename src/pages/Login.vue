<template>
    <div class="home">
        <div class="item">
            <div class="content">
                <div class="logo">
                  <h3 class="my-header">Welcome to Alimento</h3>
                  <p>Sign in to continue</p>
                </div>
                <div class="q-pa-md">
                  <q-input
                    outlined
                    v-model="username"
                    label="Username"
                    class="field"
                    :rules="[val => !!val || 'Field is required']"
                  />
                  <q-input
                    outlined
                    v-model="password"
                    label="Password"
                    class="field"
                    :rules="[val => !!val || 'Field is required']"
                  />
                  <q-spinner
                    v-if="loading"
                    color="red"
                    size="4em"
                    :thickness="5"
                  />
                  <q-btn v-else  @click="signIn()" class="add" label="Login"  color="red"/>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.home{
    max-height: 100%;
    justify-content: center;
    display: flex;
    align-items: center
}
.item{
    width: 450px;
    height: 450px;
    margin-top: 50px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.content{
    height: 400px;
    padding:20px;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: 'Raleway';
}
.logo{
  height: 120px;
  text-align: center;
  font-size: 18px;
}
.logo h3{
    font-size: 30px;
    font-weight: bold;
    font-family: 'Raleway';
}
.txt{
    height: 110px;
    margin-top: 5px;
}
input[type="file"] {
    display: none;
}

.q-pa-md{
    height: 400px;
    padding: 5px;
}
.field{
  margin-top: 10px;
}
.add{
  width: 100%;
  font-size: 18px;
  margin-top: 5px;
}

</style>
<script>
import { mapActions, mapGetters } from 'vuex';
import { toast } from '../helpers/notifier';
export default {
    name: 'Login',
    data: () => ({
        username: '',
        password: '',
        loading: false
    }),
    methods: {
        ...mapActions('user',['login']),
        signIn(){
            this.loading = true;
            const { username, password, login } = this;
            login({ username, password })
            .then(() => this.$router.push('/'))
            .catch(() => {
                toast(this.$q, 'username or password incorrect','red', 'bottom')
                this.loading = false;
            });
        }
    },
    created(){
        if (this.isLoggin){
        this.$router.push('/');
        }
   },
    computed: {
        ...mapGetters('user',['isLoggin'])
    },
}
</script>
