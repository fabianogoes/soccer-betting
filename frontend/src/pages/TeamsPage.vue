<template>
  <q-page padding>
    <div class="q-pa-md">
    <q-table
      title="Times"
      :rows="teams"
      :columns="columns"
      row-key="name"
    />
  </div>

  <img alt="Vue logo" src="../assets/flags/BEL.webp"/>

  <q-img
      :src="url"
      spinner-color="white"
      style="height: 140px; max-width: 150px"
    />

        <q-img src="https://cloudinary.fifa.com/api/v3/picture/flags-sq-2/BRA?tx=c_fill,g_auto,q_auto" style="height: 70px; max-width: 100px" no-native-menu>
          <q-tooltip>
            BRA
          </q-tooltip>
        </q-img>
        <q-icon name="font_download" />
        <q-img src="https://cloudinary.fifa.com/api/v3/picture/flags-sq-2/BEL?tx=c_fill,g_auto,q_auto" style="height: 70px; max-width: 100px" no-native-menu>
          <q-tooltip>
            BEL
          </q-tooltip>
        </q-img>

  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'TeamsPage',
  setup () {
    const teams = ref([])
    const url = ref('../assets/flags/BRA.webp')

    const columns = [
      { name: 'id', label: 'ID', field: 'ID', sortable: true, align: 'left' },
      { name: 'namePTBR', label: 'Nome', field: 'NamePTBR', sortable: true, align: 'left' },
      { name: 'group', label: 'Grupo', field: 'Group', sortable: true, align: 'center' },
      { name: 'abbreviation', label: 'Abreviação', field: 'Abbreviation', sortable: true, align: 'center' }
    ]

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
      url,
      teams,
      columns
    }
  }
})
</script>
