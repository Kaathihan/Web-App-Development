<template>
  <div class="form-wrap">
    <transition name="error">
      <ErrorPopup v-if="failure" :msg="errorMsg"/>
    </transition>
    <transition name="success">
      <SuccessPopup v-if="success" msg="Success: Your account is logged in!"/>
    </transition>

    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link forgot-password" to="/register">Register</router-link>
      </p>
      <h2>Login to Post-It</h2>
      <div class="input">
        <i class="fas fa-envelope"></i>
        <input v-model="email" type="text" placeholder="Email"/>
      </div>
      <div class="input">
        <i class="fas fa-lock"></i>
        <input v-model="password" type="password" placeholder="Password"/>
      </div>
      <div v-show="error" class="error">{{ this.errorMsg }}</div>
      <router-link class="forgot-password" to="/reset-password">Forgot your password?</router-link>
      <button class="button is-medium" @click.prevent="loginUser">Log In</button>
      <div class="angle"></div>
    </form>
    
    <div class="background"></div>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import ErrorPopup from './ErrorPopup.vue'
import SuccessPopup from './SuccessPopup.vue'
import { api } from '../apis/api';
import createStore from '../store/index'
// test user email: test@test.com
// test user password: test1234

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  name: "LoginPage",
  components: {
    ErrorPopup,
    SuccessPopup
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
      errorMsg: "",
      success: false,
      failure: false,
      user: []
    };
  },
  methods: {
    loginUser: async function() {
      var payload = {email: this.email, password: this.password};
      try {
        this.user = await api.loginUser(payload);
        createStore.commit('change')
        createStore.commit('upDate')
        //console.log(createStore.state.isLoggedIn)
        //window.location.reload();
        //this.$router.go();
        this.$router.push({ path: '/profile', replace: true });
        this.email = "";
        this.password = "";
        this.success = true;
        setTimeout(() => this.success = false, 2000);
      } catch (e) {
        this.errorMsg = 'ERROR: ' + e.response.data.error + '!';
        this.failure = true;
        setTimeout(() => this.failure = false, 2000);
      }
    }
  }
};
</script>

<style scoped lang="scss">
input {
  &:focus {
    transition: all 0.3s ease-out;
    box-shadow: 3px 3px 2rem rgba(54, 71, 107, 0.5);
  }
}

/* enter transitions */
  .error-enter-from {
    opacity: 0;
    transform: translateY(-400px);
  }

  .error-enter-active {
    transition: all 1s ease;
  }

  /* leave transitions */
  .error-leave-to {
    opacity: 0;
    transform: translateY(-400px);
  }
  .error-leave-active {
    transition: all 0.5s ease;
  }

  /* enter transitions */
  .success-enter-from {
    opacity: 0;
    transform: translateY(-400px);
  }

  .success-enter-active {
    transition: all 1s ease;
  }

  .success-leave-to {
    opacity: 0;
    transform: translateY(-400px);
  }

  .success-leave-active {
    transition: all 0.5s ease;
  }
</style>