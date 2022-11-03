<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->

    <div v-for="(team, index) in teams" :key="index">
      <ul>
        <li>
          {{ team.Name }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue'
import { api } from '@/main';

export default defineComponent({
  name: 'HomeView',
  components: {
    // HelloWorld,
  },
  // this.users = resp.data
  setup () {
    const teams = ref([])
    
    onMounted(() => {
      getTeams()
    })

    const getTeams = async () => {
      try {
        const { data } = await api.get('http://localhost:8080/teams')
        teams.value = data
      } catch (error) {
        console.error(error)
      }
    }

    return {  
      teams,
    }
 } 
});
</script>
